import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AltApp from './site/AltApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AltApp />
  </StrictMode>,
)
