import { createRoot } from 'react-dom/client';

import './index.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from 'pages/MainPage';
import DetailPage from 'pages/DetailPage';

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route element={<MainPage />} path='/' />
      <Route element={<DetailPage />} path='book/:id' />
    </Routes>
  </Router>,
);
