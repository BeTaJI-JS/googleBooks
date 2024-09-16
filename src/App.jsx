import { createRoot } from 'react-dom/client';

import './index.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from 'pages/MainPage';

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route element={<MainPage />} path='/' />
    </Routes>
  </Router>,
);
