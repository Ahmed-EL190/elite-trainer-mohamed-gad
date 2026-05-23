import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import CertificationsExperience from './components/CertificationsExperience';

import Videos from './components/Videos';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

function AppContent() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
    }}>
      <Navbar />
      <Hero />
      <About />
      <CertificationsExperience />
      <Services />
      <Videos />
      <Contact />
      <Footer />
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}