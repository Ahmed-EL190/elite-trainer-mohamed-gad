import React, { useState, useEffect } from 'react';
import { useLang } from '../context/LanguageContext.jsx';

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  const navLinks = [
  { href: '#home', label: t.nav.home, icon: '🏠' },
  { href: '#about', label: t.nav.about, icon: '👤' },
  { href: '#services', label: t.nav.services, icon: '💪' },
  { href: '#combined', label: t.nav.certifications, icon: '📜' },  // هنا التغيير
  { href: '#videos', label: t.nav.videos, icon: '🎥' },
  { href: '#contact', label: t.nav.contact, icon: '📞' },
];

  const primaryColor = '#dc2626';
  const primaryDark = '#991b1b';

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          background: scrolled
            ? 'rgba(10, 10, 10, 0.95)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          boxShadow: scrolled
            ? '0 4px 30px rgba(0, 0, 0, 0.2)'
            : 'none',
          borderBottom: scrolled
            ? `1px solid rgba(220, 38, 38, 0.15)`
            : 'none',
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 70,
            padding: '0 20px',
            direction: t.dir,
          }}
        >
          {/* Logo */}
          <a
            href="#home"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: `linear-gradient(135deg, ${primaryColor}, ${primaryDark})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 4px 15px rgba(220, 38, 38, 0.3)`,
                position: 'relative',
              }}
            >
              <span style={{ fontSize: 22 }}>💪</span>
              <span style={{
                position: 'absolute',
                bottom: -4,
                right: -4,
                fontSize: 12,
                background: '#0a0a0a',
                borderRadius: '50%',
                padding: 2,
              }}>⭐</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 18,
                  letterSpacing: 2,
                  fontWeight: 800,
                  color: '#ffffff',
                }}
              >
                <span style={{ color: primaryColor }}>ELITE</span> TRAINER
              </span>
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 9,
                  letterSpacing: 1.5,
                  color: 'rgba(255,255,255,0.5)',
                  fontWeight: 500,
                }}
              >
                MOHAMED GAD
              </span>
            </div>
          </a>

          {/* Desktop Navigation - أيقونات زي الصورة */}
          <div className="desktop-nav" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 8,
          }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '6px 16px',
                  borderRadius: 40,
                  fontFamily: lang === 'ar' ? "'Cairo', sans-serif" : "'Poppins', sans-serif",
                  fontSize: 11,
                  fontWeight: 500,
                  color: '#e0e0e0',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                  letterSpacing: lang === 'ar' ? 0 : 0.3,
                  whiteSpace: 'nowrap',
                  gap: 4,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = primaryColor;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#e0e0e0';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span style={{ fontSize: 20, marginBottom: 2 }}>{link.icon}</span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          {/* Right Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Language Switcher */}
            <div
              style={{
                display: 'flex',
                gap: 4,
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 50,
                padding: '3px',
              }}
            >
              <button
                onClick={() => setLang('en')}
                style={{
                  background: lang === 'en' ? primaryColor : 'transparent',
                  border: 'none',
                  borderRadius: 40,
                  cursor: 'pointer',
                  padding: '5px 12px',
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  color: lang === 'en' ? '#fff' : 'rgba(255,255,255,0.6)',
                  transition: 'all 0.2s ease',
                }}
              >
                EN
              </button>
              <button
                onClick={() => setLang('ar')}
                style={{
                  background: lang === 'ar' ? primaryColor : 'transparent',
                  border: 'none',
                  borderRadius: 40,
                  cursor: 'pointer',
                  padding: '5px 12px',
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: "'Cairo', sans-serif",
                  color: lang === 'ar' ? '#fff' : 'rgba(255,255,255,0.6)',
                  transition: 'all 0.2s ease',
                }}
              >
                ع
              </button>
            </div>

            {/* Hamburger Menu Button */}
            <button
              className="hamburger-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: `1px solid rgba(220,38,38,0.2)`,
                cursor: 'pointer',
                width: 40,
                height: 40,
                display: 'none',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
                borderRadius: 10,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = primaryColor;
                e.currentTarget.style.background = 'rgba(220,38,38,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(220,38,38,0.2)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              }}
            >
              <span style={{
                display: 'block',
                width: 18,
                height: 2,
                background: '#e0e0e0',
                borderRadius: 2,
                transition: 'all 0.3s ease',
              }} />
              <span style={{
                display: 'block',
                width: 18,
                height: 2,
                background: '#e0e0e0',
                borderRadius: 2,
                transition: 'all 0.3s ease',
              }} />
              <span style={{
                display: 'block',
                width: 18,
                height: 2,
                background: '#e0e0e0',
                borderRadius: 2,
                transition: 'all 0.3s ease',
              }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            background: '#0a0a0a',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid rgba(220,38,38,0.2)`,
              borderRadius: 10,
              width: 40,
              height: 40,
              cursor: 'pointer',
              fontSize: 20,
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = primaryColor;
              e.currentTarget.style.background = 'rgba(220,38,38,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(220,38,38,0.2)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            }}
          >
            ✕
          </button>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            width: '100%',
            padding: '2rem',
            direction: t.dir,
          }}>
            {/* Logo in mobile menu */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              marginBottom: 20,
              paddingBottom: 20,
              borderBottom: `1px solid rgba(220,38,38,0.2)`,
            }}>
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 16,
                  background: `linear-gradient(135deg, ${primaryColor}, ${primaryDark})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <span style={{ fontSize: 30 }}>💪</span>
                <span style={{
                  position: 'absolute',
                  bottom: -4,
                  right: -4,
                  fontSize: 14,
                  background: '#0a0a0a',
                  borderRadius: '50%',
                  padding: 2,
                }}>⭐</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 20,
                  letterSpacing: 2,
                  fontWeight: 800,
                  color: '#ffffff',
                }}>
                  <span style={{ color: primaryColor }}>ELITE</span> TRAINER
                </span>
                <div style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 10,
                  color: 'rgba(255,255,255,0.5)',
                }}>MOHAMED GAD</div>
              </div>
            </div>

            {navLinks.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 12,
                  padding: '12px 28px',
                  borderRadius: 50,
                  fontFamily: lang === 'ar' ? "'Cairo', sans-serif" : "'Poppins', sans-serif",
                  fontSize: 16,
                  fontWeight: 500,
                  color: '#e0e0e0',
                  textDecoration: 'none',
                  width: '80%',
                  maxWidth: 250,
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid rgba(220, 38, 38, 0.1)`,
                  animation: `fadeInUp 0.3s ease ${idx * 0.05}s forwards`,
                  opacity: 0,
                  transform: 'translateY(20px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(220,38,38,0.15)';
                  e.currentTarget.style.borderColor = primaryColor;
                  e.currentTarget.style.color = primaryColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(220, 38, 38, 0.1)';
                  e.currentTarget.style.color = '#e0e0e0';
                }}
              >
                <span style={{ fontSize: 22 }}>{link.icon}</span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      <style>
        {`
          @media (min-width: 769px) {
            .desktop-nav {
              display: flex !important;
            }
            .hamburger-btn {
              display: none !important;
            }
          }
          
          @media (max-width: 850px) {
            .desktop-nav {
              display: none !important;
            }
            .hamburger-btn {
              display: flex !important;
            }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </>
  );
}