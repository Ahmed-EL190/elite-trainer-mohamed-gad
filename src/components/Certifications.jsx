import React, { useEffect, useRef, useState } from 'react';
import { useLang } from '../context/LanguageContext.jsx';

function useVisible() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

export default function Certifications() {
  const { lang, t } = useLang();
  const [ref, visible] = useVisible();
  const ff = lang === 'ar' ? 'Cairo, sans-serif' : 'Poppins, sans-serif';
  const textColor = '#ffffff';
  const subColor = 'rgba(255,255,255,0.6)';
  const primaryColor = '#dc2626';

  return (
    <section id="certifications" style={{
      padding: '80px 24px',
      background: '#0a0a0a',
      direction: t.dir,
    }}>
      <div ref={ref} style={{ maxWidth: 1000, margin: '0 auto' }}>
        {/* Section Header - نفس تصميم باقي السكشنات */}
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
            }}>✦ {t.certifications.subtitle}</span>
          </div>
          <h2 style={{ 
            fontFamily: lang === 'ar' ? 'Cairo, sans-serif' : 'Montserrat, sans-serif', 
            fontSize: 'clamp(36px, 6vw, 56px)', 
            margin: 0, 
            color: textColor, 
            letterSpacing: lang === 'ar' ? 0 : 2,
            fontWeight: 700,
          }}>
            {t.certifications.title}
          </h2>
          <div style={{
            width: 60,
            height: 3,
            background: `linear-gradient(90deg, ${primaryColor}, transparent)`,
            margin: '20px auto 0',
            borderRadius: 2,
          }} />
        </div>

        {/* Certifications List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {t.certifications.items.map((cert, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid rgba(220,38,38,0.12)`,
              borderRadius: 20,
              padding: '24px 28px',
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateX(-30px)',
              transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.08}s`,
              cursor: 'default',
              flexWrap: 'wrap',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `rgba(220,38,38,0.4)`;
                e.currentTarget.style.boxShadow = `0 8px 30px rgba(220,38,38,0.12)`;
                e.currentTarget.style.transform = 'translateX(6px)';
                e.currentTarget.style.background = 'rgba(220,38,38,0.04)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = `rgba(220,38,38,0.12)`;
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              }}
            >
              {/* Icon Container */}
              <div style={{
                width: 60,
                height: 60,
                borderRadius: 18,
                background: `linear-gradient(135deg, rgba(220,38,38,0.15), rgba(150,30,30,0.08))`,
                border: `1px solid rgba(220,38,38,0.2)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                flexShrink: 0,
              }}>
                {cert.icon}
              </div>
              
              {/* Text Content */}
              <div style={{ flex: 1, minWidth: 180 }}>
                <div style={{ 
                  fontFamily: ff, 
                  fontWeight: 700, 
                  fontSize: 16, 
                  color: textColor, 
                  marginBottom: 6,
                  letterSpacing: 0.3,
                }}>
                  {cert.name}
                </div>
                <div style={{ 
                  fontFamily: ff, 
                  fontSize: 13, 
                  color: primaryColor, 
                  fontWeight: 600,
                  letterSpacing: 0.5,
                }}>
                  {cert.org}
                </div>
              </div>
              
              {/* Date Badge */}
              <div style={{
                fontFamily: ff,
                fontSize: 12,
                color: primaryColor,
                fontWeight: 600,
                background: `rgba(220,38,38,0.1)`,
                border: `1px solid rgba(220,38,38,0.2)`,
                borderRadius: 30,
                padding: '6px 16px',
                flexShrink: 0,
                whiteSpace: 'nowrap',
                letterSpacing: 0.5,
              }}>
                {cert.date}
              </div>
            </div>
          ))}
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