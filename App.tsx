import React, { useState } from 'react';
import { NavBar } from './components/NavBar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { WorkExperience } from './components/Experience';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Slideshow } from './components/Slideshow';
import { Miscellany } from './components/Miscellany';
import { Footer } from './components/Footer';
import { PortfolioProvider } from './context/PortfolioContext';
import { Dashboard } from './components/Dashboard';
import { AdminLogin } from './components/AdminLogin';
import { ContactModal } from './components/ContactModal';

function AppContent() {
  const [showLogin, setShowLogin] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showContact, setShowContact] = useState(false);

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 relative transition-colors duration-300">
      
      {showLogin && (
        <AdminLogin 
          onLogin={() => {
            setShowLogin(false);
            setShowDashboard(true);
          }}
          onCancel={() => setShowLogin(false)}
        />
      )}

      {showDashboard && (
        <Dashboard 
          onClose={() => setShowDashboard(false)}
          onLogout={() => setShowDashboard(false)}
        />
      )}

      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />

      <NavBar />
      <Hero />
      <div className="relative z-10 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
        <About />
        <WorkExperience />
        <Skills />
        <Projects />
        <Slideshow />
        <Miscellany />
        <Footer 
          onAdminClick={() => setShowLogin(true)} 
          onContactClick={() => setShowContact(true)}
        />
      </div>
    </main>
  );
}

function App() {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
}

export default App;