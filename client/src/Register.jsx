import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    // 🕵️‍♂️ Dynamic API URL: Uses the Vercel variable or falls back to localhost
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // 👈 Full URL is required for cross-domain communication
            await axios.post(`${API_URL}/api/auth/register`, formData);
            alert("Sentinel Access Granted! Please login.");
            navigate('/');
        } catch (err) {
            alert(err.response?.data?.msg || "Registration Failed");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', paddingTop: '50px', color: 'white' }}>
            <form onSubmit={onSubmit} style={formStyle}>
                <h2 style={{ color: '#238636', textAlign: 'center', letterSpacing: '1px' }}>NEW RECRUIT</h2>
                <input type="text" placeholder="Username" style={inputStyle} onChange={e => setFormData({...formData, username: e.target.value})} required />
                <input type="email" placeholder="Email" style={inputStyle} onChange={e => setFormData({...formData, email: e.target.value})} required />
                <input type="password" placeholder="Password" style={inputStyle} onChange={e => setFormData({...formData, password: e.target.value})} required />
                <button type="submit" style={btnStyle}>CREATE ACCOUNT</button>
                <p style={{ textAlign: 'center', marginTop: '15px', color: '#8b949e', fontSize: '14px' }}>
                    Already have access? <Link to="/" style={{ color: '#58a6ff', textDecoration: 'none' }}>Login here</Link>
                </p>
            </form>
        </div>
    );
};

const formStyle = { background: '#161b22', padding: '40px', borderRadius: '8px', border: '1px solid #30363d', width: '350px' };
const inputStyle = { width: '100%', padding: '12px', marginBottom: '20px', background: '#0d1117', border: '1px solid #30363d', color: 'white', boxSizing: 'border-box', borderRadius: '4px' };
const btnStyle = { width: '100%', padding: '12px', background: '#238636', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };

export default Register;