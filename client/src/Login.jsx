import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // 👈 Essential for navigation

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      window.location.reload(); 
    } catch (err) {
      alert("Login Failed: Check credentials or Server");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
      <div style={{ background: '#161b22', padding: '40px', borderRadius: '8px', border: '1px solid #30363d', width: '350px' }}>
        <form onSubmit={onSubmit}>
          <h2 style={{ textAlign: 'center', color: '#238636', letterSpacing: '2px' }}>SENTINEL LOGIN</h2>
          <input 
            type="email" name="email" placeholder="Email Address" value={email} onChange={onChange} required 
            style={inputStyle}
          />
          <input 
            type="password" name="password" placeholder="Password" value={password} onChange={onChange} required 
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            ACCESS SYSTEM
          </button>
        </form>

        {/* 🕵️‍♂️ NEW REGISTRATION OPTION */}
        <div style={{ marginTop: '25px', textAlign: 'center', borderTop: '1px solid #30363d', paddingTop: '15px' }}>
          <p style={{ color: '#8b949e', fontSize: '14px' }}>
            New recruit?{' '}
            <Link to="/register" style={{ color: '#238636', textDecoration: 'none', fontWeight: 'bold' }}>
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// Reusable styles for a cleaner component
const inputStyle = { width: '100%', padding: '12px', marginBottom: '20px', background: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '5px', boxSizing: 'border-box' };
const buttonStyle = { width: '100%', padding: '12px', background: '#238636', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' };

export default Login;