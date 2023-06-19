import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { ThemeProvider } from './hooks/theme'
import { AuthProvider } from './hooks/auth'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
