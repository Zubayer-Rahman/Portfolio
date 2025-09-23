import React from 'react';
import { Routes, Route } from 'react-router';
import Home from './pages/Home.jsx';
import 'normalize.css';

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
