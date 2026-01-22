import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const Vault = () => {
  const [file, setFile] = useState(null);
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ users: 0, files: 0 });
  const [currentUser, setCurrentUser] = useState(null);
  
  // 🕵️‍♂️ Switch to Live API
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUser(decoded);
        
        if (decoded.role === 'admin') {
          fetchUsers();
          fetchStats(); 
        }
      } catch (err) {
        console.error("Invalid token");
      }
    }
    fetchItems();
  }, [token]);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/vault`, { headers: { 'x-auth-token': token } });
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching vault items");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/auth/users`, { headers: { 'x-auth-token': token } });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users for admin");
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/auth/stats`, { headers: { 'x-auth-token': token } });
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching system stats");
    }
  };

  const onUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      await axios.post(`${API_URL}/api/vault/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data', 'x-auth-token': token }
      });
      alert("Intel Secured!");
      setFile(null);
      fetchItems();
      fetchStats(); 
    } catch (err) {
      alert("Upload Failed");
    }
  };

  return (
    <div style={{ padding: '40px', color: 'white' }}>
      <h3>📤 UPLOAD NEW INTEL</h3>
      <form onSubmit={onUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} style={{ marginBottom: '10px' }} />
        <br />
        <button type="submit" style={{ background: '#238636', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          SECURE FILE
        </button>
      </form>

      <h3 style={{ marginTop: '40px' }}>📂 SECURE ARCHIVE</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {items.map((item) => (
          <div key={item._id} style={statCardStyle}>
            <p style={{ fontSize: '12px', wordBreak: 'break-all' }}>{item.fileName || 'Secret Intel'}</p>
          </div>
        ))}
      </div>

      {currentUser && currentUser.role === 'admin' && (
        <div style={{ marginTop: '60px', borderTop: '2px solid #f85149', paddingTop: '20px' }}>
          <h3 style={{ color: '#f85149' }}>🕵️‍♂️ ADMIN COMMAND CENTER</h3>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
            <div style={statCardStyle}>
              <h4 style={{ color: '#8b949e' }}>RECRUITS</h4>
              <p style={{ fontSize: '28px' }}>{stats.users}</p>
            </div>
            <div style={statCardStyle}>
              <h4 style={{ color: '#8b949e' }}>SECURE FILES</h4>
              <p style={{ fontSize: '28px' }}>{stats.files}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const statCardStyle = {
  background: '#161b22',
  padding: '20px',
  borderRadius: '8px',
  border: '1px solid #30363d',
  textAlign: 'center'
};

export default Vault;