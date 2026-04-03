interface StatusDotProps {
  status: 'working' | 'idle' | 'break' | 'offline';
  className?: string;
  pulse?: boolean;
}

const statusColors = {
  working: 'bg-green-500',
  idle: 'bg-yellow-500',
  break: 'bg-blue-500',
  offline: 'bg-red-500',
};

export default function StatusDot({ status, className = '', pulse = true }: StatusDotProps) {
  const isWorking = status === 'working';
  
  return (
    <span className={`relative flex h-2.5 w-2.5 ${className}`}>
      {pulse && isWorking && (
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
      )}
      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${statusColors[status] || 'bg-gray-500'}`}></span>
    </span>
  );
}
