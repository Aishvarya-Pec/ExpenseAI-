import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/layout/Header';
import { Dashboard } from './components/dashboard/Dashboard';
import { AuthPage } from './components/auth/AuthPage';
import { useTheme } from './hooks/useTheme';
import { useAuth } from './hooks/useAuth';

function App() {
  const { theme } = useTheme();
  const { user, loading, signOut } = useAuth();

  const handleProfileClick = () => {
    // TODO: Implement profile modal/dropdown
    console.log('Profile clicked');
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900' 
          : 'bg-gradient-to-br from-gray-50 via-white to-indigo-50'
      }`}>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <span className="text-white font-bold text-2xl">💰</span>
          </div>
          <div className="space-y-2">
            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Loading ExpenseAI...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-indigo-50'
    }`}>
      <Header user={user} onProfileClick={handleProfileClick} onSignOut={signOut} />
      
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
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
        }}
      />
    </div>
  );
}

export default App;