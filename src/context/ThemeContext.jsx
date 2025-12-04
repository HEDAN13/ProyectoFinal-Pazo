import { createContext, useEffect, useState } from "react";
import { mostrarToastError } from "../components/notificaciones";

export const ThemeContext = createContext();

const getInitialTheme = () => {
  try {
    const stored = localStorage.getItem("dark");
    return stored ? JSON.parse(stored) : false;
  } catch (error) {
    mostrarToastError(`Error leyendo el tema del localstorage: ${error}`);
    return false;
  }
};

export default function ThemeProvider({ children }) {
  const [dark, setDark] = useState(getInitialTheme);

  const changeTheme = () => {
    setDark((theme) => !theme);
  };

  useEffect(() => {
    try {
      localStorage.setItem("dark", JSON.stringify(dark));
    } catch {
      mostrarToastError("No se pudo guardar el tema");
    }
  }, [dark]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark-theme", dark);
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
