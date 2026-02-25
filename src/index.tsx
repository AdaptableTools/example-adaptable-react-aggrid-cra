
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode> - avoid double rendering in dev, which causes some AG Grid warnings
  <App />
  // </React.StrictMode>
);
