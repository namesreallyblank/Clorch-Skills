# Spawner Skills

**462 skills** for Claude. Zero cost, works offline. Full MCP integration.

## Quick Start

```bash
# Full setup: Skills + MCP server (recommended)
npx github:vibeforge1111/vibeship-spawner-skills install --mcp
```

This one command:
- Installs 462 skills to `~/.spawner/skills/`
- Configures the Spawner MCP server for Claude Desktop & Claude Code
- Enables project memory, code validation, sharp edge detection

### Other Commands

```bash
# Just install skills (no MCP)
npx github:vibeforge1111/vibeship-spawner-skills install

# Add MCP to existing installation
npx github:vibeforge1111/vibeship-spawner-skills setup-mcp

# Update skills to latest
npx github:vibeforge1111/vibeship-spawner-skills update

# Check status
npx github:vibeforge1111/vibeship-spawner-skills status
```

### Manual Clone (Alternative)

```bash
git clone https://github.com/vibeforge1111/vibeship-spawner-skills ~/.spawner/skills
```

## What You Get

### Local Skills (462)
Claude reads YAML files directly from `~/.spawner/skills/`:
- Patterns, anti-patterns, best practices
- Sharp edges (gotchas) for each technology
- Works offline, zero API cost

### MCP Server Tools
When you use `--mcp`, these tools become available:

| Tool | What It Does |
|------|--------------|
| `spawner_orchestrate` | Auto-routes your request to the right workflow |
| `spawner_validate` | Runs guardrail checks on your code |
| `spawner_remember` | Saves decisions for future sessions |
| `spawner_watch_out` | Surfaces relevant sharp edges |
| `spawner_unstick` | Helps when you're going in circles |
| `spawner_skills` | Searches and loads skills by context |

## After Installation

**[Read the Getting Started Guide](GETTING_STARTED.md)** for:
- How to load skills in Claude
- Common workflows (SaaS, AI agents, marketing)
- Best practices
- Using skill packs

## How It Works

1. You install skills locally with `npx github:vibeforge1111/vibeship-spawner-skills install`
2. Tell Claude to read a skill: `Read: ~/.spawner/skills/backend/backend/skill.yaml`
3. Claude now has specialist knowledge - ask it to build something!

## Skill Categories (35)

| Category | Count | Description |
|----------|-------|-------------|
| game-dev | 51 | Unity, Godot, Phaser, multiplayer, game design |
| marketing | 36 | AI video, copywriting, SEO, content, viral |
| integrations | 25 | AWS, GCP, Stripe, Discord, Slack, Twilio |
| ai | 24 | LLM architect, embeddings, fine-tuning, NLP |
| strategy | 24 | Product strategy, growth, competitive intel |
| ai-agents | 23 | Autonomous agents, browser automation, voice |
| creative | 23 | Memes, easter eggs, gamification, viral hooks |
| devops | 22 | CI/CD, Docker, K8s, observability, SRE |
| backend | 21 | APIs, microservices, queues, caching |
| blockchain | 20 | Smart contracts, DeFi, NFTs, Solana |
| security | 13 | Auth, OWASP, compliance, privacy |
| ai-tools | 12 | Code generation, image editing, multimodal |
| design | 12 | UI, UX, branding, landing pages |
| frameworks | 12 | Next.js, React, Svelte, Supabase, Tailwind |
| community | 11 | Discord, Telegram, DevRel, ambassador programs |
| data | 11 | Postgres, Redis, vectors, graphs, temporal |
| maker | 11 | Viral tools, bots, extensions, SaaS, templates |
| mind | 10 | Debugging, decision-making, system design |
| development | 9 | General development utilities |
| frontend | 8 | React, mobile, state management |
| testing | 8 | QA, test architecture, code review |
| education | 7 | Course creation, AI tutoring, learning design |
| product | 7 | A/B testing, analytics, PM |
| biotech | 6 | Genomics, drug discovery, lab automation |
| enterprise | 6 | Compliance, governance, architecture |
| finance | 6 | Algo trading, DeFi, derivatives |
| hardware | 6 | Embedded, FPGA, robotics, sensors |
| trading | 6 | Execution algorithms, quant research |
| climate | 5 | Carbon, energy, sustainability |
| communications | 5 | Dev comms, crisis, stakeholder |
| legal | 5 | Contracts, GDPR, patents, SOX |
| simulation | 5 | Monte Carlo, digital twin, physics |
| space | 5 | Orbital mechanics, mission planning |
| science | 4 | Experimental design, statistics |
| startup | 3 | YC playbook, founder mode |

## Skill Packs

| Pack | Description |
|------|-------------|
| `essentials` | Core skills for building apps (auto-installed) |
| `agents` | Autonomous agents and automation |
| `community` | Community building and management |
| `education` | Course creation and online learning |
| `maker` | Viral tools, bots, extensions, SaaS |
| `enterprise` | Compliance and governance |
| `finance` | Trading and fintech |
| `mind` | Debugging and decision-making |
| `specialized` | Biotech, space, climate, hardware |
| `complete` | All 462 skills |

## Directory Structure

```
~/.spawner/skills/
├── registry.yaml          # Pack definitions
├── ai/                    # 24 skills
├── ai-agents/             # 23 skills
├── ai-tools/              # 12 skills
├── backend/               # 21 skills
├── biotech/               # 6 skills
├── blockchain/            # 20 skills
├── climate/               # 5 skills
├── communications/        # 5 skills
├── community/             # 11 skills
├── creative/              # 23 skills
├── data/                  # 11 skills
├── design/                # 12 skills
├── development/           # 9 skills
├── devops/                # 22 skills
├── education/             # 7 skills
├── enterprise/            # 6 skills
├── finance/               # 6 skills
├── frameworks/            # 12 skills
├── frontend/              # 8 skills
├── game-dev/              # 51 skills
├── hardware/              # 6 skills
├── integrations/          # 25 skills
├── legal/                 # 5 skills
├── maker/                 # 11 skills
├── marketing/             # 36 skills
├── mind/                  # 10 skills
├── product/               # 7 skills
├── science/               # 4 skills
├── security/              # 13 skills
├── simulation/            # 5 skills
├── space/                 # 5 skills
├── startup/               # 3 skills
├── strategy/              # 24 skills
├── testing/               # 8 skills
└── trading/               # 6 skills
```

## Skill Format

Each skill has 4 YAML files:

```
backend/
├── skill.yaml           # Identity, patterns, anti-patterns
├── sharp-edges.yaml     # Gotchas and warnings
├── validations.yaml     # Code checks
└── collaboration.yaml   # Handoffs and prerequisites
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to add or improve skills.

## License

Apache 2.0
