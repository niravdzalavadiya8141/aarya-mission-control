import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Team from './pages/Team';
import HQ from './pages/HQ';
import Deals from './pages/Deals';
import Analytics from './pages/Analytics';
import XP from './pages/XP';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/team" element={<Team />} />
        <Route path="/hq" element={<HQ />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/xp" element={<XP />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
