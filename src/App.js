// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LogInPage';
import LogInPageAdmin from './pages/LogInPageAdmin';
import AdminPage from './pages/AdminPage';
import ProfilesAdmin from './pages/ProfilesAdmin';
import AboutPage from './pages/AboutUsPage';
import HowItWorksPage from './pages/HowItWorksPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import WorkWithUsPage from "./pages/WorkWithUsPage";
import ProfilePage from './pages/ProfilePage';
import PendingPage from './pages/PendingPage';
import FreelanceDashboardPage from './pages/FreelanceDashboardPage';
import FreelanceProfilePage from './pages/FreelanceProfilePage';
import FreelanceBookingsPage from './pages/FreelanceBookingsPage';
import FreelanceBookingsHistory from './pages/FreelanceBookingsHistory';
import FreelanceNotifications from './pages/FreelanceNotifications';

// Import other admin pages as you create them
import AdminVerification from './pages/AdminVerification';
import AdminLogs from './pages/AdminLogs';
import AdminNotification from './pages/AdminNotification';
import AdminSettings from './pages/AdminSettings';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-login" element={<LogInPageAdmin />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/work-with-us" element={<WorkWithUsPage />} />
        <Route path="/profile" element={<ProfilePage />}/>
        <Route path="/pending-approval" element={<PendingPage />} />
        
        {/* Freelance Routes */}
        <Route path="/freelance-dashboard" element={<FreelanceDashboardPage />} />
        <Route path="/freelance/profile" element={<FreelanceProfilePage />} />
        <Route path="/freelance/bookings" element={<FreelanceBookingsPage />} />
        <Route path="/freelance/history" element={<FreelanceBookingsHistory />} />
        <Route path="/freelance/notifications" element={<FreelanceNotifications />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/profiles" element={<ProfilesAdmin />} />
        <Route path="/admin/verification" element={<AdminVerification />} />
        <Route path="/admin/logs" element={<AdminLogs />} />
        <Route path="/admin/notifications" element={<AdminNotification />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Routes>
    </Router>
  );
};

export default App;