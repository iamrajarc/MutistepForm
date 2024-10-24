import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct usage for React 18
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';

const root = ReactDOM.createRoot(document.getElementById('root')); // Correct method for React 18
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// Performance reporting (optional)
reportWebVitals();
