import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Suppress React DevTools warning message
const originalConsoleWarn = console.warn;
console.warn = function(message) {
  if (typeof message === 'string' && message.includes('React DevTools')) {
    return;
  }
  originalConsoleWarn.apply(console, arguments);
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
