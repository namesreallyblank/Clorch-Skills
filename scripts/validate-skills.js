#!/usr/bin/env node
/**
 * Skill Validation Script
 *
 * Validates all skills in the spawner-skills repository:
 * 1. Checks all 4 required files exist (skill.yaml, sharp-edges.yaml, validations.yaml, collaboration.yaml)
 * 2. Validates handoff targets reference existing skills
 * 3. Validates delegation triggers reference existing skills
 * 4. Detects circular handoff patterns
 * 5. Reports missing or broken references
 *
 * Usage: node scripts/validate-skills.js
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Categories to scan
const CATEGORIES = [
  'development', 'marketing', 'strategy', 'integrations', 'ai-ml', 'ai',
  'agents', 'mind', 'data', 'hardware', 'frameworks', 'finance', 'enterprise',
  'biotech', 'space', 'simulation', 'legal', 'communications', 'climate',
  'science', 'product', 'integration', 'design', 'startup'
];

const REQUIRED_FILES = ['skill.yaml', 'sharp-edges.yaml', 'validations.yaml', 'collaboration.yaml'];

class SkillValidator {
  constructor(skillsDir) {
    this.skillsDir = skillsDir;
    this.skills = new Map(); // skill-id -> skill data
    this.errors = [];
    this.warnings = [];
  }

  async validate() {
    console.log('🔍 Validating spawner-skills repository...\n');

    // Step 1: Discover all skills
    this.discoverSkills();
    console.log(`📦 Found ${this.skills.size} skills across ${CATEGORIES.length} categories\n`);

    // Step 2: Check required files
    this.checkRequiredFiles();

    // Step 3: Validate handoff targets
    this.validateHandoffs();

    // Step 4: Validate delegation triggers
    this.validateDelegations();

    // Step 5: Detect circular references
    this.detectCircularReferences();

    // Report results
    this.report();

    return this.errors.length === 0;
  }

  discoverSkills() {
    for (const category of CATEGORIES) {
      const categoryPath = path.join(this.skillsDir, category);
      if (!fs.existsSync(categoryPath)) {
        this.warnings.push(`Category directory missing: ${category}/`);
        continue;
      }

      const skills = fs.readdirSync(categoryPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      for (const skillName of skills) {
        const skillId = skillName;
        const skillPath = path.join(categoryPath, skillName);

        // Try to load skill.yaml
        const skillYamlPath = path.join(skillPath, 'skill.yaml');
        let skillData = null;

        if (fs.existsSync(skillYamlPath)) {
          try {
            const content = fs.readFileSync(skillYamlPath, 'utf8');
            skillData = yaml.load(content);
          } catch (e) {
            this.errors.push(`YAML parse error in ${category}/${skillName}/skill.yaml: ${e.message}`);
          }
        }

        // Load collaboration.yaml
        const collabPath = path.join(skillPath, 'collaboration.yaml');
        let collabData = null;

        if (fs.existsSync(collabPath)) {
          try {
            const content = fs.readFileSync(collabPath, 'utf8');
            collabData = yaml.load(content);
          } catch (e) {
            this.errors.push(`YAML parse error in ${category}/${skillName}/collaboration.yaml: ${e.message}`);
          }
        }

        this.skills.set(skillId, {
          id: skillId,
          category,
          path: skillPath,
          skill: skillData,
          collaboration: collabData
        });
      }
    }
  }

  checkRequiredFiles() {
    console.log('📋 Checking required files...');
    let missingCount = 0;

    for (const [skillId, data] of this.skills) {
      for (const file of REQUIRED_FILES) {
        const filePath = path.join(data.path, file);
        if (!fs.existsSync(filePath)) {
          this.warnings.push(`Missing file: ${data.category}/${skillId}/${file}`);
          missingCount++;
        }
      }
    }

    if (missingCount === 0) {
      console.log('   ✅ All required files present\n');
    } else {
      console.log(`   ⚠️  ${missingCount} missing files\n`);
    }
  }

  validateHandoffs() {
    console.log('🔗 Validating handoff targets...');
    let brokenCount = 0;

    for (const [skillId, data] of this.skills) {
      if (!data.skill?.handoffs) continue;

      for (const handoff of data.skill.handoffs) {
        const targetId = handoff.to;
        if (targetId && !this.skills.has(targetId)) {
          this.errors.push(`Broken handoff: ${skillId} → ${targetId} (target does not exist)`);
          brokenCount++;
        }
      }

      // Also check does_not_own references
      if (data.skill?.does_not_own) {
        for (const [topic, target] of Object.entries(data.skill.does_not_own)) {
          // Format is "topic → skill-id" or just "skill-id"
          const targetId = typeof target === 'string' ? target.split('→').pop().trim() : null;
          if (targetId && !this.skills.has(targetId)) {
            this.warnings.push(`Broken does_not_own: ${skillId} references ${targetId}`);
          }
        }
      }
    }

    if (brokenCount === 0) {
      console.log('   ✅ All handoff targets valid\n');
    } else {
      console.log(`   ❌ ${brokenCount} broken handoffs\n`);
    }
  }

  validateDelegations() {
    console.log('📤 Validating delegation triggers...');
    let brokenCount = 0;

    for (const [skillId, data] of this.skills) {
      if (!data.collaboration?.delegation_triggers) continue;

      for (const trigger of data.collaboration.delegation_triggers) {
        const targetId = trigger.delegate_to;
        if (targetId && !this.skills.has(targetId)) {
          this.errors.push(`Broken delegation: ${skillId} → ${targetId} (target does not exist)`);
          brokenCount++;
        }
      }

      // Also check receives_context_from
      if (data.collaboration?.receives_context_from) {
        for (const receive of data.collaboration.receives_context_from) {
          const sourceId = receive.skill;
          if (sourceId && !this.skills.has(sourceId)) {
            this.warnings.push(`Broken receives_from: ${skillId} ← ${sourceId} (source does not exist)`);
          }
        }
      }

      // Also check provides_context_to
      if (data.collaboration?.provides_context_to) {
        for (const provide of data.collaboration.provides_context_to) {
          const targetId = provide.skill;
          if (targetId && !this.skills.has(targetId)) {
            this.warnings.push(`Broken provides_to: ${skillId} → ${targetId} (target does not exist)`);
          }
        }
      }

      // Check escalation_paths
      if (data.collaboration?.escalation_paths) {
        for (const escalation of data.collaboration.escalation_paths) {
          const targetId = escalation.escalate_to;
          if (targetId && !this.skills.has(targetId)) {
            this.warnings.push(`Broken escalation: ${skillId} → ${targetId} (target does not exist)`);
          }
        }
      }
    }

    if (brokenCount === 0) {
      console.log('   ✅ All delegation triggers valid\n');
    } else {
      console.log(`   ❌ ${brokenCount} broken delegations\n`);
    }
  }

  detectCircularReferences() {
    console.log('🔄 Detecting circular references...');
    const cycles = [];

    // Build adjacency list
    const graph = new Map();
    for (const [skillId, data] of this.skills) {
      const edges = new Set();

      // Add handoff targets
      if (data.skill?.handoffs) {
        for (const handoff of data.skill.handoffs) {
          if (handoff.to && this.skills.has(handoff.to)) {
            edges.add(handoff.to);
          }
        }
      }

      // Add delegation targets
      if (data.collaboration?.delegation_triggers) {
        for (const trigger of data.collaboration.delegation_triggers) {
          if (trigger.delegate_to && this.skills.has(trigger.delegate_to)) {
            edges.add(trigger.delegate_to);
          }
        }
      }

      graph.set(skillId, edges);
    }

    // DFS for cycle detection
    const visited = new Set();
    const recStack = new Set();
    const path = [];

    const dfs = (node) => {
      visited.add(node);
      recStack.add(node);
      path.push(node);

      const edges = graph.get(node) || new Set();
      for (const neighbor of edges) {
        if (!visited.has(neighbor)) {
          const cycle = dfs(neighbor);
          if (cycle) return cycle;
        } else if (recStack.has(neighbor)) {
          // Found cycle
          const cycleStart = path.indexOf(neighbor);
          return path.slice(cycleStart).concat(neighbor);
        }
      }

      path.pop();
      recStack.delete(node);
      return null;
    };

    for (const skillId of this.skills.keys()) {
      if (!visited.has(skillId)) {
        const cycle = dfs(skillId);
        if (cycle) {
          cycles.push(cycle);
        }
      }
    }

    if (cycles.length === 0) {
      console.log('   ✅ No circular references detected\n');
    } else {
      for (const cycle of cycles) {
        this.warnings.push(`Circular reference: ${cycle.join(' → ')}`);
      }
      console.log(`   ⚠️  ${cycles.length} potential circular references\n`);
    }
  }

  report() {
    console.log('═'.repeat(60));
    console.log('📊 VALIDATION REPORT');
    console.log('═'.repeat(60));

    console.log(`\n📦 Total skills: ${this.skills.size}`);
    console.log(`❌ Errors: ${this.errors.length}`);
    console.log(`⚠️  Warnings: ${this.warnings.length}`);

    if (this.errors.length > 0) {
      console.log('\n❌ ERRORS (must fix):');
      for (const error of this.errors) {
        console.log(`   • ${error}`);
      }
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS (should review):');
      for (const warning of this.warnings.slice(0, 20)) {
        console.log(`   • ${warning}`);
      }
      if (this.warnings.length > 20) {
        console.log(`   ... and ${this.warnings.length - 20} more`);
      }
    }

    console.log('\n' + '═'.repeat(60));
    if (this.errors.length === 0) {
      console.log('✅ VALIDATION PASSED');
    } else {
      console.log('❌ VALIDATION FAILED');
    }
    console.log('═'.repeat(60));
  }
}

// Main
const skillsDir = path.resolve(__dirname, '..');
const validator = new SkillValidator(skillsDir);

validator.validate().then(success => {
  process.exit(success ? 0 : 1);
}).catch(err => {
  console.error('Validation error:', err);
  process.exit(1);
});
