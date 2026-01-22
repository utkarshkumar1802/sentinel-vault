import Register from './Register';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './Navbar'; 
import Login from './Login';
import Vault from './Vault';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
  <Router>
    <div style={{ 
      backgroundColor: '#0d1117', 
      color: 'white', 
      minHeight: '100vh',
      width: '100vw',        // Force full viewport width
      display: 'flex', 
      flexDirection: 'column'
    }}>
      <Navbar token={token} setToken={setToken} />

      {/* This is the container that must center its children */}
      <main style={{ 
        flex: 1, 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center', // Centers horizontally
        alignItems: 'center',     // Centers vertically (perfect for Login)
        padding: '20px',
        boxSizing: 'border-box'
      }}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={!token ? <Login /> : <Navigate to="/vault" />} />
          <Route path="/vault" element={token ? <Vault /> : <Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  </Router>
);
}
export default App;