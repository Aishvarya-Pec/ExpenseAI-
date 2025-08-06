import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/layout/Header';
import { Dashboard } from './components/dashboard/Dashboard';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme } = useTheme();
  const [user, setUser] = useState<any>(null);

  // Mock user - in production, this would come from Supabase auth
  useEffect(() => {
    setUser({
      id: 'user1',
      email: 'demo@expenseai.com',
      full_name: 'Demo User',
      avatar_url: null
    });
  }, []);

  const handleProfileClick = () => {
    // TODO: Implement profile functionality
    console.log('Profile clicked');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-indigo-50'
    }`}>
      <Header user={user} onProfileClick={handleProfileClick} />
      
      <main className="pb-8">
        <Dashboard />
      </main>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '12px',
            background: theme === 'dark' ? '#374151' : '#fff',
            color: theme === 'dark' ? '#f9fafb' : '#111827',
            border: `1px solid ${theme === 'dark' ? '#4b5563' : '#e5e7eb'}`,
          },
        }}
      />
    </div>
  );
}

export default App;