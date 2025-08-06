import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './components/dashboard/Dashboard';
import { AuthPage } from './components/auth/AuthPage';
import { LandingPage } from './components/pages/LandingPage';
import { HowItWorks } from './components/pages/HowItWorks';
import { Reviews } from './components/pages/Reviews';
import { useTheme } from './hooks/useTheme';
import { useAuth } from './hooks/useAuth';

function App() {
  const { theme } = useTheme();
  const { user, loading, signOut } = useAuth();
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [showSidebar, setShowSidebar] = useState(true);

  const handleProfileClick = () => {
    // TODO: Implement profile modal/dropdown
    console.log('Profile clicked');
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const handleGetStarted = () => {
    if (user) {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage('auth');
    }
  };

  const handleLearnMore = () => {
    setCurrentPage('how-it-works');
  };

  const handleViewReviews = () => {
    setCurrentPage('reviews');
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

  // Handle authentication flow
  if (!user && (currentPage === 'auth' || currentPage === 'dashboard')) {
    return <AuthPage />;
  }

  // Render page content
  const renderPageContent = () => {
    switch (currentPage) {
      case 'landing':
        return (
          <LandingPage
            onGetStarted={handleGetStarted}
            onLearnMore={handleLearnMore}
            onViewReviews={handleViewReviews}
          />
        );
      case 'how-it-works':
        return <HowItWorks />;
      case 'reviews':
        return <Reviews />;
      case 'auth':
        return <AuthPage />;
      case 'dashboard':
      case 'expenses':
      case 'groups':
      case 'analytics':
      case 'budgets':
      case 'cards':
      case 'calendar':
      case 'reports':
      case 'settings':
        if (!user) return <AuthPage />;
        return (
          <div className="flex">
            {showSidebar && (
              <Sidebar
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            )}
            <div className="flex-1">
              <Header user={user} onProfileClick={handleProfileClick} onSignOut={signOut} />
              <main className="p-6">
                {currentPage === 'dashboard' && <Dashboard />}
                {currentPage === 'expenses' && <div className="text-center py-20 text-gray-500">Expenses page coming soon...</div>}
                {currentPage === 'groups' && <div className="text-center py-20 text-gray-500">Group expenses page coming soon...</div>}
                {currentPage === 'analytics' && <div className="text-center py-20 text-gray-500">Analytics page coming soon...</div>}
                {currentPage === 'budgets' && <div className="text-center py-20 text-gray-500">Budgets page coming soon...</div>}
                {currentPage === 'cards' && <div className="text-center py-20 text-gray-500">Cards page coming soon...</div>}
                {currentPage === 'calendar' && <div className="text-center py-20 text-gray-500">Calendar page coming soon...</div>}
                {currentPage === 'reports' && <div className="text-center py-20 text-gray-500">Reports page coming soon...</div>}
                {currentPage === 'settings' && <div className="text-center py-20 text-gray-500">Settings page coming soon...</div>}
              </main>
            </div>
          </div>
        );
      default:
        return (
          <LandingPage
            onGetStarted={handleGetStarted}
            onLearnMore={handleLearnMore}
            onViewReviews={handleViewReviews}
          />
        );
    }
  };

  // For non-authenticated pages, show full-width layout
  const isPublicPage = ['landing', 'how-it-works', 'reviews'].includes(currentPage);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-indigo-50'
    }`}>
      {isPublicPage && (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div 
                onClick={() => setCurrentPage('landing')}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">💰</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ExpenseAI
                </span>
              </div>
              
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => setCurrentPage('how-it-works')}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-medium"
                >
                  How It Works
                </button>
                <button 
                  onClick={() => setCurrentPage('reviews')}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-medium"
                >
                  Reviews
                </button>
                <button
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  {user ? 'Dashboard' : 'Get Started'}
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
      
      <div className={isPublicPage ? 'pt-16' : ''}>
        {renderPageContent()}
      </div>

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