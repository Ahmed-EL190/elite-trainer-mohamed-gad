import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    dir: 'ltr',
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      certifications: 'Certifications',
      videos: 'Videos',
      contact: 'Contact',
    },
    hero: {
      title: 'Transform Your Body',
      subtitle: 'Transform Your Life',
      description: 'Certified Personal Trainer | NASM Certified | 6+ Years Experience',
      cta: 'Start Your Journey',
      cta2: 'Learn More',
    },
    about: {
      title: 'About Me',
      subtitle: 'Your Dedicated Fitness Partner',
      description: "I am an Egyptian Certified Personal Trainer from NASM, with 6 years in the fitness industry. As a CPT, I'm committed to delivering satisfaction in every session through personalized training programs tailored to your goals.",
      stats: [
        { value: '6+', label: 'Years Experience' },
        { value: '100+', label: 'Happy Clients' },
        { value: 'NASM', label: 'Certified' },
        { value: '3+', label: 'Gyms Worked' },
      ],
    },
    services: {
      title: 'Services',
      subtitle: 'What I Offer',
      items: [
        { icon: '💪', title: 'Personal Training', desc: 'One-on-one sessions tailored to your goals, fitness level, and schedule.' },
        { icon: '🏋️', title: 'Bodybuilding', desc: 'Specialized bodybuilding programs to help you build muscle and strength effectively.' },
        { icon: '📋', title: 'Custom Meal Plans', desc: 'Personalized nutrition plans designed to fuel your performance and recovery.' },
        { icon: '🔥', title: 'Fat Loss Programs', desc: 'Science-based fat loss strategies combined with effective training protocols.' },
        { icon: '🩹', title: 'Injury Recovery', desc: 'Safe training programs for clients dealing with injuries or physical limitations.' },
        { icon: '🧠', title: 'Motivation & Coaching', desc: 'Constant motivation and accountability to keep you on track toward your goals.' },
      ],
    },
    experience: {
      title: 'Career History',
      subtitle: 'My Professional Journey',
      items: [
        { period: '2023 - Present', place: 'Metafit.sa — Saudi Arabia', role: 'Fitness Coach', desc: 'Responsible for bodybuilding and fitness exercises, helping clients achieve peak physical performance.' },
        { period: '2021 - 2023', place: 'Power House Gym — Egypt', role: 'Personal Trainer & Supervisor', desc: 'Personal trainer and hall supervisor managing both customers and staff performance.' },
        { period: '2019 - 2021', place: 'Power House Gym — Egypt', role: 'Floor Trainer', desc: 'Working with all customers on the floor to ensure correct exercise form and performance.' },
        { period: '2017 - 2019', place: 'Hawar Fitness Center — Egypt', role: 'Personal Trainer', desc: 'Learned sales, designed specialized plans, and worked with clients with various injuries.' },
      ],
    },
    certifications: {
      title: 'Certifications',
      subtitle: 'Qualifications & Education',
      items: [
        { org: 'National Academy of Sports Medicine', name: 'International Certified Personal Trainer (NASM-CPT)', date: 'Sep 2023', icon: '🏅' },
        { org: 'Egyptian Red Crescent', name: 'Basic Life Support (CPR/AED) & First Aid', date: 'Jul 2023', icon: '❤️' },
        { org: 'American Chamber of Commerce in Egypt', name: 'Sales Professional', date: 'Feb 2021', icon: '📜' },
        { org: 'Aspire Training Solutions', name: 'Virtual Employability Skills Track', date: 'Dec 2020', icon: '💡' },
        { org: 'Zagazig University', name: 'Bachelor of Commerce — Excellent with Honors', date: 'May 2022', icon: '🎓' },
      ],
    },
    videos: {
  title: '🎬 Intro About me & 💪 Workout Compilation',
  subtitle: 'See Me In Action',
},
    contact: {
      title: 'Get In Touch',
      subtitle: "Ready to Start? Let's Talk!",
      email: 'Email',
      phone: 'WhatsApp & Phone',
      location: 'Location',
      locationVal: 'Saudi Arabia',
      whatsapp: 'Chat on WhatsApp',
      skills: ['Effective Motivator', 'Client Relationship Management', 'Correct Movement & Performance', 'English & Arabic Speaker'],
    },
    // NEW: Combined Section Translations
    combined: {
      badge: 'My Journey',
      title: 'Certifications & Experience',
      showCertifications: 'Show Certifications',
      hideCertifications: 'Hide Certifications',
      showExperience: 'Show Experience',
      hideExperience: 'Hide Experience',
    },
    footer: {
      rights: 'All rights reserved.',
    },
  },
  ar: {
    dir: 'rtl',
    nav: {
      home: 'الرئيسية',
      about: 'عني',
      services: 'الخدمات',
      certifications: 'الشهادات',
      videos: 'الفيديوهات',
      contact: 'تواصل معي',
    },
    hero: {
      title: 'حوّل جسمك',
      subtitle: 'غيّر حياتك',
      description: 'مدرب شخصي معتمد | شهادة NASM | خبرة أكثر من 4 سنوات',
      cta: 'ابدأ رحلتك',
      cta2: 'اعرف أكثر',
    },
    about: {
      title: 'عني',
      subtitle: 'شريكك المخصص للياقة',
      description: 'أنا مدرب شخصي مصري معتمد من NASM، مع 4 سنوات في صناعة اللياقة البدنية. كمدرب معتمد، أنا ملتزم بتقديم الرضا الكامل في كل جلسة من خلال برامج تدريبية مخصصة تناسب أهدافك.',
      stats: [
        { value: '+6', label: 'سنوات خبرة' },
        { value: '+100', label: 'عميل سعيد' },
        { value: 'NASM', label: 'معتمد' },
        { value: '+3', label: 'صالات عمل' },
      ],
    },
    services: {
      title: 'الخدمات',
      subtitle: 'ماذا أقدم',
      items: [
        { icon: '💪', title: 'التدريب الشخصي', desc: 'جلسات فردية مصممة وفق أهدافك ومستواك ووقتك.' },
        { icon: '🏋️', title: 'كمال الأجسام', desc: 'برامج كمال أجسام متخصصة لبناء العضلات والقوة بفعالية.' },
        { icon: '📋', title: 'خطط تغذية مخصصة', desc: 'خطط غذائية شخصية مصممة لتغذية أدائك وتعافيك.' },
        { icon: '🔥', title: 'برامج إنقاص الوزن', desc: 'استراتيجيات إنقاص الدهون العلمية مع بروتوكولات تدريب فعّالة.' },
        { icon: '🩹', title: 'التعافي من الإصابات', desc: 'برامج تدريبية آمنة للعملاء الذين يعانون من إصابات أو قيود جسدية.' },
        { icon: '🧠', title: 'التحفيز والتدريب', desc: 'تحفيز مستمر ومتابعة دقيقة لإبقائك على المسار الصحيح.' },
      ],
    },
    experience: {
      title: 'المسيرة المهنية',
      subtitle: 'رحلتي المهنية',
      items: [
        { period: '2023 - الآن', place: 'Metafit.sa — السعودية', role: 'مدرب لياقة', desc: 'مسؤول عن تمارين كمال الأجسام واللياقة البدنية، مساعدة العملاء في تحقيق أعلى مستويات الأداء.' },
        { period: '2021 - 2023', place: 'Power House Gym — مصر', role: 'مدرب شخصي ومشرف', desc: 'مدرب شخصي ومشرف قاعة يدير أداء العملاء والموظفين.' },
        { period: '2019 - 2021', place: 'Power House Gym — مصر', role: 'مدرب قاعة', desc: 'العمل مع جميع العملاء في القاعة لضمان الأداء الصحيح للتمارين.' },
        { period: '2017 - 2019', place: 'Hawar Fitness Center — مصر', role: 'مدرب شخصي', desc: 'تعلمت المبيعات، صممت خططاً متخصصة، وعملت مع عملاء يعانون من إصابات متنوعة.' },
      ],
    },
    certifications: {
      title: 'الشهادات',
      subtitle: 'المؤهلات والتعليم',
      items: [
        { org: 'الأكاديمية الوطنية للطب الرياضي', name: 'مدرب شخصي معتمد دولياً (NASM-CPT)', date: 'سبتمبر 2023', icon: '🏅' },
        { org: 'الهلال الأحمر المصري', name: 'الإسعافات الأولية ودعم الحياة الأساسي (CPR/AED)', date: 'يوليو 2023', icon: '❤️' },
        { org: 'غرفة التجارة الأمريكية في مصر', name: 'محترف المبيعات', date: 'فبراير 2021', icon: '📜' },
        { org: 'Aspire Training Solutions', name: 'مسار مهارات التوظيف الافتراضي', date: 'ديسمبر 2020', icon: '💡' },
        { org: 'جامعة الزقازيق', name: 'بكالوريوس تجارة — امتياز مع مرتبة الشرف', date: 'مايو 2022', icon: '🎓' },
      ],
    },
    videos: {
  title: '🎬 فديو تعريفي و 💪 مجموعة تمارين',
  subtitle: 'شاهدني أثناء العمل',
},
    contact: {
      title: 'تواصل معي',
      subtitle: 'مستعد للبدء؟ لنتحدث!',
      email: 'البريد الإلكتروني',
      phone: 'واتساب والهاتف',
      location: 'الموقع',
      locationVal: 'المملكة العربية السعودية',
      whatsapp: 'تحدث عبر واتساب',
      skills: ['محفز فعّال', 'إدارة علاقات العملاء', 'الحركة والأداء الصحيح', 'متحدث بالعربية والإنجليزية'],
    },
    // NEW: Combined Section Translations
    combined: {
      badge: 'إنجازاتي',
      title: 'الشهادات والخبرات',
      showCertifications: 'عرض الشهادات',
      hideCertifications: 'إخفاء الشهادات',
      showExperience: 'عرض الخبرات',
      hideExperience: 'إخفاء الخبرات',
    },
    footer: {
      rights: 'جميع الحقوق محفوظة.',
    },
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const t = translations[lang];
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}