import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    if (userName) {
      sessionStorage.setItem('userName', userName);
      navigate('/booking');
    }
  };

  return (
    <div className="container">
      <h1>Appointment Booking</h1>
      <input 
        type="text" 
        placeholder="Enter your name" 
        value={userName}
        onChange={(e) => setUserName(e.target.value)} 
      />
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default Home;
