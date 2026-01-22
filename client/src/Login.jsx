import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      window.location.reload(); // This triggers App.jsx to see the new token
    } catch (err) {
      alert("Login Failed: Check credentials or Server");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
      <form onSubmit={onSubmit} style={{ background: '#161b22', padding: '40px', borderRadius: '8px', border: '1px solid #30363d', width: '350px' }}>
        <h2 style={{ textAlign: 'center', color: '#238636' }}>SENTINEL LOGIN</h2>
        <input 
          type="email" name="email" placeholder="Email Address" value={email} onChange={onChange} required 
          style={{ width: '100%', padding: '10px', marginBottom: '20px', background: '#0d1117', border: '1px solid #30363d', color: 'white' }}
        />
        <input 
          type="password" name="password" placeholder="Password" value={password} onChange={onChange} required 
          style={{ width: '100%', padding: '10px', marginBottom: '20px', background: '#0d1117', border: '1px solid #30363d', color: 'white' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#238636', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          ACCESS SYSTEM
        </button>
      </form>
    </div>
  );
};

export default Login;