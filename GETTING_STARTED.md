# Getting Started with Spawner Skills

You just installed 270+ specialist skills for Claude. Here's how to use them.

## What You Installed

```
~/.spawner/skills/
├── development/      # Backend, frontend, API, auth, testing
├── ai/               # LLM, embeddings, RAG, fine-tuning
├── agents/           # Autonomous agents, browser automation
├── data/             # PostgreSQL, Redis, vectors
├── marketing/        # AI video, copywriting, SEO
└── ... (24 categories total)
```

Each skill contains:
- `skill.yaml` - Core knowledge, patterns, anti-patterns
- `sharp-edges.yaml` - Gotchas and common mistakes
- `validations.yaml` - Code checks to catch issues
- `collaboration.yaml` - When to hand off to other skills

---

## Quick Start (2 minutes)

### Step 1: Load a Skill in Claude

Tell Claude to read a skill:

```
Read: ~/.spawner/skills/development/backend/skill.yaml
Read: ~/.spawner/skills/development/backend/sharp-edges.yaml
```

Claude now has backend expertise loaded. Ask it to build something:

```
Build me a REST API for a todo app with PostgreSQL
```

### Step 2: Load Multiple Skills for Complex Tasks

For a full-stack feature, load multiple skills:

```
Read: ~/.spawner/skills/development/backend/skill.yaml
Read: ~/.spawner/skills/development/frontend/skill.yaml
Read: ~/.spawner/skills/data/postgres-wizard/skill.yaml
Read: ~/.spawner/skills/development/auth-specialist/skill.yaml
```

Now Claude has expertise in backend, frontend, database, AND auth.

---

## Common Workflows

### Building a SaaS App

```
# Load essentials
Read: ~/.spawner/skills/development/backend/skill.yaml
Read: ~/.spawner/skills/development/frontend/skill.yaml
Read: ~/.spawner/skills/data/postgres-wizard/skill.yaml
Read: ~/.spawner/skills/integration/stripe-billing/skill.yaml
Read: ~/.spawner/skills/development/auth-specialist/skill.yaml

# Now build
"Build a SaaS with user auth, Stripe billing, and a dashboard"
```

### Building AI Agents

```
# Load agent skills
Read: ~/.spawner/skills/agents/autonomous-agents/skill.yaml
Read: ~/.spawner/skills/agents/multi-agent-orchestration/skill.yaml
Read: ~/.spawner/skills/ai/llm-architect/skill.yaml

# Now build
"Build an agent that researches topics and writes reports"
```

### Marketing with AI

```
# Load marketing skills
Read: ~/.spawner/skills/marketing/ai-video-ads/skill.yaml
Read: ~/.spawner/skills/marketing/ai-copywriting/skill.yaml
Read: ~/.spawner/skills/marketing/seo-specialist/skill.yaml

# Now work
"Create a video ad script for my productivity app"
```

---

## Using with Spawner MCP (Advanced)

If you're using the Spawner MCP server, you get additional features:

### Skill Packs
Load curated skill sets with one command:

```
spawner_skills({ action: "pack", pack: "essentials" })   # Core 19 skills
spawner_skills({ action: "pack", pack: "agents" })       # AI agent skills
spawner_skills({ action: "pack", pack: "marketing-ai" }) # AI marketing
spawner_skills({ action: "pack", pack: "enterprise" })   # Compliance, security
```

### Search Skills
Find the right skill for your task:

```
spawner_skills({ query: "payment processing" })
spawner_skills({ query: "authentication oauth" })
spawner_skills({ query: "kubernetes deployment" })
```

### Validation
Run code checks from skill validations:

```
spawner_validate({ code: "your code here" })
```

---

## Best Practices

### 1. Load Skills Before Asking
Always load relevant skills BEFORE making your request:

```
# Good
Read: ~/.spawner/skills/development/backend/skill.yaml
"Build me an API"

# Less effective
"Build me an API"  # Claude uses general knowledge, not specialist skill
```

### 2. Load Sharp Edges for Production Code
Sharp edges contain gotchas that prevent common bugs:

```
Read: ~/.spawner/skills/development/backend/skill.yaml
Read: ~/.spawner/skills/development/backend/sharp-edges.yaml  # Add this!
```

### 3. Match Skills to Task Complexity
- Simple task → 1-2 skills
- Feature → 3-5 skills
- Full project → Use skill packs

### 4. Check Collaboration Files
Skills know when to hand off to other skills:

```
Read: ~/.spawner/skills/development/backend/collaboration.yaml
# Shows: "Hand off to auth-specialist for authentication"
```

---

## Skill Categories

| Category | Skills | Examples |
|----------|--------|----------|
| development | 57 | backend, frontend, api-designer, auth, testing |
| marketing | 33 | ai-video-ads, copywriting, seo, content |
| ai | 12 | llm-architect, embeddings, rag, fine-tuning |
| agents | 10 | autonomous-agents, browser-automation |
| data | 8 | postgres-wizard, redis, vectors, graphs |
| frameworks | 6 | nextjs, supabase, sveltekit, react |
| integrations | 14 | stripe, aws, discord, slack, twilio |
| enterprise | 6 | compliance, security, governance |
| finance | 6 | algo-trading, defi, derivatives |

See full directory: `~/.spawner/skills/`

---

## Updating Skills

New skills are added regularly. Update with:

```bash
npx vibeship-spawner-skills update
```

---

## Need Help?

- **List all categories:** `npx vibeship-spawner-skills list`
- **Check status:** `npx vibeship-spawner-skills status`
- **Full docs:** https://github.com/vibeforge1111/vibeship-spawner-skills

---

## Quick Reference

```bash
# Install
npx vibeship-spawner-skills install

# Update
npx vibeship-spawner-skills update

# Load skill in Claude
Read: ~/.spawner/skills/[category]/[skill]/skill.yaml

# Load with sharp edges (recommended for production)
Read: ~/.spawner/skills/[category]/[skill]/skill.yaml
Read: ~/.spawner/skills/[category]/[skill]/sharp-edges.yaml
```
