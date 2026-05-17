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

export default function Experience() {
  const { lang, t } = useLang();
  const { dark } = useTheme();
  const [ref, visible] = useVisible();
  const ff = lang === 'ar' ? 'Cairo, sans-serif' : 'Poppins, sans-serif';
  const textColor = '#e0e0e0';
  const subColor = 'rgba(255,255,255,0.55)';
  const primaryColor = '#dc2626';
  const primaryDark = '#991b1b';
  const isRtl = t.dir === 'rtl';

  return (
    <section id="experience" style={{
      padding: '100px 2rem',
      background: '#0a0a0a',
      direction: t.dir,
    }}>
      <div ref={ref} style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)', transition: 'all 0.7s' }}>
          <div style={{ color: primaryColor, fontFamily: ff, fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 12 }}>
            ✦ {t.experience.subtitle}
          </div>
          <h2 style={{ fontFamily: lang === 'ar' ? 'Cairo, sans-serif' : 'Montserrat, sans-serif', fontSize: 'clamp(36px,6vw,68px)', margin: 0, color: textColor, letterSpacing: lang === 'ar' ? 0 : 3 }}>
            {t.experience.title}
          </h2>
        </div>

        <div style={{ position: 'relative' }}>
          {/* Center line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: 2,
            transform: 'translateX(-50%)',
            background: `linear-gradient(to bottom, ${primaryColor}, rgba(150,30,30,0.2))`,
          }} />

          {t.experience.items.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={i} style={{
                display: 'flex',
                justifyContent: isLeft ? 'flex-start' : 'flex-end',
                marginBottom: 40,
                paddingLeft: isLeft ? 0 : '50%',
                paddingRight: isLeft ? '50%' : 0,
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : `translateX(${isLeft ? -40 : 40}px)`,
                transition: `all 0.7s ${i * 0.12}s`,
              }}>
                <div style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid rgba(220,38,38,0.18)`,
                  borderRadius: 20,
                  padding: '24px 28px',
                  maxWidth: 380,
                  width: '90%',
                  position: 'relative',
                  margin: isLeft ? (isRtl ? '0 0 0 32px' : '0 32px 0 0') : (isRtl ? '0 32px 0 0' : '0 0 0 32px'),
                  transition: 'box-shadow 0.3s, transform 0.3s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 12px 40px rgba(220,38,38,0.12)`; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
                >
                  {/* Dot */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    [isLeft ? (isRtl ? 'left' : 'right') : (isRtl ? 'right' : 'left')]: -40,
                    transform: 'translateY(-50%)',
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${primaryColor}, ${primaryDark})`,
                    boxShadow: `0 0 16px ${primaryColor}`,
                  }} />
                  <div style={{ color: primaryColor, fontFamily: ff, fontSize: 12, fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>{item.period}</div>
                  <div style={{ fontFamily: ff, fontWeight: 700, fontSize: 16, color: textColor, marginBottom: 4 }}>{item.role}</div>
                  <div style={{ fontFamily: ff, fontSize: 13, color: primaryColor, marginBottom: 10, fontWeight: 600 }}>{item.place}</div>
                  <p style={{ fontFamily: ff, fontSize: 13, color: subColor, lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 600px) {
          .timeline-center { display: none; }
        }
      `}</style>
    </section>
  );
}