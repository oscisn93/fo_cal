import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { store } from './app/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from './components/theme-provider.tsx';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);
