import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import AIProvider from './components/AI/AIProvider';
import Home from './pages/Home';
import CalendarPage from './pages/Calendar';
import Settings from './pages/Settings';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AIProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </AIProvider>
  </BrowserRouter>
);
