import React, { useState, createContext, useContext } from "react";

import dark from "../styles/themes/dark";
import light from "../styles/themes/light";

interface IThemeContext {
    toggleTheme(): void;
    theme: ITheme;
}

interface ITheme {
    title: string;

  colors: {
    primary: string;
    secondary: string;
    tertiary: string;

    white: string;
    black: string;
    gray: string;

    sucesse: string;
    info: string;
    warning: string;
  }
}

interface IChildrenProps {
    children: React.ReactNode
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

const ThemeProvider: React.FC<IChildrenProps> = ({ children }) => {
    const [theme, setTheme] = useState<ITheme>(dark);

    const toggleTheme = () => {
        if (theme.title === 'dark') {
            setTheme(light);
        }else {
            setTheme(dark);
        }
    }

    return (
        <ThemeContext.Provider value={{ toggleTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    )
};

function useTheme(): IThemeContext {
    const context = useContext(ThemeContext);

    return context; 
};

export { ThemeProvider, useTheme };
