import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const Vault = () => {
  const [file, setFile] = useState(null);
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ users: 0, files: 0 });
  const [currentUser, setCurrentUser] = useState(null);
  
  // 🕵️‍♂️ Switch to Live API URL
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
      alert("Sentinel Access Granted! Intel Secured.");
      setFile(null);
      fetchItems();
      fetchStats(); 
    } catch (err) {
      alert("Upload Failed: Check connection or file type");
    }
  };

  return (
    <div style={{ padding: '40px', color: 'white', minHeight: '100vh', background: '#0d1117' }}>
      
      {/* 📤 UPLOAD SECTION */}
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          📤 UPLOAD NEW INTEL
        </h3>
        <form onSubmit={onUpload} style={{ marginTop: '20px' }}>
          <input 
            type="file" 
            onChange={(e) => setFile(e.target.files[0])} 
            style={{ marginBottom: '15px', color: '#8b949e' }} 
          />
          <br />
          <button 
            type="submit" 
            style={{ 
              background: '#238636', 
              color: 'white', 
              padding: '12px 24px', 
              border: 'none', 
              borderRadius: '6px', 
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            SECURE FILE
          </button>
        </form>
      </div>

      <hr style={{ border: '0.5px solid #30363d', margin: '40px 0' }} />

      {/* 📂 ARCHIVE SECTION */}
      <h3 style={{ textAlign: 'center', marginBottom: '30px' }}>📂 SECURE ARCHIVE</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {items.length > 0 ? items.map((item) => (
          <div key={item._id} style={statCardStyle}>
            <p style={{ fontSize: '13px', wordBreak: 'break-all', color: '#58a6ff' }}>{item.fileName || 'Encrypted Intel'}</p>
          </div>
        )) : <p style={{ textAlign: 'center', gridColumn: '1/-1', color: '#8b949e' }}>No intel found in vault.</p>}
      </div>

      {/* 🕵️‍♂️ ADMIN COMMAND CENTER */}
      {currentUser && currentUser.role === 'admin' && (
        <div style={{ marginTop: '60px', borderTop: '2px solid #f85149', paddingTop: '30px' }}>
          <h3 style={{ color: '#f85149', textAlign: 'center', textShadow: '0 0 8px rgba(248, 81, 73, 0.3)' }}>
            🕵️‍♂️ ADMIN COMMAND CENTER
          </h3>

          <div style={{ display: 'flex', gap: '20px', margin: '30px 0' }}>
            <div style={statCardStyle}>
              <h4 style={{ margin: 0, color: '#8b949e' }}>RECRUITS</h4>
              <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '15px 0' }}>{stats.users}</p>
            </div>
            <div style={statCardStyle}>
              <h4 style={{ margin: 0, color: '#8b949e' }}>SECURE FILES</h4>
              <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '15px 0' }}>{stats.files}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const statCardStyle = {
  background: '#161b22',
  padding: '25px',
  borderRadius: '10px',
  border: '1px solid #30363d',
  flex: 1,
  textAlign: 'center',
  boxShadow: '0 4px 15px rgba(0,0,0,0.4)'
};

export default Vault;