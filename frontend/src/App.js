import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import MentorDashboard from './pages/mentor/Dashboard';
import InternDashboard from './pages/intern/Dashboard';
import CreateIntern from './pages/mentor/CreateIntern';
import ManageInterns from './pages/mentor/ManageInterns';
import CreateTask from './pages/mentor/CreateTask';
import AssignTask from './pages/mentor/AssignTask';
import TaskList from './pages/mentor/TaskList';
import InternTasks from './pages/intern/InternTasks';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Mentor Routes */}
          <Route path="/mentor/dashboard" element={
            <PrivateRoute role="mentor">
              <MentorDashboard />
            </PrivateRoute>
          } />
          <Route path="/mentor/create-intern" element={
            <PrivateRoute role="mentor">
              <CreateIntern />
            </PrivateRoute>
          } />
          <Route path="/mentor/interns" element={
            <PrivateRoute role="mentor">
              <ManageInterns />
            </PrivateRoute>
          } />
          <Route path="/mentor/create-task" element={
            <PrivateRoute role="mentor">
              <CreateTask />
            </PrivateRoute>
          } />
          <Route path="/mentor/assign-task" element={
            <PrivateRoute role="mentor">
              <AssignTask />
            </PrivateRoute>
          } />
          <Route path="/mentor/tasks" element={
            <PrivateRoute role="mentor">
              <TaskList />
            </PrivateRoute>
          } />
          
          {/* Intern Routes */}
          <Route path="/intern/dashboard" element={
            <PrivateRoute role="intern">
              <InternDashboard />
            </PrivateRoute>
          } />
          <Route path="/intern/tasks" element={
            <PrivateRoute role="intern">
              <InternTasks />
            </PrivateRoute>
          } />
          
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;