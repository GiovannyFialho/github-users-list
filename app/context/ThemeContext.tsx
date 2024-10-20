"use cliente";

import Cookies from "js-cookie";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";

type ThemeProviderType = {
  currentTheme: string;
  setTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeProviderType | undefined>(undefined);

export function ThemeProvider({
  initialTheme,
  children
}: {
  initialTheme: string;
  children: ReactNode;
}) {
  const [currentTheme, setCurrentTheme] = useState(initialTheme);

  useEffect(() => {
    const userTheme = Cookies.get("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    const themeToApply = userTheme || currentTheme || systemTheme;
    setCurrentTheme(themeToApply);

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(themeToApply);

    Cookies.set("theme", themeToApply, { expires: 365, sameSite: "strict" });

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? "dark" : "light";

      if (!userTheme) {
        setCurrentTheme(newSystemTheme);

        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(newSystemTheme);

        Cookies.set("theme", newSystemTheme, {
          expires: 365,
          sameSite: "strict"
        });
      }
    };

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleSystemThemeChange);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleSystemThemeChange);
    };
  }, [currentTheme]);

  const setTheme = (theme: string) => {
    setCurrentTheme(theme);

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);

    Cookies.set("theme", theme, { expires: 365, sameSite: "strict" });
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
  }

  return context;
}
