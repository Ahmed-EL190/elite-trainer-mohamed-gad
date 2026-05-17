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

export default function Services() {
  const { lang, t } = useLang();
  const [ref, visible] = useVisible();
  const ff = lang === 'ar' ? 'Cairo, sans-serif' : 'Poppins, sans-serif';
  const textColor = '#ffffff';
  const subColor = 'rgba(255,255,255,0.6)';
  const primaryColor = '#dc2626';

  return (
    <section id="services" style={{
      padding: '80px 24px',
      background: '#0a0a0a',
      direction: t.dir,
    }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Section Header - نفس تصميم About */}
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
            }}>✦ {t.services.subtitle}</span>
          </div>
          <h2 style={{ 
            fontFamily: lang === 'ar' ? 'Cairo, sans-serif' : 'Montserrat, sans-serif', 
            fontSize: 'clamp(36px, 6vw, 56px)', 
            margin: 0, 
            color: textColor, 
            letterSpacing: lang === 'ar' ? 0 : 2,
            fontWeight: 700,
          }}>
            {t.services.title}
          </h2>
          <div style={{
            width: 60,
            height: 3,
            background: `linear-gradient(90deg, ${primaryColor}, transparent)`,
            margin: '20px auto 0',
            borderRadius: 2,
          }} />
        </div>

        {/* Services Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: 28 
        }}>
          {t.services.items.map((item, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid rgba(220,38,38,0.12)`,
              borderRadius: 24,
              padding: '36px 28px',
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateY(40px)',
              transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.08}s`,
              cursor: 'default',
              position: 'relative',
              overflow: 'hidden',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = `rgba(220,38,38,0.4)`;
                e.currentTarget.style.boxShadow = `0 20px 40px rgba(220,38,38,0.12)`;
                e.currentTarget.style.background = `rgba(220,38,38,0.05)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = `rgba(220,38,38,0.12)`;
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              }}
            >
              {/* Icon with circle background */}
              <div style={{
                width: 64,
                height: 64,
                borderRadius: 20,
                background: `rgba(220,38,38,0.1)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                border: `1px solid rgba(220,38,38,0.2)`,
              }}>
                <div style={{ fontSize: 32 }}>{item.icon}</div>
              </div>
              
              <h3 style={{ 
                fontFamily: ff, 
                fontWeight: 700, 
                fontSize: 18, 
                color: textColor, 
                margin: '0 0 12px',
                letterSpacing: 0.5,
              }}>
                {item.title}
              </h3>
              
              <p style={{ 
                fontFamily: ff, 
                fontSize: 14, 
                color: subColor, 
                lineHeight: 1.65, 
                margin: 0 
              }}>
                {item.desc}
              </p>
              
              {/* Bottom bar on hover */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 3,
                background: `linear-gradient(90deg, ${primaryColor}, #991b1b)`,
                transform: 'scaleX(0)',
                transformOrigin: lang === 'ar' ? 'right' : 'left',
                transition: 'transform 0.3s ease',
              }} className="service-bar" />
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          div:hover .service-bar {
            transform: scaleX(1) !important;
          }
          
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