# AARYA Mission Control - Structure & Logic Flow

Aarya Mission Control ek autonomous agent orchestration system che, jema **15 specialized agents** (Marvel codenames sathe) alag-alag tactical divisions ma kam kare che. Aa file ma badhu step-by-step explain karyu che.

## 1. Core Architecture (Mukhya Dhanchu)

Aa project **React + Vite + Tailwind CSS** par banelu che ane state management mate **Zustand** no upyog thayo che.

### Key Technologies:
- **Zustand (Store)**: Badhu data (Agents, Tasks, XP, Deals) manage kare che.
- **Framer Motion**: Cyberpunk animations mate.
- **Three.js**: HQ Scene ma 3D environment mate.
- **Lucide React**: Icons mate.

---

## 2. Agent Roles & Divisions (Agents ane temna kam)

Project ma 9 tactical divisions che ane darek agent nu chokas kam che:

| Agent | Emoji | Role | Division | Work Description |
|-------|-------|------|----------|------------------|
| **AARYA** | ⚡ | Master Orchestrator | Command | Badha agents ne coordinate kare ane missions assign kare. |
| **JARVIS** | 🤖 | Lead Developer | Dev | React components ane core logic build kare. |
| **FRIDAY** | 🎨 | Frontend Dev | Dev | Cyberpunk UI ane styling nu dhyan rakhe. |
| **ULTRON** | 🔧 | Backend/Infra | Dev | Server setup ane database management kare. |
| **VISION** | ✍️ | Content Strategist | Content | LinkedIn ane social media mate content lakhe. |
| **WANDA** | 🔮 | Social Media Manager | Content | Instagram reels ane community engagement handle kare. |
| **BUCKY** | 🦾 | DevOps & Git | DevOps | CI/CD pipelines ane GitHub auto-commits manage kare. |
| **HAWKEYE** | 🎯 | QA Engineer | QA | Dashboard layout ane features ne test kare. |
| **NATASHA** | 💼 | Brand Partnerships | Business | Brand deals ane sponsorships handle kare. |
| **THOR** | ⚡ | Research Analyst | Research | Market research ane futuristic trends analyze kare. |
| **HULK** | 💪 | Data Processing | Research | Moto data ane CSV files ne process kare. |
| **ROCKET** | 🚀 | Performance | Dev | Bundle size ane application speed optimize kare. |
| **SHURI** | 🧪 | Innovation & R&D | Innovation | Voice commands ane nava features na prototypes banave. |
| **HEIMDALL** | 🛡️ | Security | Security | API security ane system monitoring kare. |
| **GROOT** | 🌱 | Community | Community | Nava users mate documentation ane support lakhe. |

---

## 3. Workflow & Logic Flow (Kam kevi rite thay che)

### Step 1: Mission Initialization (Command Center)
- Dashboard par **Quick Command** input thi tame AARYA ne command api shako cho.
- AARYA randomly ek available agent ne select kari ne task assign kare che.

### Step 2: Task Board Management (Kanban Board)
- Badha tasks `Backlog` thi sharu thay che.
- Tame drag-and-drop kari ne status badli shako cho: `Assigned` -> `In Progress` -> `Review` -> `Completed`.
- Jyaare task `Completed` thay, tyaare agent ne **XP Reward** male che.

### Step 3: XP & Leveling System
- Agent jetlu kam kare, etlu temnu XP vadhe.
- **Levels**: Rookie (0+) -> Agent (500+) -> Elite (1500+) -> Legend (3000+) -> Mythic (5000+).
- Level up thava thi nava perks ane status male che.

### Step 4: Live Activity Feed
- System ma j kai pan thay (New task, XP earn, Level up), te badhu **Live Activity Feed** ma dekhay che.

### Step 5: Analytics & Brand Deals
- **Analytics**: Badha agents nu performance charts dwara dekhay che.
- **Brand Deals**: Natasha je deals handle kare che, teni tracking ane revenue monitoring thaya che.

---

## 4. Problem Solving & Fixes

Aa project ma niche mujab na badlavo (changes) ane fixes karya che:
1. **React Error #185 Fix**: Infinite re-renders ne rokva mate `useMemo` ane `Zustand selectors` no upyog karyo.
2. **Performance Optimization**: Expensive filter operations ne memoized maps thi replace karya.
3. **Build Error Fix**: Vite configuration ane Tailwind 4 setup ne fix karyo jethi `npm run dev` ane `npm run build` barobar chale.
4. **Clean Code**: Unused variables ane imports ne kadhi nakhya jethi linter warnings na ave.

---
*Aarya Mission Control v1.0 — Built by INAI Worlds*
