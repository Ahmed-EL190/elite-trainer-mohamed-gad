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
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ff = lang === 'ar' ? 'Cairo, sans-serif' : 'Poppins, sans-serif';
  const textColor = '#ffffff';
  const subColor = 'rgba(255,255,255,0.6)';
  const primaryColor = '#dc2626';

  // رقم واتساب المدرب
  const TRAINER_WHATSAPP = '966567807532';

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
    setFormData({ name: '', phone: '', message: '' });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // تكوين الرسالة بشكل أنظف للواتساب
    const message = `🆕 *طلب اشتراك جديد* 🆕

━━━━━━━━━━━━━━━━━━━━
🏋️ *الخدمة المطلوبة:* 
   ${selectedService.title}
━━━━━━━━━━━━━━━━━━━━
👤 *اسم العميل:* 
   ${formData.name}
━━━━━━━━━━━━━━━━━━━━
📱 *رقم الجوال:* 
   ${formData.phone}
━━━━━━━━━━━━━━━━━━━━
💬 *رسالة إضافية:* 
   ${formData.message || 'لا توجد رسالة'}
━━━━━━━━━━━━━━━━━━━━
🌐 *تم الإرسال من:* الموقع الشخصي
📅 *التاريخ:* ${new Date().toLocaleString('ar-EG')}
━━━━━━━━━━━━━━━━━━━━

📌 *يرجى التواصل مع العميل في أقرب وقت*`;

    // ترميز الرسالة للـ URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${TRAINER_WHATSAPP}?text=${encodedMessage}`;
    
    // فتح واتساب المدرب
    window.open(whatsappUrl, '_blank');
    
    setTimeout(() => {
      setIsSubmitting(false);
      handleCloseModal();
    }, 1500);
  };

  return (
    <>
      <section id="services" style={{
        padding: '80px 24px',
        background: '#0a0a0a',
        direction: t.dir,
      }}>
        <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto' }}>
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
                  margin: '0 0 20px' 
                }}>
                  {item.desc}
                </p>

                <button
                  onClick={() => handleServiceClick(item)}
                  style={{
                    width: '100%',
                    padding: '12px 20px',
                    background: `linear-gradient(135deg, ${primaryColor}, #991b1b)`,
                    border: 'none',
                    borderRadius: 12,
                    color: '#fff',
                    fontFamily: ff,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `0 5px 15px rgba(220,38,38,0.4)`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <span>📋</span>
                  {lang === 'ar' ? 'اشترك الآن' : 'Subscribe Now'}
                  <span>➡️</span>
                </button>
                
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

      {/* Modal - Subscription Form */}
      {selectedService && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(20px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.3s ease',
          }}
          onClick={handleCloseModal}
        >
          <div
            style={{
              maxWidth: 500,
              width: '100%',
              background: 'linear-gradient(135deg, #0f0f0f, #0a0a0a)',
              borderRadius: 28,
              border: `1px solid rgba(220,38,38,0.2)`,
              padding: '0',
              position: 'relative',
              animation: 'slideUp 0.3s ease',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`,
              padding: '24px 28px',
              textAlign: 'center',
              position: 'relative',
            }}>
              <button
                onClick={handleCloseModal}
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  background: 'rgba(0,0,0,0.5)',
                  border: 'none',
                  borderRadius: 50,
                  width: 32,
                  height: 32,
                  cursor: 'pointer',
                  fontSize: 16,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(0,0,0,0.8)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(0,0,0,0.5)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                ✕
              </button>
              
              <div style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
                border: '2px solid rgba(255,255,255,0.3)',
              }}>
                <span style={{ fontSize: 36 }}>{selectedService.icon}</span>
              </div>
              <h3 style={{
                fontFamily: ff,
                fontSize: 24,
                fontWeight: 700,
                color: '#fff',
                margin: 0,
              }}>
                {selectedService.title}
              </h3>
            </div>

            {/* Form Body */}
            <div style={{ padding: '28px' }}>
              <p style={{
                fontFamily: ff,
                fontSize: 13,
                color: subColor,
                textAlign: 'center',
                marginBottom: 24,
              }}>
                {lang === 'ar' ? 'املأ البيانات التالية وسيتم إرسال طلبك للمدرب' : 'Fill in the information below and your request will be sent to the trainer'}
              </p>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder={lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'rgba(255,255,255,0.05)',
                      border: `1px solid rgba(220,38,38,0.2)`,
                      borderRadius: 12,
                      color: '#fff',
                      fontFamily: ff,
                      fontSize: 14,
                      outline: 'none',
                      transition: 'all 0.2s',
                      boxSizing: 'border-box',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = primaryColor;
                      e.target.style.background = 'rgba(220,38,38,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(220,38,38,0.2)';
                      e.target.style.background = 'rgba(255,255,255,0.05)';
                    }}
                  />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder={lang === 'ar' ? 'رقم الجوال (واتساب)' : 'Mobile Number (WhatsApp)'}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'rgba(255,255,255,0.05)',
                      border: `1px solid rgba(220,38,38,0.2)`,
                      borderRadius: 12,
                      color: '#fff',
                      fontFamily: ff,
                      fontSize: 14,
                      outline: 'none',
                      transition: 'all 0.2s',
                      boxSizing: 'border-box',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = primaryColor;
                      e.target.style.background = 'rgba(220,38,38,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(220,38,38,0.2)';
                      e.target.style.background = 'rgba(255,255,255,0.05)';
                    }}
                  />
                </div>

                <div style={{ marginBottom: 24 }}>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder={lang === 'ar' ? 'رسالة إضافية (اختياري)' : 'Additional Message (Optional)'}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'rgba(255,255,255,0.05)',
                      border: `1px solid rgba(220,38,38,0.2)`,
                      borderRadius: 12,
                      color: '#fff',
                      fontFamily: ff,
                      fontSize: 14,
                      outline: 'none',
                      resize: 'vertical',
                      transition: 'all 0.2s',
                      boxSizing: 'border-box',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = primaryColor;
                      e.target.style.background = 'rgba(220,38,38,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(220,38,38,0.2)';
                      e.target.style.background = 'rgba(255,255,255,0.05)';
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: `linear-gradient(135deg, ${primaryColor}, #991b1b)`,
                    border: 'none',
                    borderRadius: 14,
                    color: '#fff',
                    fontFamily: ff,
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: isSubmitting ? 0.7 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = `0 8px 25px rgba(220,38,38,0.4)`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <span>⏳</span>
                      {lang === 'ar' ? 'جاري الإرسال...' : 'Sending...'}
                    </>
                  ) : (
                    <>
                      <span>📲</span>
                      {lang === 'ar' ? 'إرسال طلب الاشتراك' : 'Send Subscription Request'}
                      <span>➡️</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
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