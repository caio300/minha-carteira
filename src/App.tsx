import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";

import { useTheme } from "./hooks/theme";

import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";

const App: React.FC = () => {
  const {theme} = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />  
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;
