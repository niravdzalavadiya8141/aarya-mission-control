export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-8xl font-bold text-[#00FFFF] mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
        404
      </h1>
      <p className="text-2xl text-gray-400 mb-8">MISSION NOT FOUND</p>
      <p className="text-gray-500 mb-8">Agent HEIMDALL couldn't locate this sector</p>
      <a
        href="/"
        className="px-6 py-3 bg-[#00FFFF] text-black font-bold rounded hover:bg-[#00CCCC] transition-colors"
        style={{ fontFamily: 'Orbitron, sans-serif' }}
      >
        Return to Command Center
      </a>
    </div>
  );
}
