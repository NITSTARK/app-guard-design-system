
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Get the saved theme from localStorage or use system preference
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) return savedTheme;
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Apply theme class to html element before React renders
document.documentElement.classList.add(getInitialTheme());

createRoot(document.getElementById("root")!).render(<App />);
