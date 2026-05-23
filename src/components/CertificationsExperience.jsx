import React, { useEffect, useRef, useState } from 'react';
import { useLang } from '../context/LanguageContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

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

export default function CombinedSection() {
  const { lang, t } = useLang();
  const { dark } = useTheme();
  const [ref, visible] = useVisible();
  const [openCert, setOpenCert] = useState(false);
  const [openExp, setOpenExp] = useState(false);
  const ff = lang === 'ar' ? 'Cairo, sans-serif' : 'Poppins, sans-serif';
  const primaryColor = '#dc2626';

  return (
    <section section id="combined" style={{
  padding: '60px 20px',
  background: '#0a0a0a',
  direction: t.dir,
    }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: 50,
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(20px)',
          transition: 'all 0.6s ease-out'
        }}>
          <div style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(220,38,38,0.1)',
            border: `1px solid rgba(220,38,38,0.3)`,
            borderRadius: 40,
            padding: '6px 16px',
            marginBottom: 20,
          }}>
            <span style={{
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
            }}>✦ {t.combined?.badge || (lang === 'ar' ? 'إنجازاتي' : 'My Journey')}</span>
          </div>
          <h2 style={{ 
            fontFamily: lang === 'ar' ? 'Cairo, sans-serif' : 'Montserrat, sans-serif', 
            fontSize: 'clamp(28px, 7vw, 42px)', 
            margin: 0, 
            color: '#ffffff',
            fontWeight: 700,
          }}>
            {t.combined?.title || (lang === 'ar' ? 'الشهادات والخبرات' : 'Certifications & Experience')}
          </h2>
          <div style={{
            width: 60,
            height: 3,
            background: `linear-gradient(90deg, ${primaryColor}, transparent)`,
            margin: '16px auto 0',
            borderRadius: 2,
          }} />
        </div>

        {/* Two Columns */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 30,
        }}>
          
          {/* Certifications Column */}
          <div style={{ 
            flex: 1,
            background: 'rgba(255,255,255,0.02)',
            borderRadius: 24,
            padding: '24px 20px',
            border: '1px solid rgba(220,38,38,0.1)',
          }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{
                width: 50,
                height: 50,
                background: `linear-gradient(135deg, rgba(220,38,38,0.2), rgba(150,30,30,0.1))`,
                borderRadius: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                margin: '0 auto 12px',
              }}>
                📜
              </div>
              <h3 style={{ 
                fontFamily: lang === 'ar' ? 'Cairo, sans-serif' : 'Montserrat, sans-serif', 
                fontSize: 22,
                margin: 0, 
                color: '#ffffff',
                fontWeight: 600,
              }}>
                {t.certifications?.title || 'Certifications'}
              </h3>
              <p style={{
                fontSize: 13,
                color: 'rgba(255,255,255,0.5)',
                marginTop: 6,
              }}>
                {t.certifications?.subtitle || 'Qualifications & Education'}
              </p>
            </div>

            <button
              onClick={() => setOpenCert(!openCert)}
              style={{
                width: '100%',
                padding: '12px',
                background: `linear-gradient(135deg, ${primaryColor}, #991b1b)`,
                border: 'none',
                borderRadius: 12,
                color: 'white',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                transition: 'all 0.3s',
                marginBottom: openCert ? 20 : 0,
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              {openCert ? `▲ ${t.combined?.hideCertifications || (lang === 'ar' ? 'إخفاء الشهادات' : 'Hide Certifications')}` : `▼ ${t.combined?.showCertifications || (lang === 'ar' ? 'عرض الشهادات' : 'Show Certifications')}`}
              <span>{openCert ? '✕' : '📜'}</span>
            </button>

            <div style={{
              maxHeight: openCert ? 600 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.4s ease-out',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
                {t.certifications?.items?.map((cert, i) => (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: 16,
                    padding: '14px',
                    border: '1px solid rgba(220,38,38,0.1)',
                    transition: 'all 0.3s',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                      <div style={{
                        width: 40,
                        height: 40,
                        background: `linear-gradient(135deg, rgba(220,38,38,0.2), rgba(150,30,30,0.1))`,
                        borderRadius: 12,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                      }}>
                        {cert.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ 
                          fontWeight: 700, 
                          fontSize: 14, 
                          color: '#ffffff',
                          marginBottom: 4,
                        }}>
                          {cert.name}
                        </div>
                        <div style={{ 
                          fontSize: 11, 
                          color: primaryColor, 
                          fontWeight: 600,
                        }}>
                          {cert.org}
                        </div>
                      </div>
                      <div style={{
                        fontSize: 10,
                        color: primaryColor,
                        background: `rgba(220,38,38,0.1)`,
                        borderRadius: 20,
                        padding: '4px 10px',
                        whiteSpace: 'nowrap',
                      }}>
                        {cert.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Experience Column */}
          <div style={{ 
            flex: 1,
            background: 'rgba(255,255,255,0.02)',
            borderRadius: 24,
            padding: '24px 20px',
            border: '1px solid rgba(220,38,38,0.1)',
          }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{
                width: 50,
                height: 50,
                background: `linear-gradient(135deg, rgba(220,38,38,0.2), rgba(150,30,30,0.1))`,
                borderRadius: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                margin: '0 auto 12px',
              }}>
                💼
              </div>
              <h3 style={{ 
                fontFamily: lang === 'ar' ? 'Cairo, sans-serif' : 'Montserrat, sans-serif', 
                fontSize: 22,
                margin: 0, 
                color: '#ffffff',
                fontWeight: 600,
              }}>
                {t.experience?.title || 'Experience'}
              </h3>
              <p style={{
                fontSize: 13,
                color: 'rgba(255,255,255,0.5)',
                marginTop: 6,
              }}>
                {t.experience?.subtitle || 'My Professional Journey'}
              </p>
            </div>

            <button
              onClick={() => setOpenExp(!openExp)}
              style={{
                width: '100%',
                padding: '12px',
                background: `linear-gradient(135deg, ${primaryColor}, #991b1b)`,
                border: 'none',
                borderRadius: 12,
                color: 'white',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                transition: 'all 0.3s',
                marginBottom: openExp ? 20 : 0,
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              {openExp ? `▲ ${t.combined?.hideExperience || (lang === 'ar' ? 'إخفاء الخبرات' : 'Hide Experience')}` : `▼ ${t.combined?.showExperience || (lang === 'ar' ? 'عرض الخبرات' : 'Show Experience')}`}
              <span>{openExp ? '✕' : '💼'}</span>
            </button>

            <div style={{
              maxHeight: openExp ? 800 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.4s ease-out',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
                {t.experience?.items?.map((item, i) => (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: 16,
                    padding: '16px',
                    border: '1px solid rgba(220,38,38,0.1)',
                    position: 'relative',
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 16,
                      right: t.dir === 'rtl' ? 'auto' : 16,
                      left: t.dir === 'rtl' ? 16 : 'auto',
                      fontSize: 10,
                      color: primaryColor,
                      background: `rgba(220,38,38,0.1)`,
                      borderRadius: 20,
                      padding: '3px 10px',
                    }}>
                      {item.period}
                    </div>
                    <div style={{ 
                      fontWeight: 700, 
                      fontSize: 16, 
                      color: '#ffffff',
                      marginBottom: 6,
                      paddingRight: t.dir === 'rtl' ? 0 : 80,
                      paddingLeft: t.dir === 'rtl' ? 80 : 0,
                    }}>
                      {item.role}
                    </div>
                    <div style={{ 
                      fontSize: 13, 
                      color: primaryColor, 
                      fontWeight: 600,
                      marginBottom: 10,
                    }}>
                      {item.place}
                    </div>
                    <p style={{ 
                      fontSize: 13, 
                      color: 'rgba(255,255,255,0.6)', 
                      lineHeight: 1.5,
                      margin: 0,
                    }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
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