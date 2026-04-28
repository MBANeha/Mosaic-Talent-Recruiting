
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { EmployerSolutions } from './pages/EmployerSolutions';
import { TalentHub } from './pages/TalentHub';
import { Contact } from './pages/Contact';
import { NewsletterPopup } from './components/NewsletterPopup';
import { JobBoard } from './pages/JobBoard';
import { EmployerAuth } from './pages/EmployerAuth';
import { EmployerDashboard } from './pages/EmployerDashboard';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { AuthProvider } from './src/components/AuthProvider';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-white font-sans text-slate-900">
          <Navbar />
          <NewsletterPopup />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<JobBoard />} />
              <Route path="/employers" element={<EmployerSolutions />} />
              <Route path="/candidates" element={<TalentHub />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Employer Auth & Dashboard */}
              <Route path="/employer/login" element={<EmployerAuth />} />
              <Route path="/employer/signup" element={<EmployerAuth isSignup={true} />} />
              <Route path="/employer/dashboard/*" element={<EmployerDashboard />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
