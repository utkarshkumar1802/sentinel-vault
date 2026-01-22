import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/auth/register', formData);
            alert("Sentinel Access Granted! Please login.");
            navigate('/');
        } catch (err) {
            alert(err.response?.data?.msg || "Registration Failed");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', paddingTop: '50px' }}>
            <form onSubmit={onSubmit} style={formStyle}>
                <h2 style={{ color: '#238636', textAlign: 'center' }}>NEW RECRUIT</h2>
                <input type="text" placeholder="Username" style={inputStyle} onChange={e => setFormData({...formData, username: e.target.value})} required />
                <input type="email" placeholder="Email" style={inputStyle} onChange={e => setFormData({...formData, email: e.target.value})} required />
                <input type="password" placeholder="Password" style={inputStyle} onChange={e => setFormData({...formData, password: e.target.value})} required />
                <button type="submit" style={btnStyle}>CREATE ACCOUNT</button>
                <p style={{ textAlign: 'center', marginTop: '15px' }}>
                    Already have access? <Link to="/" style={{ color: '#58a6ff' }}>Login here</Link>
                </p>
            </form>
        </div>
    );
};

const formStyle = { background: '#161b22', padding: '40px', borderRadius: '8px', border: '1px solid #30363d', width: '350px' };
const inputStyle = { width: '100%', padding: '10px', marginBottom: '20px', background: '#0d1117', border: '1px solid #30363d', color: 'white', boxSizing: 'border-box' };
const btnStyle = { width: '100%', padding: '10px', background: '#238636', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };

export default Register;