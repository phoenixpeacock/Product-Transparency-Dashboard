import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';

// Components
import HomePage from './pages/HomePage';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import Dashboard from './components/dashboard/Dashboard';
import ProductForm from './components/forms/ProductForm';

// Main App Component
const AppContent = () => {
  const { user } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [currentView, setCurrentView] = useState<'home' | 'auth' | 'dashboard' | 'form' | 'history'>('home');

  const handleGetStarted = () => {
    if (user) {
      setCurrentView('dashboard');
    } else {
      setCurrentView('auth');
      setAuthMode('login');
    }
  };

  const handleAuthSuccess = () => {
    setCurrentView('dashboard');
  };

  const handleFormComplete = (formData: any, feedback: any) => {
    console.log('Product completed:', formData, feedback);
    setCurrentView('dashboard');
  };

  const toggleAuthMode = () => {
    setAuthMode(mode => mode === 'login' ? 'signup' : 'login');
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!user) {
      setCurrentView('auth');
      return null;
    }
    return <>{children}</>;
  };

  return (
    <div className="min-h-screen">
      {currentView === 'home' && (
        <HomePage onGetStarted={handleGetStarted} />
      )}
      
      {currentView === 'auth' && (
        <>
          {authMode === 'login' ? (
            <LoginForm 
              onSuccess={handleAuthSuccess} 
              onToggleMode={toggleAuthMode}
            />
          ) : (
            <SignupForm 
              onSuccess={handleAuthSuccess} 
              onToggleMode={toggleAuthMode}
            />
          )}
        </>
      )}

      {currentView === 'dashboard' && (
        <ProtectedRoute>
          <Dashboard
            onNewProduct={() => setCurrentView('form')}
            onViewHistory={() => setCurrentView('history')}
          />
        </ProtectedRoute>
      )}

      {currentView === 'form' && (
        <ProtectedRoute>
          <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Create New Product</h1>
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  ← Back to Dashboard
                </button>
              </div>
              <ProductForm onComplete={handleFormComplete} />
            </div>
          </div>
        </ProtectedRoute>
      )}

      {currentView === 'history' && (
        <ProtectedRoute>
          <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Product History</h1>
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  ← Back to Dashboard
                </button>
              </div>
              <div className="text-center py-12">
                <p className="text-gray-600">History view coming soon...</p>
              </div>
            </div>
          </div>
        </ProtectedRoute>
      )}

      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </div>
  );
};

// Root App with Providers
const App = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
};

export default App;