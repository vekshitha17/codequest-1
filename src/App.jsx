import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import PythonWorld from './pages/PythonWorld';
import DSAWorld from './pages/DSAWorld';
import AdventureWorld from './pages/AdventureWorld';
import Topic from './pages/Topic';
import Game from './pages/Game';
import Quiz from './pages/Quiz';
import CodingChallenge from './pages/CodingChallenge';
import Progress from './pages/Progress';
import Profile from './pages/Profile';

// Admin Pages
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import Users from './admin/Users';
import ManageTopics from './admin/ManageTopics';
import ManageGames from './admin/ManageGames';
import ManageQuizzes from './admin/ManageQuizzes';
import ManageChallenges from './admin/ManageChallenges';
import Statistics from './admin/Statistics';

import './App.css';

export default function App() {
  return (
    <Router>
      <div className="app-layout">
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />

            {/* Realms & Topics (supports both /python and /worlds/python, /topic/:id and /topics/:id) */}
            <Route path="/python" element={<PythonWorld />} />
            <Route path="/worlds/python" element={<PythonWorld />} />
            <Route path="/dsa" element={<DSAWorld />} />
            <Route path="/worlds/dsa" element={<DSAWorld />} />
            <Route path="/adventure" element={<AdventureWorld />} />
            <Route path="/worlds/adventure" element={<AdventureWorld />} />
            <Route path="/topic/:id" element={<Topic />} />
            <Route path="/topics/:id" element={<Topic />} />

            {/* Student Protected Routes (supports both singular /game/:id and /games/:id) */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/game/:id"
              element={
                <ProtectedRoute>
                  <Game />
                </ProtectedRoute>
              }
            />
            <Route
              path="/games/:id"
              element={
                <ProtectedRoute>
                  <Game />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz/:id"
              element={
                <ProtectedRoute>
                  <Quiz />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quizzes/:id"
              element={
                <ProtectedRoute>
                  <Quiz />
                </ProtectedRoute>
              }
            />
            <Route
              path="/challenge/:id"
              element={
                <ProtectedRoute>
                  <CodingChallenge />
                </ProtectedRoute>
              }
            />
            <Route
              path="/challenges/:id"
              element={
                <ProtectedRoute>
                  <CodingChallenge />
                </ProtectedRoute>
              }
            />
            <Route
              path="/progress"
              element={
                <ProtectedRoute>
                  <Progress />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <Users />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/topics"
              element={
                <AdminRoute>
                  <ManageTopics />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/games"
              element={
                <AdminRoute>
                  <ManageGames />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/quizzes"
              element={
                <AdminRoute>
                  <ManageQuizzes />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/challenges"
              element={
                <AdminRoute>
                  <ManageChallenges />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/statistics"
              element={
                <AdminRoute>
                  <Statistics />
                </AdminRoute>
              }
            />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
