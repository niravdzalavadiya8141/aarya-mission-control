import { nanoid } from 'nanoid';

export type TaskStatus = 'backlog' | 'assigned' | 'in-progress' | 'review' | 'testing' | 'completed';
export type TaskPriority = 'critical' | 'high' | 'normal' | 'low';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  agentId: string;
  status: TaskStatus;
  priority: TaskPriority;
  xpReward: number;
  division: string;
  tags: string[];
  subtasks: Subtask[];
  estimatedHours: number;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export const INITIAL_TASKS: Task[] = [
  {
    id: nanoid(),
    title: 'Build Dashboard Layout',
    description: 'Create the main dashboard layout with sidebar and top bar components',
    agentId: 'jarvis',
    status: 'completed',
    priority: 'high',
    xpReward: 150,
    division: 'dev',
    tags: ['frontend', 'layout', 'ui'],
    subtasks: [
      { id: nanoid(), title: 'Create Sidebar component', completed: true },
      { id: nanoid(), title: 'Create TopBar component', completed: true },
      { id: nanoid(), title: 'Create Layout wrapper', completed: true },
      { id: nanoid(), title: 'Add responsive styles', completed: true },
    ],
    estimatedHours: 4,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
  },
  {
    id: nanoid(),
    title: 'Design Cyberpunk UI Theme',
    description: 'Create CSS variables and design system for cyberpunk aesthetic',
    agentId: 'friday',
    status: 'completed',
    priority: 'high',
    xpReward: 200,
    division: 'dev',
    tags: ['design', 'theme', 'css'],
    subtasks: [
      { id: nanoid(), title: 'Define color palette', completed: true },
      { id: nanoid(), title: 'Create glassmorphism styles', completed: true },
      { id: nanoid(), title: 'Add neon glow effects', completed: true },
    ],
    estimatedHours: 6,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
  },
  {
    id: nanoid(),
    title: 'Set up VPS Infrastructure',
    description: 'Configure VPS on Hostinger for production deployment',
    agentId: 'ultron',
    status: 'backlog',
    priority: 'critical',
    xpReward: 250,
    division: 'dev',
    tags: ['infrastructure', 'vps', 'deployment'],
    subtasks: [
      { id: nanoid(), title: 'Create VPS instance', completed: false },
      { id: nanoid(), title: 'Configure Nginx', completed: false },
      { id: nanoid(), title: 'Set up SSL certificates', completed: false },
      { id: nanoid(), title: 'Configure firewall', completed: false },
    ],
    estimatedHours: 8,
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    updatedAt: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: nanoid(),
    title: 'Write LinkedIn Content Strategy',
    description: 'Create content calendar and post templates for LinkedIn',
    agentId: 'vision',
    status: 'completed',
    priority: 'normal',
    xpReward: 100,
    division: 'content',
    tags: ['content', 'linkedin', 'strategy'],
    subtasks: [
      { id: nanoid(), title: 'Research competitor content', completed: true },
      { id: nanoid(), title: 'Create content calendar', completed: true },
      { id: nanoid(), title: 'Write 5 post templates', completed: true },
    ],
    estimatedHours: 3,
    createdAt: new Date(Date.now() - 43200000).toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
  },
  {
    id: nanoid(),
    title: 'Create Instagram Reel Scripts',
    description: 'Write scripts for 3 Instagram Reels showcasing AARYA',
    agentId: 'wanda',
    status: 'assigned',
    priority: 'normal',
    xpReward: 120,
    division: 'content',
    tags: ['content', 'instagram', 'reels'],
    subtasks: [
      { id: nanoid(), title: 'Script for Reel 1', completed: false },
      { id: nanoid(), title: 'Script for Reel 2', completed: false },
      { id: nanoid(), title: 'Script for Reel 3', completed: false },
    ],
    estimatedHours: 4,
    createdAt: new Date(Date.now() - 129600000).toISOString(),
    updatedAt: new Date(Date.now() - 129600000).toISOString(),
  },
  {
    id: nanoid(),
    title: 'Setup GitHub Auto-Commits',
    description: 'Configure GitHub Actions for automated commits and BUCKY protocol',
    agentId: 'bucky',
    status: 'completed',
    priority: 'high',
    xpReward: 180,
    division: 'devops',
    tags: ['devops', 'github', 'automation'],
    subtasks: [
      { id: nanoid(), title: 'Create GitHub Actions workflow', completed: true },
      { id: nanoid(), title: 'Configure commit templates', completed: true },
      { id: nanoid(), title: 'Test auto-commit on push', completed: true },
    ],
    estimatedHours: 5,
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
  },
  {
    id: nanoid(),
    title: 'Test Dashboard Components',
    description: 'QA testing for all dashboard components and interactions',
    agentId: 'hawkeye',
    status: 'completed',
    priority: 'high',
    xpReward: 150,
    division: 'qa',
    tags: ['testing', 'qa', 'components'],
    subtasks: [
      { id: nanoid(), title: 'Test Sidebar navigation', completed: true },
      { id: nanoid(), title: 'Test responsive layouts', completed: true },
      { id: nanoid(), title: 'Test keyboard shortcuts', completed: true },
    ],
    estimatedHours: 6,
    createdAt: new Date(Date.now() - 60480000).toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
  },
  {
    id: nanoid(),
    title: 'Follow up Hostinger Deal',
    description: 'Negotiate final terms with Hostinger for VPS partnership',
    agentId: 'natasha',
    status: 'completed',
    priority: 'critical',
    xpReward: 300,
    division: 'business',
    tags: ['deals', 'negotiation', 'hostinger'],
    subtasks: [
      { id: nanoid(), title: 'Send revised proposal', completed: true },
      { id: nanoid(), title: 'Schedule follow-up call', completed: true },
      { id: nanoid(), title: 'Finalize contract terms', completed: true },
    ],
    estimatedHours: 10,
    createdAt: new Date(Date.now() - 518400000).toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
  },
  {
    id: nanoid(),
    title: '2026 Market Research Report',
    description: 'Research and compile market trends for AI agent platforms',
    agentId: 'thor',
    status: 'completed',
    priority: 'high',
    xpReward: 200,
    division: 'research',
    tags: ['research', 'market', 'report'],
    subtasks: [
      { id: nanoid(), title: 'Gather industry data', completed: true },
      { id: nanoid(), title: 'Analyze competitor landscape', completed: true },
      { id: nanoid(), title: 'Write executive summary', completed: true },
      { id: nanoid(), title: 'Create visual charts', completed: true },
    ],
    estimatedHours: 12,
    createdAt: new Date(Date.now() - 777600000).toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
  },
  {
    id: nanoid(),
    title: 'Process Customer CSV Data',
    description: 'Clean and analyze customer data from last quarter',
    agentId: 'hulk',
    status: 'backlog',
    priority: 'normal',
    xpReward: 120,
    division: 'research',
    tags: ['data', 'csv', 'analysis'],
    subtasks: [
      { id: nanoid(), title: 'Import raw CSV data', completed: false },
      { id: nanoid(), title: 'Clean data entries', completed: false },
      { id: nanoid(), title: 'Generate insights report', completed: false },
    ],
    estimatedHours: 5,
    createdAt: new Date(Date.now() - 950400000).toISOString(),
    updatedAt: new Date(Date.now() - 950400000).toISOString(),
  },
  {
    id: nanoid(),
    title: 'Bundle Size Optimization',
    description: 'Reduce bundle size by 30% through code splitting and lazy loading',
    agentId: 'rocket',
    status: 'backlog',
    priority: 'high',
    xpReward: 220,
    division: 'dev',
    tags: ['performance', 'optimization', 'bundle'],
    subtasks: [
      { id: nanoid(), title: 'Analyze current bundle size', completed: false },
      { id: nanoid(), title: 'Implement code splitting', completed: false },
      { id: nanoid(), title: 'Add lazy loading for 3D components', completed: false },
    ],
    estimatedHours: 8,
    createdAt: new Date(Date.now() - 1209600000).toISOString(),
    updatedAt: new Date(Date.now() - 1209600000).toISOString(),
  },
  {
    id: nanoid(),
    title: 'Voice Command Prototype',
    description: 'Prototype voice command system for AARYA Mission Control',
    agentId: 'shuri',
    status: 'completed',
    priority: 'normal',
    xpReward: 250,
    division: 'innovation',
    tags: ['innovation', 'voice', 'prototype'],
    subtasks: [
      { id: nanoid(), title: 'Research voice APIs', completed: true },
      { id: nanoid(), title: 'Build basic voice recognition', completed: true },
      { id: nanoid(), title: 'Integrate with command system', completed: true },
    ],
    estimatedHours: 15,
    createdAt: new Date(Date.now() - 1036800000).toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
  },
];
