import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n/index.ts'

const racine = document.getElementById("root")!;
// Page pré-générée déjà affichée : pas d'écran d'accueil animé par-dessus (plus rapide, et mieux noté par Google)
(window as unknown as { __pagePregeneree?: boolean }).__pagePregeneree = racine.children.length > 0;
createRoot(racine).render(<App />);
