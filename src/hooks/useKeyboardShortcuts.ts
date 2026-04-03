import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CMD/CTRL + K to search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('quick-command-input');
        if (searchInput) searchInput.focus();
      }

      // Alt + 1-8 for navigation
      if (e.altKey) {
        switch (e.key) {
          case '1': navigate('/'); break;
          case '2': navigate('/tasks'); break;
          case '3': navigate('/team'); break;
          case '4': navigate('/hq'); break;
          case '5': navigate('/deals'); break;
          case '6': navigate('/analytics'); break;
          case '7': navigate('/xp'); break;
          case '8': navigate('/settings'); break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);
};
