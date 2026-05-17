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

const VIDEOS = [
  {
    id: 'dQw4w9WgXcQ',
    titleEn: 'Squat Technique Masterclass',
    titleAr: 'درس احترافي في تقنية القرفصاء',
  },
  {
    id: 'L_jWHffIx5E',
    titleEn: 'Full Body Workout Session',
    titleAr: 'جلسة تمرين كامل للجسم',
  },
  {
    id: 'aTgRSRgMCng',
    titleEn: 'Deadlift Form Guide',
    titleAr: 'دليل أداء رفعة الميت',
  },
];

export default function Videos() {
  const { lang, t } = useLang();
  const [ref, visible] = useVisible();
  const ff = lang === 'ar' ? 'Cairo, sans-serif' : 'Poppins, sans-serif';
  const textColor = '#ffffff';
  const primaryColor = '#dc2626';

  return (
    <section id="videos" style={{
      padding: '80px 24px',
      background: '#0a0a0a',
      direction: t.dir,
    }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto' }}>
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
            }}>✦ {t.videos.subtitle}</span>
          </div>
          <h2 style={{ 
            fontFamily: lang === 'ar' ? 'Cairo, sans-serif' : 'Montserrat, sans-serif', 
            fontSize: 'clamp(36px, 6vw, 56px)', 
            margin: 0, 
            color: textColor, 
            letterSpacing: lang === 'ar' ? 0 : 2,
            fontWeight: 700,
          }}>
            {t.videos.title}
          </h2>
          <div style={{
            width: 60,
            height: 3,
            background: `linear-gradient(90deg, ${primaryColor}, transparent)`,
            margin: '20px auto 0',
            borderRadius: 2,
          }} />
        </div>

        {/* Videos Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: 32 
        }}>
          {VIDEOS.map((v, i) => (
            <div key={i} style={{
              borderRadius: 20,
              overflow: 'hidden',
              border: `1px solid rgba(220,38,38,0.12)`,
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateY(40px)',
              transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.1}s`,
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              background: 'rgba(255,255,255,0.03)',
            }}
              onMouseEnter={e => { 
                e.currentTarget.style.transform = 'translateY(-8px)'; 
                e.currentTarget.style.boxShadow = `0 20px 40px rgba(220,38,38,0.15)`; 
                e.currentTarget.style.borderColor = `rgba(220,38,38,0.4)`; 
              }}
              onMouseLeave={e => { 
                e.currentTarget.style.transform = 'none'; 
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)'; 
                e.currentTarget.style.borderColor = `rgba(220,38,38,0.12)`; 
              }}
            >
              {/* Video Thumbnail / Iframe */}
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, background: '#1a1a1a' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${v.id}`}
                  title={lang === 'ar' ? v.titleAr : v.titleEn}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                />
              </div>
              
              {/* Video Info */}
              <div style={{
                padding: '20px 24px',
                background: 'rgba(255,255,255,0.02)',
              }}>
                <div style={{ 
                  fontFamily: ff, 
                  fontSize: 15, 
                  fontWeight: 700, 
                  color: textColor,
                  marginBottom: 8,
                  lineHeight: 1.4,
                }}>
                  {lang === 'ar' ? v.titleAr : v.titleEn}
                </div>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}>
                  <div style={{ 
                    width: 24, 
                    height: 24, 
                    borderRadius: '50%', 
                    background: primaryColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                  }}>🏋️</div>
                  <div style={{ 
                    fontFamily: ff, 
                    fontSize: 12, 
                    color: primaryColor, 
                    fontWeight: 600,
                    letterSpacing: 0.5,
                  }}>
                    Mohamed Gad | NASM-CPT
                  </div>
                </div>
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