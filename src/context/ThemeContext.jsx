import React, { createContext, useContext } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // ثابت: الوضع الداكن فقط (أسود/أحمر)
  const dark = true;
  const setDark = () => {}; // دالة فارغة لأننا لا نريد تغيير الثيم

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      <div style={{ minHeight: '100vh' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}