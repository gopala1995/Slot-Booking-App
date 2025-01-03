import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Booking from './Booking';
import Home from './Home';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </Router>
  );
}

export default App;
