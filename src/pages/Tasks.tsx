import React, { useState, useMemo } from 'react';
import { 
  DragDropContext, 
  Droppable, 
  Draggable, 
} from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Layout, 
  List as ListIcon, 
  Clock, 
  AlertCircle,
  MoreVertical,
  Trash2,
  Edit2
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

import GlowCard from '../components/ui/GlowCard';
import Modal from '../components/ui/Modal';
import { useTaskStore } from '../store/useTaskStore';
import { useXPStore } from '../store/useXPStore';
import { AGENTS } from '../data/agents';
import type { Task, TaskStatus, TaskPriority } from '../data/tasks';

// --- Constants ---

const COLUMNS: { id: TaskStatus; label: string; color: string }[] = [
  { id: 'backlog', label: 'BACKLOG', color: '#475569' },
  { id: 'assigned', label: 'ASSIGNED', color: '#00FFFF' },
  { id: 'in-progress', label: 'IN PROGRESS', color: '#3B82F6' },
  { id: 'review', label: 'REVIEW', color: '#8B5CF6' },
  { id: 'testing', label: 'TESTING', color: '#EF4444' },
  { id: 'completed', label: 'COMPLETED', color: '#00FF88' },
];

// --- Sub-components ---

const TaskCard = ({ task, index }: { task: Task; index: number }) => {
  const agent = AGENTS.find(a => a.id === task.agentId);
  const doneSubtasks = task.subtasks.filter(s => s.completed).length;
  const progress = (doneSubtasks / (task.subtasks.length || 1)) * 100;

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`mb-3 group outline-none transition-all ${snapshot.isDragging ? 'scale-105 z-50' : ''}`}
        >
          <GlowCard 
            glowColor={agent?.color} 
            className={`p-3 !bg-[#111827]/90 border-l-4 ${snapshot.isDragging ? 'shadow-2xl opacity-90' : ''}`}
            style={{ borderLeftColor: agent?.color }}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-xs font-bold text-white group-hover:text-[#00FFFF] transition-colors leading-tight line-clamp-2">
                {task.title}
              </h4>
            </div>
            
            <p className="text-[10px] text-gray-500 line-clamp-2 mb-3 leading-relaxed">
              {task.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-3">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/40 border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: agent?.color }} />
                <span className="text-[9px] font-bold uppercase tracking-tighter" style={{ color: agent?.color }}>
                  {agent?.name}
                </span>
              </div>
              <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-tighter
                ${task.priority === 'critical' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                  task.priority === 'high' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                  'bg-blue-500/10 text-blue-400 border border-blue-500/20'}
              `}>
                {task.priority === 'critical' ? <AlertCircle size={8} /> : null}
                {task.priority}
              </div>
              <div className="px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-[9px] font-bold uppercase tracking-tighter">
                ⚡ {task.xpReward} XP
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[8px] font-bold text-gray-600 uppercase tracking-widest">
                <span>Subtasks: {doneSubtasks}/{task.subtasks.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1 w-full bg-slate-800/50 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: agent?.color, boxShadow: `0 0 6px ${agent?.color}44` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
              <div className="flex items-center gap-1 text-[9px] text-gray-600">
                <Clock size={10} />
                {formatDistanceToNow(new Date(task.createdAt))} ago
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1 hover:text-[#00FFFF] text-gray-600 transition-colors"><Edit2 size={10} /></button>
                <button className="p-1 hover:text-red-400 text-gray-600 transition-colors"><Trash2 size={10} /></button>
              </div>
            </div>
          </GlowCard>
        </div>
      )}
    </Draggable>
  );
};

// --- Main Component ---

export default function Tasks() {
  const { tasks, moveTask, addTask } = useTaskStore();
  const { addXP, addActivity } = useXPStore();
  
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const [search, setSearch] = useState('');
  const [filterAgent, setFilterAgent] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newAgent, setNewAgent] = useState(AGENTS[1].id);
  const [newPriority, setNewPriority] = useState<TaskPriority>('normal');
  const [newXP, setNewXP] = useState(100);

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || 
                          t.description.toLowerCase().includes(search.toLowerCase());
      const matchesAgent = filterAgent === 'all' || t.agentId === filterAgent;
      const matchesPriority = filterPriority === 'all' || t.priority === filterPriority;
      return matchesSearch && matchesAgent && matchesPriority;
    });
  }, [tasks, search, filterAgent, filterPriority]);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const newStatus = destination.droppableId as TaskStatus;
    const task = tasks.find(t => t.id === draggableId);
    
    if (task) {
      moveTask(draggableId, newStatus);
      
      if (newStatus === 'completed') {
        const agent = AGENTS.find(a => a.id === task.agentId);
        addXP(task.agentId, task.xpReward, `Completed mission: ${task.title}`, task.id);
        addActivity({
          agentId: task.agentId,
          agentName: agent?.name || 'Unknown',
          agentEmoji: agent?.emoji || '👤',
          agentColor: agent?.color || '#FFFFFF',
          action: `completed mission: "${task.title}" (+${task.xpReward} XP)`,
          xpEarned: task.xpReward,
        });
        // Here you would trigger confetti and sound
      }
    }
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    const agent = AGENTS.find(a => a.id === newAgent);
    
    addTask({
      title: newTitle,
      description: newDesc,
      agentId: newAgent,
      status: 'assigned',
      priority: newPriority,
      xpReward: newXP,
      division: agent?.division || 'dev',
      tags: [],
      subtasks: [],
      estimatedHours: 2,
    });

    addActivity({
      agentId: 'aarya',
      agentName: 'AARYA',
      agentEmoji: '⚡',
      agentColor: '#00FFFF',
      action: `assigned mission to ${agent?.name}: "${newTitle}"`,
    });

    setIsModalOpen(false);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#00FFFF] transition-colors" size={16} />
            <input 
              type="text"
              placeholder="Search missions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-[#111827] border border-slate-800 focus:border-[#00FFFF] rounded-lg text-sm text-white outline-none w-64 transition-all"
            />
          </div>

          <select 
            value={filterAgent}
            onChange={(e) => setFilterAgent(e.target.value)}
            className="px-3 py-2 bg-[#111827] border border-slate-800 focus:border-[#00FFFF] rounded-lg text-sm text-white outline-none"
          >
            <option value="all">All Agents</option>
            {AGENTS.filter(a => a.id !== 'aarya').map(a => (
              <option key={a.id} value={a.id}>{a.emoji} {a.name}</option>
            ))}
          </select>

          <select 
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 bg-[#111827] border border-slate-800 focus:border-[#00FFFF] rounded-lg text-sm text-white outline-none"
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex p-1 bg-[#111827] border border-slate-800 rounded-lg">
            <button 
              onClick={() => setView('kanban')}
              className={`p-1.5 rounded-md transition-all ${view === 'kanban' ? 'bg-[#00FFFF] text-black shadow-[0_0_10px_rgba(0,255,255,0.4)]' : 'text-gray-500 hover:text-white'}`}
            >
              <Layout size={18} />
            </button>
            <button 
              onClick={() => setView('list')}
              className={`p-1.5 rounded-md transition-all ${view === 'list' ? 'bg-[#00FFFF] text-black shadow-[0_0_10px_rgba(0,255,255,0.4)]' : 'text-gray-500 hover:text-white'}`}
            >
              <ListIcon size={18} />
            </button>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#00FFFF] text-black font-black rounded-lg hover:bg-[#00CCCC] active:scale-95 transition-all text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(0,255,255,0.2)]"
          >
            <Plus size={16} /> NEW MISSION
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar min-h-[calc(100vh-250px)]">
          {COLUMNS.map(col => (
            <div key={col.id} className="flex flex-col min-w-[300px] w-[300px] shrink-0">
              <div 
                className="flex items-center justify-between p-3 border-t-2 mb-4 bg-[rgba(255,255,255,0.02)] rounded-t-lg"
                style={{ borderColor: col.color }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black tracking-[0.2em]" style={{ color: col.color }}>
                    {col.label}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-gray-400">
                    {filteredTasks.filter(t => t.status === col.id).length}
                  </span>
                </div>
                <MoreVertical size={14} className="text-gray-600" />
              </div>

              <Droppable droppableId={col.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-1 rounded-b-lg transition-colors p-2 ${snapshot.isDraggingOver ? 'bg-white/[0.03]' : 'bg-transparent'}`}
                  >
                    {filteredTasks
                      .filter(t => t.status === col.id)
                      .map((task, index) => (
                        <TaskCard key={task.id} task={task} index={index} />
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {/* New Mission Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="⚡ CREATE NEW MISSION"
      >
        <form onSubmit={handleCreateTask} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Mission Title</label>
            <input 
              required
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter mission title..."
              className="w-full bg-[#0D1117] border border-slate-800 focus:border-[#00FFFF] rounded-lg p-3 text-sm text-white outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Mission Brief</label>
            <textarea 
              rows={3}
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Describe the mission details..."
              className="w-full bg-[#0D1117] border border-slate-800 focus:border-[#00FFFF] rounded-lg p-3 text-sm text-white outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Assign Agent</label>
              <select 
                value={newAgent}
                onChange={(e) => setNewAgent(e.target.value)}
                className="w-full bg-[#0D1117] border border-slate-800 focus:border-[#00FFFF] rounded-lg p-3 text-sm text-white outline-none"
              >
                {AGENTS.filter(a => a.id !== 'aarya').map(a => (
                  <option key={a.id} value={a.id}>{a.emoji} {a.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Priority</label>
              <select 
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as TaskPriority)}
                className="w-full bg-[#0D1117] border border-slate-800 focus:border-[#00FFFF] rounded-lg p-3 text-sm text-white outline-none"
              >
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="normal">Normal</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">XP Reward</label>
              <span className="text-[10px] font-bold text-yellow-400">⚡ {newXP} XP</span>
            </div>
            <input 
              type="range"
              min="50"
              max="500"
              step="50"
              value={newXP}
              onChange={(e) => setNewXP(parseInt(e.target.value))}
              className="w-full accent-[#00FFFF]"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#00FFFF] text-black font-black rounded-lg py-3 mt-4 flex items-center justify-center gap-2 hover:bg-[#00CCCC] active:scale-95 transition-all text-sm tracking-[0.2em] uppercase"
          >
            INITIALIZE MISSION
          </button>
        </form>
      </Modal>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
