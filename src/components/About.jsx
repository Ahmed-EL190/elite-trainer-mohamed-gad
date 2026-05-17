import React, { useEffect, useRef, useState } from 'react';
import { useLang } from '../context/LanguageContext.jsx';

function useVisible(threshold = 0.15) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export default function About() {
  const { lang, t } = useLang();
  const [ref, visible] = useVisible();

  const ff = lang === 'ar' ? 'Cairo, sans-serif' : 'Poppins, sans-serif';
  const textColor = '#ffffff';
  const subColor = 'rgba(255,255,255,0.6)';
  const cardBg = 'rgba(255,255,255,0.03)';
  const primaryColor = '#dc2626';

  return (
    <section id="about" style={{
      padding: '80px 24px',
      background: '#0a0a0a',
      direction: t.dir,
    }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: 60, 
          opacity: visible ? 1 : 0, 
          transform: visible ? 'none' : 'translateY(30px)', 
          transition: 'all 0.7s ease-out'
        }}>
          <div style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(220,38,38,0.1)',
            border: `1px solid rgba(220,38,38,0.3)`,
            borderRadius: 40,
            padding: '6px 16px 6px 12px',
            marginBottom: 20,
          }}>
            <span style={{
              display: 'inline-block',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: primaryColor,
              animation: 'pulse 1.5s ease-in-out infinite',
            }} />
            <span style={{
              fontSize: 12,
              fontWeight: 600,
              color: primaryColor,
              letterSpacing: 1,
            }}>✦ {t.about.subtitle}</span>
          </div>
          <h2 style={{ 
            fontFamily: lang === 'ar' ? 'Cairo, sans-serif' : 'Montserrat, sans-serif', 
            fontSize: 'clamp(36px, 6vw, 56px)', 
            margin: 0, 
            color: textColor, 
            letterSpacing: lang === 'ar' ? 0 : 2,
            fontWeight: 700,
          }}>
            {t.about.title}
          </h2>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: 48, 
          alignItems: 'center' 
        }}>
          {/* Left: Text */}
          <div style={{ 
            opacity: visible ? 1 : 0, 
            transform: visible ? 'none' : 'translateX(-30px)', 
            transition: 'all 0.6s ease-out 0.1s'
          }}>
            <p style={{ 
              fontFamily: ff, 
              fontSize: 'clamp(15px, 4vw, 17px)', 
              lineHeight: 1.7, 
              color: subColor, 
              marginBottom: 28 
            }}>
              {t.about.description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {t.contact.skills.map((s, i) => (
                <span key={i} style={{
                  background: `rgba(220,38,38,0.1)`,
                  border: `1px solid rgba(220,38,38,0.25)`,
                  borderRadius: 30,
                  padding: '8px 18px',
                  fontFamily: ff,
                  fontSize: 13,
                  color: primaryColor,
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.target.style.background = `rgba(220,38,38,0.2)`;
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.target.style.background = `rgba(220,38,38,0.1)`;
                  e.target.style.transform = 'translateY(0)';
                }}>
                  ✓ {s}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Stats */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: 20, 
            opacity: visible ? 1 : 0, 
            transform: visible ? 'none' : 'translateX(30px)', 
            transition: 'all 0.6s ease-out 0.2s'
          }}>
            {t.about.stats.map((stat, i) => (
              <div key={i} style={{
                background: cardBg,
                border: `1px solid rgba(220,38,38,0.15)`,
                borderRadius: 20,
                padding: '32px 20px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
                onMouseEnter={e => { 
                  e.currentTarget.style.transform = 'translateY(-8px)'; 
                  e.currentTarget.style.borderColor = `rgba(220,38,38,0.4)`;
                  e.currentTarget.style.boxShadow = `0 20px 40px rgba(220,38,38,0.1)`; 
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.transform = 'translateY(0)'; 
                  e.currentTarget.style.borderColor = `rgba(220,38,38,0.15)`;
                  e.currentTarget.style.boxShadow = 'none'; 
                }}
              >
                <div style={{ 
                  fontFamily: 'Montserrat, sans-serif', 
                  fontSize: 'clamp(36px, 5vw, 48px)', 
                  fontWeight: 800,
                  color: primaryColor, 
                  lineHeight: 1,
                  marginBottom: 8,
                }}>{stat.value}</div>
                <div style={{ 
                  fontFamily: ff, 
                  fontSize: 12, 
                  color: subColor, 
                  fontWeight: 500,
                  letterSpacing: 1,
                }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.6;
              transform: scale(1.1);
            }
          }
        `}
      </style>
    </section>
  );
}