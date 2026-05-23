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
    src: '/video1.mp4',
    titleEn: 'Introduction Video',
    titleAr: 'فيديو تعريفي',
  },
  {
    src: '/video2.mp4',
    titleEn: 'Workout Compilation',
    titleAr: 'مجموعة تمارين متنوعة',
  },
];

export default function Videos() {
  const { lang, t } = useLang();
  const [sectionRef, visible] = useVisible();
  const [playingVideo, setPlayingVideo] = useState(null);
  const videoRefs = useRef({});
  const sectionRefForObserver = useRef(null);
  
  const ff = lang === 'ar' ? 'Cairo, sans-serif' : 'Poppins, sans-serif';
  const textColor = '#ffffff';
  const primaryColor = '#dc2626';

  // مراقبة إذا كان السيكشن visible أم لا
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          Object.values(videoRefs.current).forEach(video => {
            if (video && !video.paused) {
              video.pause();
            }
          });
          setPlayingVideo(null);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRefForObserver.current) {
      observer.observe(sectionRefForObserver.current);
    }

    return () => {
      if (sectionRefForObserver.current) {
        observer.unobserve(sectionRefForObserver.current);
      }
    };
  }, []);

  const handlePlay = (index) => {
    if (playingVideo !== null && playingVideo !== index) {
      const otherVideo = videoRefs.current[playingVideo];
      if (otherVideo) {
        otherVideo.pause();
      }
    }
    setPlayingVideo(index);
  };

  const handlePause = () => {
    setPlayingVideo(null);
  };

  return (
    <section 
      ref={sectionRefForObserver}
      id="videos" 
      style={{
        padding: '80px 24px',
        background: '#0a0a0a',
        direction: t.dir,
      }}
    >
      <div ref={sectionRef} style={{ maxWidth: 900, margin: '0 auto' }}>
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
            }}>✦ {t.videos.subtitle || 'See Me In Action'}</span>
          </div>
          
          <h2 style={{ 
  fontFamily: lang === 'ar' ? 'Cairo, sans-serif' : 'Montserrat, sans-serif', 
  fontSize: 'clamp(32px, 5vw, 48px)', 
  margin: 0, 
  color: textColor, 
  letterSpacing: lang === 'ar' ? 0 : 1,
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

        {/* Videos - عمود واحد تحت بعض */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: 48 
        }}>
          {VIDEOS.map((v, i) => (
            <div 
              key={i} 
              style={{
                borderRadius: 20,
                overflow: 'hidden',
                border: `1px solid rgba(220,38,38,0.12)`,
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(40px)',
                transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.2}s`,
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                background: 'rgba(255,255,255,0.03)',
              }}
              onMouseEnter={e => { 
                e.currentTarget.style.transform = 'translateY(-8px)'; 
                e.currentTarget.style.boxShadow = `0 20px 40px rgba(220,38,38,0.35)`; 
                e.currentTarget.style.borderColor = `rgba(220,38,38,0.8)`;
                const videoContainer = e.currentTarget.querySelector('.video-container');
                if (videoContainer) {
                  videoContainer.style.filter = 'brightness(1.2) drop-shadow(0 0 15px rgba(220,38,38,0.6))';
                  videoContainer.style.transition = 'all 0.3s ease';
                }
              }}
              onMouseLeave={e => { 
                e.currentTarget.style.transform = 'none'; 
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)'; 
                e.currentTarget.style.borderColor = `rgba(220,38,38,0.12)`;
                const videoContainer = e.currentTarget.querySelector('.video-container');
                if (videoContainer) {
                  videoContainer.style.filter = 'brightness(1)';
                }
              }}
            >
              {/* Video Player */}
              <div className="video-container" style={{ 
                position: 'relative', 
                background: '#000',
                transition: 'all 0.3s ease',
              }}>
                <video
                  ref={el => videoRefs.current[i] = el}
                  controls
                  width="100%"
                  height="auto"
                  onPlay={() => handlePlay(i)}
                  onPause={handlePause}
                  onEnded={handlePause}
                  style={{ 
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                    maxHeight: '500px',
                    objectFit: 'contain',
                    background: '#000'
                  }}
                  controlsList="nodownload"
                  preload="metadata"
                >
                  <source src={v.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              
              {/* Video Info */}
              <div style={{
                padding: '20px 24px',
                background: 'rgba(255,255,255,0.02)',
              }}>
                <div style={{ 
                  fontFamily: ff, 
                  fontSize: 18, 
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
                  }}>
                    {i === 0 ? '🎬' : '💪'}
                  </div>
                  <div style={{ 
                    fontFamily: ff, 
                    fontSize: 13, 
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
          
          /* تنسيق عناصر التحكم في الفيديو */
          video::-webkit-media-controls {
            background-color: rgba(0,0,0,0.8);
          }
          
          video::-webkit-media-controls-play-button {
            background-color: #dc2626;
            border-radius: 50%;
          }
          
          video::-webkit-media-controls-play-button:hover {
            background-color: #ef4444;
            transform: scale(1.1);
          }
          
          /* تحسين ظهور الفيديو */
          .video-container {
            background: #000;
            position: relative;
          }
          
          /* إضافة توهج خفيف حول الفيديو */
          .video-container::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            box-shadow: inset 0 0 50px rgba(220,38,38,0.1);
            border-radius: 20px;
          }
        `}
      </style>
    </section>
  );
}