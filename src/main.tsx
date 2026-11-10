import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './alt/alt.css'
import App from './App.tsx'
import AltApp from './alt/AltApp.tsx'
import { Switcher } from './alt/AltLayout.tsx'

// /alt serves the redesigned version; the toggle bottom-right flips between the two.
const alt = /^\/alt\/?$/.test(window.location.pathname)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {alt ? <AltApp /> : <App />}
    <Switcher alt={alt} />
  </StrictMode>,
)
