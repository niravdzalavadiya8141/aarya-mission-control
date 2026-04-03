# ⚡ AARYA MISSION CONTROL — WINDSURF BUILD GUIDE
### Complete Phase-Wise Instructions | React.js | GitHub | Vercel

> **Stack:** React 18 + Vite + Tailwind CSS | **15 Marvel Agents** | **Cyberpunk Theme**  
> **Built by:** INAI Worlds Pvt. Ltd. | **Author:** Nirav

---

## 📋 BEFORE YOU START — READ THIS

- **Tool:** Windsurf (Cascade AI)
- **Framework:** React.js ONLY (Vite + TypeScript)
- **Every phase ends with a GitHub commit** — BUCKY protocol
- **Paste one phase prompt at a time** into Windsurf
- **Wait for phase to complete** before moving to next
- **Total Phases:** 14

---

## 🗂️ PROJECT FOLDER STRUCTURE (Final)

```
aarya-mission-control/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── TopBar.tsx
│   │   │   └── Layout.tsx
│   │   ├── ui/
│   │   │   ├── AgentCard.tsx
│   │   │   ├── GlowCard.tsx
│   │   │   ├── LevelBadge.tsx
│   │   │   ├── StatusDot.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── Modal.tsx
│   │   └── shared/
│   │       ├── ActivityFeed.tsx
│   │       ├── MiniLeaderboard.tsx
│   │       └── BottomTicker.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx       → /
│   │   ├── Tasks.tsx           → /tasks
│   │   ├── Team.tsx            → /team
│   │   ├── HQ.tsx              → /hq (3D)
│   │   ├── Deals.tsx           → /deals
│   │   ├── Analytics.tsx       → /analytics
│   │   ├── XP.tsx              → /xp
│   │   ├── Settings.tsx        → /settings
│   │   └── NotFound.tsx        → 404
│   ├── store/
│   │   ├── useAgentStore.ts
│   │   ├── useTaskStore.ts
│   │   ├── useDealStore.ts
│   │   └── useXPStore.ts
│   ├── data/
│   │   ├── agents.ts
│   │   ├── tasks.ts
│   │   ├── deals.ts
│   │   └── achievements.ts
│   ├── hooks/
│   │   ├── useAudio.ts
│   │   └── useKeyboardShortcuts.ts
│   ├── three/                  → 3D HQ components
│   │   ├── HQScene.tsx
│   │   ├── AgentCharacter.tsx
│   │   ├── Room.tsx
│   │   └── Furniture.tsx
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── .gitignore
├── .env.example
├── README.md
├── TEAM.md
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

---

# PHASE 1 — PROJECT SCAFFOLD + DESIGN SYSTEM

> **Windsurf Prompt — Paste this FIRST:**

```
Create a new React + Vite + TypeScript project called "aarya-mission-control".

Run these commands to set up:
npm create vite@latest aarya-mission-control -- --template react-ts
cd aarya-mission-control

Install all dependencies:
npm install tailwindcss @tailwindcss/vite
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing
npm install zustand @tanstack/react-query
npm install react-router-dom
npm install @hello-pangea/dnd
npm install lucide-react framer-motion
npm install clsx date-fns uuid nanoid
npm install recharts
npm install howler
npm install -D @types/three @types/uuid

Set up Tailwind CSS with @tailwindcss/vite plugin in vite.config.ts.

Create src/styles/globals.css with these CSS variables:

:root {
  --bg-primary: #0A0A0F;
  --bg-secondary: #0D1117;
  --bg-card: #111827;
  --bg-card-hover: #1F2937;
  --border-default: #1E293B;
  --border-glow: rgba(0,255,255,0.2);

  --accent-cyan: #00FFFF;
  --accent-pink: #FF00FF;
  --accent-yellow: #FFD700;
  --accent-green: #00FF88;
  --accent-red: #FF3366;
  --accent-purple: #8B5CF6;

  --text-primary: #F8FAFC;
  --text-secondary: #94A3B8;
  --text-tertiary: #475569;

  --glow-cyan: 0 0 20px rgba(0,255,255,0.4), 0 0 40px rgba(0,255,255,0.2);
  --glow-pink: 0 0 20px rgba(255,0,255,0.4), 0 0 40px rgba(255,0,255,0.2);
  --glow-gold: 0 0 20px rgba(255,215,0,0.4), 0 0 40px rgba(255,215,0,0.2);
}

Import Google Fonts in index.html:
- Orbitron (700, 900) — for headings
- JetBrains Mono (400, 500) — for body/UI

body { font-family: 'JetBrains Mono', monospace; background: #0A0A0F; color: #F8FAFC; }
h1, h2, h3 { font-family: 'Orbitron', sans-serif; }

Add these Tailwind custom utilities in tailwind.config.js:
- glass: glassmorphism card style (bg rgba(17,24,39,0.8), backdrop-blur-12, border 1px rgba(0,255,255,0.1))
- glow-cyan: box-shadow var(--glow-cyan)
- glow-pink: box-shadow var(--glow-pink)
- glow-gold: box-shadow var(--glow-gold)
- neon-text-cyan: text-shadow 0 0 10px #00FFFF
- scanline: CSS scanline overlay effect

Create src/data/agents.ts with all 15 agents:

export const AGENTS = [
  { id: 'aarya',    name: 'AARYA',    emoji: '⚡', role: 'Master Orchestrator', division: 'command',      color: '#00FFFF', level: 'MYTHIC',  xp: 9999,  startXP: 9999, status: 'working', currentTask: 'Orchestrating all missions' },
  { id: 'jarvis',   name: 'JARVIS',   emoji: '🤖', role: 'Lead Developer',       division: 'dev',          color: '#3B82F6', level: 'ELITE',   xp: 2400,  startXP: 2400, status: 'working', currentTask: 'Building React components' },
  { id: 'friday',   name: 'FRIDAY',   emoji: '🎨', role: 'Frontend Developer',   division: 'dev',          color: '#EC4899', level: 'AGENT',   xp: 1200,  startXP: 1200, status: 'working', currentTask: 'Designing cyberpunk UI' },
  { id: 'ultron',   name: 'ULTRON',   emoji: '🔧', role: 'Backend/Infrastructure', division: 'dev',        color: '#8B5CF6', level: 'ELITE',   xp: 2200,  startXP: 2200, status: 'idle',    currentTask: 'Setting up VPS' },
  { id: 'vision',   name: 'VISION',   emoji: '✍️', role: 'Content Strategist',   division: 'content',      color: '#10B981', level: 'AGENT',   xp: 1000,  startXP: 1000, status: 'working', currentTask: 'Writing LinkedIn post' },
  { id: 'wanda',    name: 'WANDA',    emoji: '🔮', role: 'Social Media Manager', division: 'content',      color: '#F43F5E', level: 'AGENT',   xp: 1100,  startXP: 1100, status: 'idle',    currentTask: 'Creating reel script' },
  { id: 'bucky',    name: 'BUCKY',    emoji: '🦾', role: 'DevOps & Git',         division: 'devops',       color: '#6366F1', level: 'ELITE',   xp: 2000,  startXP: 2000, status: 'working', currentTask: 'Auto-committing to GitHub' },
  { id: 'hawkeye',  name: 'HAWKEYE',  emoji: '🎯', role: 'QA Engineer',          division: 'qa',           color: '#EF4444', level: 'AGENT',   xp: 1300,  startXP: 1300, status: 'working', currentTask: 'Testing dashboard layout' },
  { id: 'natasha',  name: 'NATASHA',  emoji: '💼', role: 'Brand Partnerships',   division: 'business',     color: '#F97316', level: 'AGENT',   xp: 1500,  startXP: 1500, status: 'idle',    currentTask: 'Following up Hostinger deal' },
  { id: 'thor',     name: 'THOR',     emoji: '⚡', role: 'Research Analyst',     division: 'research',     color: '#F59E0B', level: 'AGENT',   xp: 900,   startXP: 900,  status: 'working', currentTask: 'Market research 2026' },
  { id: 'hulk',     name: 'HULK',     emoji: '💪', role: 'Data Processing',      division: 'research',     color: '#22C55E', level: 'AGENT',   xp: 800,   startXP: 800,  status: 'idle',    currentTask: 'Processing CSV data' },
  { id: 'rocket',   name: 'ROCKET',   emoji: '🚀', role: 'Performance Optimizer', division: 'dev',         color: '#A855F7', level: 'AGENT',   xp: 700,   startXP: 700,  status: 'idle',    currentTask: 'Optimizing bundle size' },
  { id: 'shuri',    name: 'SHURI',    emoji: '🧪', role: 'Innovation & R&D',     division: 'innovation',   color: '#14B8A6', level: 'AGENT',   xp: 600,   startXP: 600,  status: 'working', currentTask: 'Prototyping voice commands' },
  { id: 'heimdall', name: 'HEIMDALL', emoji: '🛡️', role: 'Security & Monitoring', division: 'security',   color: '#D97706', level: 'AGENT',   xp: 1000,  startXP: 1000, status: 'working', currentTask: 'Security audit on APIs' },
  { id: 'groot',    name: 'GROOT',    emoji: '🌱', role: 'Community & Support',  division: 'community',    color: '#84CC16', level: 'ROOKIE',  xp: 300,   startXP: 300,  status: 'idle',    currentTask: 'Writing onboarding docs' },
]

export const LEVEL_SYSTEM = [
  { name: 'ROOKIE', minXP: 0,    maxXP: 499,  color: '#94A3B8', icon: '🔘' },
  { name: 'AGENT',  minXP: 500,  maxXP: 1499, color: '#3B82F6', icon: '🔵' },
  { name: 'ELITE',  minXP: 1500, maxXP: 2999, color: '#8B5CF6', icon: '🟣' },
  { name: 'LEGEND', minXP: 3000, maxXP: 4999, color: '#FFD700', icon: '🟡' },
  { name: 'MYTHIC', minXP: 5000, maxXP: 99999,color: '#00FFFF', icon: '⚡' },
]

Create src/data/tasks.ts with 12 sample tasks (use nanoid for IDs):
Status options: 'backlog' | 'assigned' | 'in-progress' | 'review' | 'testing' | 'completed'
Priority: 'critical' | 'high' | 'normal' | 'low'
12 pre-loaded tasks assigned to different agents (see full task list in Step 5 of original guide).

Create src/data/deals.ts with 5 sample deals:
1. Hostinger VPS → ₹50,000 → in-progress → NATASHA
2. Kiran Gems → ₹1,20,000 → negotiating → NATASHA
3. EDINAI Academy → ₹30,000 → delivered → WANDA
4. Myntra Affiliate → ₹15,000 → paid → VISION
5. Local Jewelry Store → ₹75,000 → lead → NATASHA

Create src/data/achievements.ts with 20 achievements.

Create ALL Zustand stores:
- src/store/useAgentStore.ts → agents state, status updates, XP addition
- src/store/useTaskStore.ts → tasks CRUD, status changes, move between columns
- src/store/useDealStore.ts → deals CRUD
- src/store/useXPStore.ts → XP log, leaderboard, achievements

Create src/data/activityFeed.ts with 15 sample activity entries.

Create placeholder page files for all 8 routes (just export default with page name for now):
Dashboard, Tasks, Team, HQ, Deals, Analytics, XP, Settings, NotFound

Set up React Router in App.tsx with all routes.

Create TEAM.md in root with full 15-agent roster (all details).
Create .gitignore (node_modules, dist, .env, .DS_Store, *.log)
Create README.md with project title and basic setup instructions.
Create .env.example with placeholder vars.

Initialize git and make first commit:
git init
git add .
git commit -m "[BUCKY] init: AARYA Mission Control project scaffold"

Show me the complete file structure when done.
```

---

# PHASE 2 — SIDEBAR + TOPBAR + LAYOUT

> **Windsurf Prompt:**

```
Build the main Layout system for AARYA Mission Control.

SIDEBAR (src/components/layout/Sidebar.tsx):
- Fixed left sidebar, 240px wide
- Background: rgba(13,17,23,0.95) with backdrop-blur
- Top: AARYA logo — "⚡ AARYA" in Orbitron font, cyan glow
- Below logo: "MISSION CONTROL" in small caps, gray
- Divider line with subtle glow

Navigation items with icons (lucide-react) and active state:
1. ⚡ Command Center → /
2. 📋 Task Board → /tasks
3. 👥 Team → /team
4. 🏢 Cyberpunk HQ → /hq
5. 💼 Brand Deals → /deals
6. 📊 Analytics → /analytics
7. 🏆 XP & Leaderboard → /xp
8. ⚙️ Settings → /settings

Active nav item: cyan left border + glow + bg rgba(0,255,255,0.08)
Hover: subtle glow transition
Each item: icon + label

Bottom of sidebar:
- AARYA status: "⚡ AARYA — ONLINE" with pulsing green dot
- "15 Agents Active" badge
- Version: "v1.0 AARYA"

TOPBAR (src/components/layout/TopBar.tsx):
- Fixed top bar, full width minus sidebar, 64px height
- Background: rgba(10,10,15,0.9) with backdrop-blur
- Left: Current page title (dynamic based on route)
- Center: System time (live clock, JetBrains Mono font, cyan)
- Right section:
  - Search icon (Ctrl+K shortcut hint)
  - Notifications bell (with badge count)
  - "INAI WORLDS" small badge
  - Status: "🟢 ALL SYSTEMS OPERATIONAL"

LAYOUT WRAPPER (src/components/layout/Layout.tsx):
- Sidebar (fixed left, 240px)
- TopBar (fixed top)
- Main content area (ml-[240px] mt-[64px])
- Subtle scanline overlay (CSS ::after pseudo-element, 2px lines, 2% opacity)
- Grid dot pattern in background (radial-gradient dots, very subtle)
- Particle background (20 small floating dots using framer-motion, random positions, slow movement)

Wrap App.tsx routes in Layout.

Make the sidebar responsive:
- On mobile (<768px): sidebar hidden, bottom nav bar appears instead
- Bottom nav has icons only (5 main routes)

Commit when done:
git add .
git commit -m "[FRIDAY] feat: sidebar, topbar, layout system"
git push origin main
```

---

# PHASE 3 — COMMAND CENTER DASHBOARD (Home Page)

> **Windsurf Prompt:**

```
Build the Command Center dashboard at / (src/pages/Dashboard.tsx).
This is NASA Mission Control meets cyberpunk HUD.

TOP STATS ROW (4 glassmorphism cards in a row):
Each card: bg rgba(17,24,39,0.8), backdrop-blur, border 1px rgba(0,255,255,0.1), border-radius 12px

1. "ACTIVE MISSIONS" — count of in-progress tasks, cyan glowing Zap icon
2. "AGENTS ONLINE" — count of 'working' agents, green glowing Users icon
3. "XP EARNED TODAY" — total XP earned today (calculate from tasks), gold glowing Star icon
4. "COMPLETION RATE" — % tasks completed this week, pink glowing TrendingUp icon

Each card has:
- Large number (count up animation from 0 using framer-motion on mount)
- Label below
- Small sparkline (use recharts LineChart, 7 data points, simplified)
- Glowing icon top-right

MAIN CONTENT GRID (2 columns: 60% left / 40% right):

LEFT COLUMN:

Panel 1: "ACTIVE MISSIONS"
- Title bar: "⚡ ACTIVE MISSIONS" in Orbitron + "View All →" link
- Shows last 8 in-progress tasks from useTaskStore
- Each task card:
  - Left border: agent's color (4px)
  - Task title (white, bold)
  - Agent: colored dot + codename
  - Priority badge: 🔴 Critical / 🟡 High / 🟢 Normal / ⚪ Low
  - Animated progress bar (agent color, glowing, width based on subtask completion)
  - Time elapsed (use date-fns formatDistanceToNow)

Panel 2: "LIVE ACTIVITY FEED"
- Title: "📡 LIVE ACTIVITY FEED"
- Scrollable list (max-height 300px, overflow-y auto)
- 20 items from activityFeed data
- Each entry:
  - Timestamp (gray, small)
  - Agent emoji + name in agent color
  - Action text in white
  - Left border in agent's color (2px)
- Stagger animation: items fade+slide in from left with 0.05s delay each

RIGHT COLUMN:

Panel 3: "TEAM STATUS"
- Title: "🟢 TEAM STATUS"
- Grid of 15 agent mini-cards (3 columns × 5 rows)
- Each mini-card:
  - Agent emoji + codename (small Orbitron)
  - Status dot: 🟢 Working / 🟡 Idle / 🔵 Break / 🔴 Offline
  - Small XP progress bar (agent color)
  - Hover: show current task tooltip

Panel 4: "QUICK COMMAND"
- Title: "⚡ QUICK COMMAND"
- Input: placeholder "Give AARYA a command..." with cyan glow border
- On focus: input border glows brighter
- Submit button: lightning bolt icon, cyan background
- On submit: creates task in useTaskStore, shows toast "⚡ Mission assigned to [AGENT]"

Panel 5: "LEADERBOARD" (top 5 mini)
- Title: "🏆 TOP AGENTS THIS WEEK"
- List of top 5 agents by XP
- Each: rank number, emoji, codename, level badge, XP value
- "View Full →" link to /xp

BOTTOM TICKER (full width, fixed at bottom of content):
- Scrolling marquee: "⚡ JARVIS deployed v2.1 • 🎯 HAWKEYE cleared 3 bugs • 🦾 BUCKY pushed 12 commits today • 🎨 FRIDAY completed cyberpunk UI • ..."
- CSS marquee animation (infinite left scroll)
- Cyan text on dark background
- Separator: • 

ALL ANIMATIONS:
- Cards: stagger fade-in on mount (framer-motion, 0.1s delay each)
- Stats numbers: count up from 0 on mount
- Activity feed: slide in from left
- Status dots: pulse animation for 'working' agents

Commit:
git add .
git commit -m "[JARVIS] feat: command center dashboard with stats, feed, team status"
git push origin main
```

---

# PHASE 4 — KANBAN TASK BOARD

> **Windsurf Prompt:**

```
Build the Kanban Task Board at /tasks (src/pages/Tasks.tsx).

TOP TOOLBAR:
- Search bar (filters tasks by title in real-time)
- Filter dropdowns: By Agent (dropdown of all 15) | By Priority | By Division
- Sort: Newest | Oldest | Priority | XP Reward
- View toggle: Kanban (default) | List View
- "+ New Mission" button (cyan glow, Zap icon)

KANBAN BOARD (6 columns):
Backlog → Assigned → In Progress → Review → Testing → Completed

Each column:
- Header: column name + count badge
- Colored top border (3px):
  Backlog: #475569, Assigned: #00FFFF, In-Progress: #3B82F6,
  Review: #8B5CF6, Testing: #EF4444, Completed: #00FF88
- Droppable area (@hello-pangea/dnd DragDropContext + Droppable)

Task Cards (Draggable):
- bg: rgba(17,24,39,0.8) glassmorphism
- Left border: 4px in agent's color
- Title (bold, white)
- Description (2 lines, truncated, gray)
- Agent badge: colored dot + codename
- Priority badge with color
- XP badge: "⚡ 150 XP" in gold
- Subtask progress: "3/5" with small progress bar
- Tags as small cyan pills
- Time ago (gray, small)
- On hover: translateY(-2px) + glow in agent's color
- On drag: elevated shadow, scale 1.03

DRAG & DROP LOGIC:
- Use @hello-pangea/dnd
- On card drop into new column → update task status in useTaskStore
- When dropped to "completed":
  → Agent earns xpReward in useXPStore
  → Add to activity feed
  → Show toast: "🎉 [AGENT] completed '[TASK]' (+[XP] XP)"
  → Trigger confetti burst (framer-motion particles from card position)

"+ NEW MISSION" MODAL:
- Full-screen dark overlay
- Centered modal (glassmorphism, max-width 600px)
- Fields:
  - Title (text input)
  - Description (textarea)
  - Agent (dropdown with emoji + name + colored dot)
  - Priority (4 option buttons: Critical/High/Normal/Low with colors)
  - XP Reward (range slider 50–500, show value)
  - Division (dropdown)
  - Tags (multi-select pill buttons: frontend, backend, content, urgent, etc.)
  - Subtasks (dynamic list: text input + add button + remove per item)
  - Estimated Hours (number input)
- "Create Mission" button (cyan glow)
- Close on overlay click or Escape

LIST VIEW (toggle):
- Table layout: Title | Agent | Priority | Status | XP | Created | Actions
- Sortable columns
- Row hover: subtle cyan highlight
- Actions: Edit, Move to next status, Delete

PRELOADED TASKS (12) — use tasks from src/data/tasks.ts

Commit:
git add .
git commit -m "[JARVIS] feat: kanban task board with drag-and-drop, filters, new task modal"
git push origin main
```

---

# PHASE 5 — TEAM PAGE + ORG CHART

> **Windsurf Prompt:**

```
Build the Team page at /team (src/pages/Team.tsx).

AARYA HERO SECTION (top, full width):
- Large hero card with animated cyan border (pulsing glow)
- "⚡ AARYA — MASTER ORCHESTRATOR" (Orbitron, large)
- "Coordinating 15 agents across 9 divisions"
- Stats row: Active Missions | Team XP Today | Completion Rate | System Uptime
- Background: subtle grid pattern + 8 floating particles
- Status: "🟢 ONLINE — COMMANDING" (pulsing green dot)

SVG CONNECTION LINES:
- Animated dashed SVG lines from AARYA down to 9 division headers
- Color: rgba(0,255,255,0.4) with glow
- Draw animation on mount: stroke-dashoffset from full length to 0
- Subtle opacity pulse after drawing

DIVISION SECTIONS (9 divisions):
Each division has:
- Section header: division name + agent count badge + colored left accent

Divisions and agents:
1. DEV DIVISION (cyan) → JARVIS, FRIDAY, ULTRON, ROCKET
2. CONTENT DIVISION (green) → VISION, WANDA
3. DEVOPS DIVISION (indigo) → BUCKY
4. QA DIVISION (red) → HAWKEYE
5. BUSINESS DIVISION (orange) → NATASHA
6. RESEARCH DIVISION (gold) → THOR, HULK
7. INNOVATION DIVISION (teal) → SHURI
8. SECURITY DIVISION (amber) → HEIMDALL
9. COMMUNITY DIVISION (lime) → GROOT

AGENT CARDS (for each of 14 agents):
- Glassmorphism card (bg rgba(17,24,39,0.8))
- Left border: 4px in agent's color
- Top: emoji + codename (Orbitron) + role (gray)
- Division badge (small colored pill)
- Status: dot + text + current task (truncated)
- XP section:
  - Level badge: "LVL [n] — [LEVEL_NAME]" colored by level
  - XP progress bar (agent color, animated fill from 0 on mount)
  - "2400 / 3000 XP" text
  - Tasks completed count
- Hover: translateY(-4px) + glow in agent's color

AGENT DETAIL MODAL (click any card):
- Full agent profile overlay
- Large emoji + name + role
- Stats grid: Tasks Completed | Total XP | Level | Current Streak
- Recent tasks (last 5, with status badges)
- Achievement badges (grid of unlocked ones)
- Level progression (recharts LineChart showing XP over time — use simulated data)
- "Assign Task" button (opens task modal pre-filled with this agent)
- Close button (X) top-right

LEVEL SYSTEM VISUAL (bottom section):
5 level cards in a row: Rookie → Agent → Elite → Legend → Mythic
Each shows: icon, name, XP range, color, perks description

ANIMATIONS:
- AARYA card fades in first (0.3s delay)
- SVG lines draw (0.5s after AARYA)
- Division sections stagger in (0.8s, 0.15s between divisions)
- Agent cards stagger within divisions (0.05s between cards)
- XP bars fill from 0 on mount

Commit:
git add .
git commit -m "[FRIDAY] feat: team org chart with agent cards, modals, level system"
git push origin main
```

---

# PHASE 6 — BRAND DEALS TRACKER

> **Windsurf Prompt:**

```
Build the Brand Deals Tracker at /deals (src/pages/Deals.tsx).

TOP STATS (4 cards):
1. "ACTIVE DEALS" — count of non-paid/non-lost deals (cyan)
2. "TOTAL PIPELINE" — sum of all deal values formatted as ₹X,XX,XXX (blue)
3. "EARNED" — sum of paidAmount across all deals (green)
4. "PENDING" — sum of pendingAmount across all deals (gold)

FILTER TABS:
All | Active | Completed | Lost
(tabs with active underline in cyan)

DEALS TABLE (main view):
Columns: Brand | Value | Status | Platform | Deadline | Agent | Payment | Actions

For each deal row:
- Brand logo emoji + brand name (bold)
- Deal value in ₹ (formatted Indian number system)
- Status badge with colors:
  lead (gray), negotiating (cyan), agreed (blue),
  in-progress (purple), delivered (orange), paid (green glow), lost (red)
- Platform badge
- Deadline (red if overdue, yellow if < 7 days, green otherwise)
- Agent emoji + name
- Payment progress bar: paidAmount / dealValue (green fill)
- Actions: Edit (pencil icon) | Archive (trash icon)

ROW EXPAND (click row):
Shows full deal details in an expandable section:
- Contact name + email
- Deliverables description
- Notes
- Full payment breakdown
- Timeline (created → negotiated → agreed → delivered → paid)

"+ NEW DEAL" MODAL:
- Fields: Brand name | Logo emoji picker | Contact Name | Contact Email
- Deal Value (₹) | Platform | Status | Deliverables | Deadline
- Assigned Agent (dropdown) | Notes
- "Create Deal" button (orange glow)

PIPELINE VIEW (toggle button):
- Kanban-style columns for each deal stage
- Deal cards draggable between stages
- Same logic as task board

SAMPLE DATA (5 deals from src/data/deals.ts):
1. Hostinger VPS → ₹50,000 → In Progress → YouTube → NATASHA
2. Kiran Gems → ₹1,20,000 → Negotiating → Website → NATASHA
3. EDINAI Academy → ₹30,000 → Delivered → Instagram → WANDA
4. Myntra Affiliate → ₹15,000 → Paid → Instagram → VISION
5. Local Jewelry Store → ₹75,000 → Lead → Multiple → NATASHA

Commit:
git add .
git commit -m "[NATASHA] feat: brand deals tracker with pipeline view"
git push origin main
```

---

# PHASE 7 — ANALYTICS DASHBOARD

> **Windsurf Prompt:**

```
Build the Analytics Dashboard at /analytics (src/pages/Analytics.tsx).
Use recharts for all charts. Cyberpunk dark styling for all charts.

Chart styling defaults:
- Background: transparent (card wraps it)
- Grid lines: rgba(30,41,59,0.8) (subtle)
- Axis text: #94A3B8 (muted)
- Tooltip: dark bg rgba(17,24,39,0.95) + cyan border
- All chart colors from agent/accent palette

ROW 1 (2 columns):
1. "TASKS COMPLETED OVER TIME" (last 30 days)
   - AreaChart: cyan gradient fill (dark to transparent), smooth curve
   - X: day labels, Y: count
   - Generate 30 data points (simulated, realistic curve)

2. "XP EARNED OVER TIME" (last 30 days)
   - LineChart: gold line, dot on each point
   - Glow effect on line via Tailwind drop-shadow filter
   - Same 30 data points

ROW 2 (2 columns):
3. "TASKS BY AGENT" 
   - HorizontalBarChart
   - Each bar in that agent's color
   - Shows all 14 agents (exclude AARYA from this)
   - Sorted by count descending

4. "TASKS BY DIVISION"
   - PieChart (donut style, innerRadius 60)
   - Segments in division accent colors
   - Custom legend below

ROW 3 (2 columns):
5. "PRIORITY DISTRIBUTION" (by week, last 4 weeks)
   - StackedBarChart
   - Stacks: Critical (#FF3366), High (#FFD700), Normal (#00FF88), Low (#94A3B8)

6. "AGENT ACTIVITY HEATMAP"
   - Grid: 14 rows (agents) × 7 columns (days of week)
   - Cell color intensity = activity level (0=dark, high=agent's color)
   - Agent names on Y axis, days on X axis
   - Build as custom SVG/div grid (recharts doesn't have native heatmap)

ROW 4 (2 columns):
7. "REVENUE PIPELINE"
   - FunnelChart (use recharts FunnelChart)
   - Lead → Negotiating → Agreed → Delivered → Paid
   - Values from deals data

8. "MONTHLY REVENUE" (last 6 months)
   - BarChart: bars in gradient (purple to cyan)
   - Show ₹ amounts on Y axis

All charts wrapped in glassmorphism GlowCards with:
- "Chart Title" in Orbitron small
- Chart component
- Subtle hover glow effect

All charts animate on mount (recharts isAnimationActive=true).

Commit:
git add .
git commit -m "[THOR] feat: analytics dashboard with 8 cyberpunk recharts"
git push origin main
```

---

# PHASE 8 — XP & GAMIFICATION ENGINE

> **Windsurf Prompt:**

```
Build the Gamification page at /xp (src/pages/XP.tsx).

SECTION 1: LEADERBOARD (full team)
- Title: "🏆 AGENT LEADERBOARD"
- Sorted by XP descending (exclude AARYA — she is always #0)
- Each row:
  - Rank number (gold/silver/bronze glow for top 3)
  - Agent emoji + codename
  - Level badge (colored by level)
  - XP bar (progress to next level, agent color)
  - "X XP" label
  - Tasks done count
  - Win streak (consecutive completions)
- Top 3 get special treatment:
  - #1: Gold border + glow + crown emoji
  - #2: Silver border + medal emoji
  - #3: Bronze border + medal emoji

SECTION 2: LEVEL SYSTEM GUIDE
- 5 cards in a row (Rookie → Mythic)
- Each card:
  - Level icon (shield emoji styled with level color)
  - Level name (Orbitron)
  - XP range
  - Color glow
  - Perks list (3 bullet points)
- Mythic card: special animated cyan glow + particle effect

SECTION 3: ACHIEVEMENTS GRID
- Title: "🎖️ ACHIEVEMENTS (32 TOTAL)"
- Unlocked filter tab / All tab
- Grid (4 columns on desktop, 2 on mobile)
- 20+ achievement badges:
  🏆 First Blood — Complete first task (50 XP)
  🔥 On Fire — 3 tasks in one day (100 XP)
  ⚡ Speed Demon — Complete task under 1 hour (75 XP)
  🎯 Sharpshooter — 5 tasks with 0 bugs (150 XP)
  💪 Heavy Lifter — Complete Critical task (200 XP)
  🤝 Team Player — Collaborate with 3+ agents (100 XP)
  📈 Level Up — Reach Agent level (50 XP)
  🌟 Rising Star — Reach Elite level (100 XP)
  👑 Legend — Reach Legend level (200 XP)
  ⚡ Mythic — Reach Mythic level (500 XP)
  🔨 Builder — 10 dev tasks done (150 XP)
  ✍️ Wordsmith — 10 content tasks done (150 XP)
  🛡️ Guardian — 5 security audits done (150 XP)
  🚀 Optimizer — Improve perf by 20+ (200 XP)
  💰 Money Maker — Close ₹1L+ deal (300 XP)
  🎖️ Veteran — 50 total tasks (500 XP)
  🌐 Full Stack — Tasks in 3+ divisions (125 XP)
  ⏰ Night Owl — Complete task after midnight (75 XP)
  🎯 100% — Complete sprint with zero bugs (300 XP)
  🔗 Chain Master — 7-day task streak (200 XP)

Each badge card:
- Locked: grayscale + "? ? ?" text overlay
- Unlocked: full color + glow + agent who earned it + unlock date
- Hover: scale up + glow burst
- Click: modal with full achievement detail + which agents have it

SECTION 4: XP ACTIVITY LOG
- Title: "📊 XP ACTIVITY LOG"
- Recent 20 XP transactions from useXPStore
- Format: [time] [emoji] [AGENT] earned [XP] XP for '[task]'
- Color: XP amount in gold, agent name in their color

ACHIEVEMENT UNLOCK ANIMATION (global):
When achievement unlocks anywhere in app:
- Full-screen overlay (dark, 0.3 opacity)
- Achievement card scales in from center
- Particle burst effect
- Sound: fanfare (if audio enabled)
- Auto-dismiss after 3 seconds

Commit:
git add .
git commit -m "[AARYA] feat: gamification engine - leaderboard, achievements, XP log"
git push origin main
```

---

# PHASE 9 — 3D CYBERPUNK HQ (THE SHOWSTOPPER)

> **Windsurf Prompt — Part A: Room + Furniture:**

```
Build the 3D Cyberpunk HQ at /hq (src/pages/HQ.tsx).
Use Three.js + React Three Fiber (@react-three/fiber) + @react-three/drei + @react-three/postprocessing.

IMPORTANT: Wrap entire 3D scene in React.lazy + Suspense. Loading fallback = "⚡ Initializing AARYA HQ..." full-screen dark loading.

HQ HTML OVERLAY (absolute positioned over canvas):
- Top-left: "🏢 AARYA HQ — CYBERPUNK COMMAND CENTER" (Orbitron)
- Top-right: "15/15 Agents Active" badge + Legend (🟢 Working 🟡 Idle 🔵 Break)
- Camera presets buttons: Overview | AARYA View | War Room | Bird's Eye
- Bottom-right: FPS counter (subtle, small)

CANVAS + CAMERA:
- Canvas: full width, full height (calc(100vh - 64px))
- Camera position: [0, 22, 18], fov: 60
- OrbitControls: enableDamping, dampingFactor 0.05, minDistance 10, maxDistance 40, maxPolarAngle Math.PI/2.1
- Right-click: reset camera to default position

THE ROOM (src/three/Room.tsx):
- Floor: PlaneGeometry 30×24, MeshStandardMaterial color #1A1A2E
  - Grid overlay: GridHelper with cyan lines (#00FFFF15), opacity pulsing via useFrame
- 4 Walls: BoxGeometry, color #0D1117, MeshStandardMaterial
- Ceiling: dark, no grid
- 4 Corner accent pillars: CylinderGeometry tall, emissive [cyan, pink, purple, green]
- Neon strip lights along wall edges: thin BoxGeometry emissive #00FFFF
- Ambient light: color #1a1a3e, intensity 0.3
- 1 Directional light from above
- PointLight at AARYA's station: cyan, intensity 2

FURNITURE (src/three/Furniture.tsx):
All from BoxGeometry (cyberpunk style):

AARYA Command Station (center-back, elevated on platform):
- Platform: BoxGeometry 4×0.3×4, hex shape approximation, emissive cyan edge
- Desk: BoxGeometry 3×0.2×1.2, dark metallic
- 3 Monitor screens: thin BoxGeometry, emissive cyan arranged in arc
- Holographic globe: WireframeGeometry SphereGeometry, emissive cyan, slowly rotating
- Chair: BoxGeometry shapes assembled
- Floating Text (drei <Text>): "⚡ AARYA — COMMAND", color cyan, fontSize 0.4

15 Agent Workstations (U-shape layout):
Left wall (5): JARVIS, FRIDAY, ULTRON, ROCKET, SHURI
Right wall (5): VISION, WANDA, NATASHA, THOR, HULK
Front row (4): BUCKY, HAWKEYE, HEIMDALL, GROOT
- Each: Desk (dark box) + Monitor (agent color emissive screen) + floating name tag (drei Text in agent color, fontSize 0.3)
- PointLight above each desk in agent's color (intensity 0.5, distance 4)

War Room (left-center):
- Round table: CylinderGeometry, dark + cyan edge glow
- 8 chairs around it
- 3 large emissive screens on back wall
- Floating tactical map: PlaneGeometry grid, emissive cyan
- Text: "WAR ROOM" emissive red

Server Core (back-left corner):
- Tall rack: BoxGeometry 1×3×0.6, dark
- LED lights: tiny Box geometries, emissive green/cyan/orange, random blink in useFrame
- Text: "AI CORE" emissive green

Relaxation Pod (front-right):
- 2 sofa shapes, wall screen, low table
- Neon sign: "RECHARGE" emissive pink

Coffee Station (back-right near wall):
- Counter + machine box + 3 cup geometries
- Text: "FUEL ☕" emissive orange

POST-PROCESSING (wrap scene in <EffectComposer>):
- Bloom: intensity 0.5, threshold 0.8, luminanceThreshold 0.8
- Vignette: offset 0.5, darkness 0.5

Show Phase A result. Next message will add agent characters.

Commit:
git add .
git commit -m "[JARVIS] feat: 3D HQ Phase A - room, furniture, lighting"
git push origin main
```

> **Windsurf Prompt — Part B: Agent Characters + Movement:**

```
Add the 15 cyberpunk agent characters to the 3D HQ.

AGENT CHARACTER (src/three/AgentCharacter.tsx):
Each agent is built from BoxGeometry (Minecraft-style cyberpunk):

Body parts (all BoxGeometry):
- Head: 0.5×0.5×0.5, skin-tone material #D4956A
- Eyes: 2 tiny emissive cubes (0.08×0.08×0.05) on face, agent's color
- Holographic visor: thin transparent plane across face (agent color, opacity 0.3)
- Torso: 0.5×0.6×0.3, agent's color MeshStandardMaterial
- Left arm: 0.15×0.55×0.15
- Right arm: 0.15×0.55×0.15
- Left leg: 0.18×0.5×0.18
- Right leg: 0.18×0.5×0.18
- Name tag: drei <Text> above head, agent color, fontSize 0.3
- Tiny antenna on head (CylinderGeometry thin)

All assembled using Group + position offsets.

ANIMATIONS (useFrame):
Walking: sin wave arm/leg swing (amplitude 0.4, frequency 3)
- Arms: Math.sin(time * 3) * 0.4 on x rotation
- Legs: opposite phase to arms

Idle: full body gentle bob (y += Math.sin(time * 1.5) * 0.02)

Working (at desk): arm move to "typing" position, small rapid movement

Celebrate (on task complete): jump (y += 0.5 over 0.5s), arms raise, particle burst

MOVEMENT SYSTEM (per agent, useRef for independent timers):
Each agent has:
- currentPos: Vector3 (ref)
- targetPos: Vector3 (ref)
- isMoving: boolean
- animState: 'walking' | 'idle' | 'working' | 'celebrating'
- nextMoveTimer: (randomized 5-12 seconds)

Points of Interest (POIs):
- Own desk position
- AARYA command station
- War room (2-3 positions around table)
- Server core
- Coffee station
- Relaxation pod
- Random open floor positions (10 preset random positions)

Movement logic (every 5-12s random interval per agent):
- 30%: go to own desk → switch to 'working' on arrival
- 25%: go to random POI
- 20%: go to another random agent's desk → face each other → show speech bubble
- 15%: random open floor position
- 10%: go to AARYA command station

Position interpolation: use THREE.Vector3.lerp(target, 0.05) in useFrame

Collision avoidance: if distance to any other agent < 1.2, apply small repulsion force

Collaboration bubble (drei <Html>):
When agent visits another agent's desk:
- Floating HTML: "💬 Discussing: [random topic from list]"
- topics: ['API design', 'UI component', 'Content strategy', 'Bug fix', 'Deployment', 'Data model', 'Campaign', 'Research findings']
- Show for 4 seconds, then hide

AGENT CLICK INTERACTION:
- raycaster click on any agent body part
- Shows HTML overlay panel (fixed position):
  - Agent emoji + name large
  - Role + division
  - Status badge
  - Current task
  - Level + XP bar (agent color)
  - "Assign Mission" button (opens task modal)
  - Click outside or X to dismiss

Place all 15 agents at their desk positions on load, then start movement timers with random offsets (so they don't all move at once).

Commit:
git add .
git commit -m "[JARVIS] feat: 3D HQ Phase B - agent characters + autonomous movement"
git push origin main
```

---

# PHASE 10 — SETTINGS PAGE + AUDIO SYSTEM

> **Windsurf Prompt:**

```
Build the Settings page at /settings (src/pages/Settings.tsx) and audio system.

SETTINGS PAGE (4 sections):

Section 1: "⚡ AARYA CONFIGURATION"
- Toggle: Enable/disable ambient audio (default: off)
- Toggle: Enable/disable particle effects (default: on)
- Toggle: Enable/disable scanline overlay (default: on)
- Select: 3D HQ render quality (Low / Medium / High, default: Medium)
- Select: Theme variant (Cyberpunk Neon [default] / Matrix Green / Synthwave Purple)

Section 2: "👥 TEAM SETTINGS"
- Toggle: Auto-assign tasks to agents (default: on)
- Toggle: Enable XP notifications (default: on)
- Toggle: Enable achievement popups (default: on)
- Number input: Default XP reward for new tasks (default: 100)

Section 3: "💾 DATA MANAGEMENT"
- Button: "Export All Data" — downloads JSON file with all agents, tasks, deals, XP data
  (JSON.stringify all stores → Blob → download link)
- Button: "Import Data" — file upload input, parses JSON and updates stores
- Button: "Reset to Defaults" — shows confirmation modal, then resets all stores to initial data

Section 4: "ℹ️ ABOUT"
- AARYA Mission Control v1.0
- Built by: INAI Worlds Pvt. Ltd.
- Powered by: OpenClaw + Claude Sonnet
- 15 agents, 9 divisions
- Small cyberpunk ASCII art

All settings saved to localStorage. On app load, read settings from localStorage.

AUDIO SYSTEM (src/hooks/useAudio.ts using howler.js):
Since we can't include actual audio files, implement the system with Web Audio API oscillator as placeholder:

Create useAudio hook:
- ambientEnabled: from settings store
- Functions: playPing(), playChime(), playXP(), playFanfare(), playWhoosh(), playError(), playClick()

Each function creates a short Web Audio API sound:
- playPing: short 800Hz sine, 0.1s, volume 0.3
- playChime: ascending 3-note (523→659→784Hz), 0.3s each
- playXP: quick 440→880Hz sweep, 0.2s
- playFanfare: 4-note ascending, 0.2s each
- playWhoosh: filtered noise sweep, 0.3s
- playError: low 200Hz, slight vibrato, 0.5s
- playClick: very short 1000Hz, 0.05s

Integration points:
- Task completed → playChime() + playXP()
- Achievement unlocked → playFanfare()
- Task created → playPing()
- Agent assigned → playWhoosh()
- Error → playError()
- Navigation click → playClick()
- All respect the ambientEnabled setting

Commit:
git add .
git commit -m "[SHURI] feat: settings page, audio system with Web Audio API"
git push origin main
```

---

# PHASE 11 — TOAST SYSTEM + KEYBOARD SHORTCUTS + MODALS

> **Windsurf Prompt:**

```
Add global systems: Toast notifications, keyboard shortcuts, and shared modal system.

TOAST SYSTEM (src/components/ui/Toast.tsx):
Global toast container (fixed top-right, z-index 9999)

Toast component:
- Slide in from right on appear (framer-motion: x: 100 → 0)
- Auto-dismiss after 4 seconds (fade out + slide right)
- Colors by type:
  success: bg rgba(0,255,136,0.1), border #00FF88, icon: CheckCircle
  info: bg rgba(0,255,255,0.1), border #00FFFF, icon: Info
  warning: bg rgba(255,215,0,0.1), border #FFD700, icon: AlertTriangle
  error: bg rgba(255,51,102,0.1), border #FF3366, icon: XCircle
  xp: bg rgba(255,215,0,0.1), border #FFD700, special gold glow
  achievement: special larger toast with achievement icon

Each toast shows:
- Icon (agent emoji if agent-related)
- Message text
- X close button
- Progress bar showing time remaining (shrinks from full to empty in 4s)

Max 5 toasts stacked at once (oldest auto-dismisses if limit hit).

Create useToast hook:
- toast.success(message)
- toast.info(message)
- toast.warning(message)
- toast.error(message)
- toast.xp(agentName, xpAmount, taskName)
- toast.achievement(achievementName, agentName)

KEYBOARD SHORTCUTS (src/hooks/useKeyboardShortcuts.ts):
- Ctrl+K → focus quick command input on dashboard (or global search)
- G then D → navigate to /
- G then T → navigate to /tasks
- G then H → navigate to /hq
- G then A → navigate to /analytics
- G then X → navigate to /xp
- Escape → close any open modal
- ? → show keyboard shortcuts help modal

KEYBOARD SHORTCUTS HELP MODAL:
- Press ? to open
- Lists all shortcuts in a cyberpunk-styled table
- Agent JARVIS intro text at top

GLOBAL MODAL SYSTEM (src/components/ui/Modal.tsx):
Reusable Modal component:
- Props: isOpen, onClose, title, children, size ('sm'|'md'|'lg'|'xl')
- Full-screen dark overlay (bg rgba(0,0,0,0.8))
- Centered panel: glassmorphism, rounded-xl, border rgba(0,255,255,0.2)
- Header: title (Orbitron) + X close button
- Body: children
- framer-motion: scale 0.9→1 + opacity 0→1 on open
- Close on Escape + overlay click

Wire up all existing modals (task creation, agent detail, deal creation) to use this system.

Commit:
git add .
git commit -m "[FRIDAY] feat: toast system, keyboard shortcuts, global modal"
git push origin main
```

---

# PHASE 12 — POLISH + LOADING SCREEN + 404 + RESPONSIVE

> **Windsurf Prompt:**

```
Final polish pass for AARYA Mission Control.

LOADING SCREEN (src/components/LoadingScreen.tsx):
Show on app initial load (2 seconds), then fade out:
- Full screen bg #0A0A0F
- Center: "⚡" large glitch animation
- "AARYA MISSION CONTROL" in Orbitron, with glitch text effect
  (CSS animation: random clip-path distortions, 0.1s intervals, every 2-3 seconds)
- "Initializing Mission Control..." text below
- Progress bar: fills from 0→100% over 2 seconds (fake, CSS animation)
- Small: "INAI Worlds Pvt. Ltd." at bottom
- Fade out with opacity 0 + scale 0.95 (framer-motion) after 2.2s
- Never show again after first mount (use ref)

404 PAGE (src/pages/NotFound.tsx):
- Full-screen, centered content
- "404" in huge Orbitron, glitch animation, cyan glow
- "MISSION NOT FOUND"
- "Agent HEIMDALL couldn't locate this sector"
- Ambient particle background (10 floating dots)
- "Return to Command Center" button (cyan glow, navigate to /)

RESPONSIVE DESIGN:
Mobile (< 768px):
- Hide sidebar
- Show bottom navigation bar:
  5 icons: Home | Tasks | Team | Analytics | Settings
  Fixed bottom, glassmorphism, icon-only
- All grid layouts stack to single column
- Cards reduce padding
- Table views switch to card-list view
- 3D HQ: show "🖥️ AARYA HQ is best experienced on desktop" message with still image/placeholder

Tablet (768px - 1024px):
- Sidebar narrows to 64px (icons only, no labels)
- On hover: expand to full width
- 2-column grids where appropriate

PERFORMANCE:
- React.lazy() wrap ALL page components
- Suspense with loading fallback for each
- HQ page: extra heavy lazy load with "Initializing 3D..." loading state
- Add React.memo to AgentCard, TaskCard, DealRow components
- Memoize expensive computations (leaderboard sort) with useMemo

FINAL ANIMATIONS REVIEW:
- All pages should fade in on mount (framer-motion AnimatePresence on routes)
- Page transition: opacity 0→1, y: 10→0, duration 0.3s

Commit:
git add .
git commit -m "[BUCKY] feat: loading screen, 404, responsive design, performance"
git push origin main
```

---

# PHASE 13 — GITHUB PUSH + VERCEL DEPLOY

> **Windsurf Prompt:**

```
Set up GitHub repository and deploy to Vercel.

STEP 1: Create GitHub repo
Go to github.com → New repository:
- Name: aarya-mission-control
- Description: "AARYA Mission Control — AI Agent Orchestration Platform | 15 Marvel Agents | Cyberpunk 3D HQ | Gamification | Built by INAI Worlds"
- Visibility: Public (or Private, your choice)
- Do NOT add README (we already have one)

STEP 2: Connect and push
Run these commands:
git remote add origin https://github.com/[YOUR_USERNAME]/aarya-mission-control.git
git branch -M main
git push -u origin main

STEP 3: Verify all files are pushed (check GitHub)

STEP 4: Vercel deployment
1. Go to vercel.com → Sign in with GitHub
2. "Add New Project" → Import aarya-mission-control
3. Framework Preset: Vite
4. Build Command: npm run build
5. Output Directory: dist
6. Click "Deploy"

STEP 5: Verify deployment
- Check all 8 pages load on Vercel URL
- Test on mobile
- Check console for any errors

STEP 6: Final commit
Update README.md with:
- Live Vercel URL
- Tech stack badges
- Screenshots section (placeholder)
- Setup instructions
- All 15 agent names

git add .
git commit -m "[BUCKY] chore: configure Vercel deployment, update README"
git push origin main

Show me the live URL.
```

---

# PHASE 14 — FINAL REVIEW + BUG FIX PASS

> **Windsurf Prompt:**

```
HAWKEYE QA pass — review and fix all issues in AARYA Mission Control.

Review and fix:
1. All page routes work correctly
2. Drag and drop on kanban board works
3. Task creation modal saves and displays correctly
4. Agent cards show correct XP and levels
5. All charts render with data
6. Leaderboard sorts correctly
7. Settings save to localStorage and persist on refresh
8. Toast notifications appear for all key events
9. Keyboard shortcuts work
10. 3D HQ loads without crashing
11. Responsive layout works on mobile
12. Loading screen shows on first load
13. 404 page appears for invalid routes
14. Activity feed updates when tasks complete
15. XP system updates correctly when tasks moved to completed

Fix any TypeScript errors, console warnings, or visual glitches.

Ensure consistent cyberpunk styling across all pages:
- All glassmorphism cards have correct bg + backdrop-blur + border
- All headings use Orbitron font
- All body text uses JetBrains Mono
- Cyan glow on interactive elements
- Agent colors used consistently

Final commit:
git add .
git commit -m "[HAWKEYE] fix: final QA pass - all pages verified, bugs fixed"
git push origin main

AARYA Mission Control is LIVE. 🚀
```

---

## 🔄 BUCKY GIT PROTOCOL (Every Phase)

After each phase, always run:
```bash
git add .
git commit -m "[AGENT] type: description"
git push origin main
```

Commit message format:
```
[JARVIS] feat: add kanban drag-and-drop
[FRIDAY] style: cyberpunk glassmorphism cards
[HAWKEYE] fix: task status not updating on drop
[BUCKY] chore: update dependencies
[ULTRON] feat: add API routes
[AARYA] docs: update README
```

Types: `feat` | `fix` | `chore` | `style` | `refactor` | `test` | `docs`

---

## ✅ PHASE CHECKLIST

```
□ Phase 1:  Project scaffold + design system + all data + stores
□ Phase 2:  Sidebar + TopBar + Layout system
□ Phase 3:  Command Center dashboard
□ Phase 4:  Kanban Task Board + drag-and-drop
□ Phase 5:  Team page + org chart + agent modals
□ Phase 6:  Brand Deals Tracker
□ Phase 7:  Analytics Dashboard (8 charts)
□ Phase 8:  XP & Gamification Engine
□ Phase 9A: 3D Cyberpunk HQ — Room + Furniture
□ Phase 9B: 3D Cyberpunk HQ — Agents + Movement
□ Phase 10: Settings + Audio System
□ Phase 11: Toast + Keyboard Shortcuts + Modal System
□ Phase 12: Polish + Loading Screen + 404 + Responsive
□ Phase 13: GitHub + Vercel Deploy
□ Phase 14: HAWKEYE Final QA Pass
```

---

## 💡 WINDSURF TIPS

1. **Paste one phase at a time** — Windsurf Cascade handles long prompts well
2. **If 3D HQ crashes** — tell Windsurf: "The Three.js scene is crashing, HAWKEYE debug it"
3. **If TypeScript errors** — tell Windsurf: "Fix all TypeScript errors in [filename]"
4. **For UI improvements** — tell Windsurf: "FRIDAY, make [component] more cyberpunk"
5. **For new features** — tell Windsurf: "AARYA, new mission: add [feature name]"
6. **For bugs** — tell Windsurf: "HAWKEYE found a bug: [describe bug], fix it"

---

*⚡ AARYA Mission Control — Built for INAI Worlds Pvt. Ltd.*  
*15 Agents. 1 Mission. Infinite Possibilities.*