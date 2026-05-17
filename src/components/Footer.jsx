import React from 'react';
import { useLang } from '../context/LanguageContext.jsx';

export default function Footer() {
  const { lang, t } = useLang();
  const ff = lang === 'ar' ? 'Cairo, sans-serif' : 'Poppins, sans-serif';
  const primaryColor = '#dc2626';

  return (
    <footer style={{
      background: '#0a0a0a',
      padding: '48px 24px 32px',
      textAlign: 'center',
      direction: t.dir,
      borderTop: `1px solid rgba(220,38,38,0.15)`,
    }}>
      {/* Logo Section */}
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        marginBottom: 24,
      }}>
        {/* <div style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: `linear-gradient(135deg, ${primaryColor}, #991b1b)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 4px 15px rgba(220,38,38,0.3)`,
          marginBottom: 8,
        }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: '#fff', fontFamily: 'Montserrat, sans-serif' }}>
            MG
          </span>
        </div> */}
        <div style={{ 
          fontFamily: 'Montserrat, sans-serif', 
          fontSize: 20, 
          letterSpacing: 3, 
          background: `linear-gradient(135deg, #ffffff, ${primaryColor})`, 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent', 
          backgroundClip: 'text', 
          fontWeight: 700,
        }}>
         Mohamed Gad | Personal Trainer
        </div>
        <div style={{
          width: 40,
          height: 2,
          background: `linear-gradient(90deg, ${primaryColor}, transparent)`,
          marginTop: 4,
        }} />
      </div>

      {/* Copyright */}
      <div style={{ 
        fontFamily: ff, 
        fontSize: 13, 
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: 0.5,
      }}>
        © {new Date().getFullYear()} Mohamed Gad. {t.footer.rights}
      </div>
    </footer>
  );
}