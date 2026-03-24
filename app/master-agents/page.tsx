'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Crown, 
  Users, 
  Activity, 
  Brain, 
  Target, 
  Zap, 
  Shield, 
  Terminal,
  RefreshCw,
  Power
} from 'lucide-react'

interface Agent {
  id: string
  name: string
  type: 'master' | 'api' | 'monitor' | 'analytics' | 'communications'
  status: 'online' | 'processing' | 'offline' | 'maintenance'
  metrics: {
    tasks: number
    uptime: number
    performance: number
    latency: number
  }
  capabilities: string[]
  lastHeartbeat: Date
  subAgents?: Agent[]
}

interface MasterAgent extends Agent {
  subAgentsCount: number
  systemLoad: number
  currentTask: string
  performanceGraph: { time: string; load: number; response: number }[]
}

export default function MasterMissionControl() {
  const [masterAgent, setMasterAgent] = useState<MasterAgent>({
    id: 'master-001',
    name: 'Ruflo Nexus',
    type: 'master',
    status: 'online',
    metrics: {
      tasks: 12784,
      uptime: 99.97,
      performance: 94.8,
      latency: 12
    },
    capabilities: ['Multi-agent coordination', 'Task distribution', 'Resource optimization', 'API orchestration'],
    lastHeartbeat: new Date(),
    subAgentsCount: 12,
    systemLoad: 67.3,
    currentTask: 'Coordinating global API monitoring across 1,247 endpoints',
    performanceGraph: [
      { time: '00:00', load: 45, response: 95 },
      { time: '04:00', load: 52, response: 94 },
      { time: '08:00', load: 67, response: 96 },
      { time: '12:00', load: 89, response: 92 },
      { time: '16:00', load: 78, response: 94 },
      { time: '20:00', load: 67, response: 96 }
    ]
  })

  const [subAgents, setSubAgents] = useState<Agent[]>([
    {
      id: 'api-agent-001',
      name: 'API Discovery Master',
      type: 'api',
      status: 'online',
      metrics: { tasks: 4231, uptime: 99.98, performance: 97.2, latency: 8 },
      capabilities: ['Real-time API discovery', 'Endpoint testing', 'Cache management', 'Rate limiting'],
      lastHeartbeat: new Date(),
    },
    {
      id: 'monitor-agent-001', 
      name: 'System Monitor Sentinel',
      type: 'monitor',
      status: 'processing',
      metrics: { tasks: 8923, uptime: 99.95, performance: 95.6, latency: 5 },
      capabilities: ['Real-time monitoring', 'Health checks', 'Performance tracking', 'Alert management'],
      lastHeartbeat: new Date(),
    },
    {
      id: 'analytics-agent-001',
      name: 'Analytics Orchestrator', 
      type: 'analytics',
      status: 'online',
      metrics: { tasks: 1567, uptime: 100, performance: 98.9, latency: 15 },
      capabilities: ['Real-time analytics', 'Predictive analysis', 'Trend detection', 'Report generation'],
      lastHeartbeat: new Date(),
    },
    {
      id: 'comms-agent-001',
      name: 'Communication Hub',
      type: 'communications',
      status: 'maintenance',
      metrics: { tasks: 2341, uptime: 89.7, performance: 88.2, latency: 32 },
      capabilities: ['Multi-channel messaging', 'WebSocket management', 'Push notifications', 'Event broadcasting'],
      lastHeartbeat: new Date(),
    }
  ])

  const [systemMetrics, setSystemMetrics] = useState({
    totalServices: 1247,
    activeAPIs: 847,
    totalRequests: '2.4M',
    globalUptime: '99.97%',
    avgLatency: '23ms',
    cacheHit: '94.2%'
  })

  // Master agent simulator
  const updateMasterMetrics = useCallback(() => {
    setMasterAgent(prev => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        tasks: prev.metrics.tasks + Math.floor(Math.random() * 100),
        performance: Math.max(92, Math.min(100, prev.metrics.performance + (Math.random() * 2 - 1))),
        latency: Math.max(8, Math.min(25, prev.metrics.latency + (Math.random() * 4 - 2)))
      },
      systemLoad: Math.max(45, Math.min(95, prev.systemLoad + (Math.random() * 10 - 5))),
      performanceGraph: [
        ...prev.performanceGraph.slice(1),
        {
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          load: Math.floor(Math.random() * 40 + 50),
          response: Math.floor(Math.random() * 8 + 90)
        }
      ]
    }))
  }, [])

  // Sub-agent simulator
  const updateSubAgents = useCallback(() => {
    setSubAgents(prev => prev.map(agent => ({
      ...agent,
      metrics: {
        ...agent.metrics,
        tasks: agent.metrics.tasks + Math.floor(Math.random() * 50),
        performance: Math.max(85, Math.min(100, agent.metrics.performance + (Math.random() * 6 - 3))),
        latency: Math.max(3, Math.min(50, agent.metrics.latency + (Math.random() * 8 - 4)))
      },
      status: agent.status === 'maintenance' && Math.random() > 0.8 ? 'online' :
               agent.status === 'processing' && Math.random() > 0.3 ? 'online' :
               agent.status === 'online' && Math.random() < 0.1 ? 'processing' : agent.status
    })))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      updateMasterMetrics()
      updateSubAgents()
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'processing': return 'bg-blue-500 animate-pulse'
      case 'offline': return 'bg-red-500'
      case 'maintenance': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400'
      case 'processing': return 'text-blue-400'
      case 'offline': return 'text-red-400'
      case 'maintenance': return 'text-orange-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Quantum Background */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(0,0,0,1))]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.1),rgba(255,119,198,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(119,198,255,0.1),rgba(119,198,255,0))]" />
      </div>

      <div className="relative container mx-auto px-6 py-8">
        {/* Master Agent Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-