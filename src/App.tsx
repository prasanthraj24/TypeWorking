import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import UploaderDashboard from './pages/UploaderDashboard';
import TypingTask from './pages/TypingTask';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import RoleRoute from './components/RoleRoute';

// Hooks
import { useAuth } from './hooks/useAuth';

function App() {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/profile" element={<Profile />} />
          <Route path="/typing-task/:id" element={<TypingTask />} />
          
          {/* Role-based routes */}
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? (
                user?.role === 'admin' ? (
                  <Navigate to="/admin" replace />
                ) : user?.role === 'uploader' ? (
                  <Navigate to="/uploader" replace />
                ) : (
                  <UserDashboard />
                )
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          
          <Route 
            path="/admin" 
            element={
              <RoleRoute role="admin">
                <AdminDashboard />
              </RoleRoute>
            } 
          />
          
          <Route 
            path="/uploader" 
            element={
              <RoleRoute role="uploader">
                <UploaderDashboard />
              </RoleRoute>
            } 
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;