import { createContext, useContext, useEffect } from "react";
import { setThemeStateAction } from "@/store/Services/Theme";
import { themeTypesCustome } from "@/types/types";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHook";

const ThemeProviderContext = createContext({});
export function ThemeProvider({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.themecontrols);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: themeTypesCustome) => {
      dispatch(setThemeStateAction(newTheme));
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
