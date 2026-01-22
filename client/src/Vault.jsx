import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const Vault = () => {
  const [file, setFile] = useState(null);
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ users: 0, files: 0 }); // 👈 Added stats state
  const [currentUser, setCurrentUser] = useState(null);
  
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUser(decoded);
        
        if (decoded.role === 'admin') {
          fetchUsers();
          fetchStats(); // 👈 Fetch stats on load
        }
      } catch (err) {
        console.error("Invalid token");
      }
    }
    fetchItems();
  }, [token]);

  const fetchItems = async () => {
    try {
      const res = await axios.get('/api/vault', { headers: { 'x-auth-token': token } });
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching vault items");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/auth/users', { headers: { 'x-auth-token': token } });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users for admin");
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get('/api/auth/stats', { headers: { 'x-auth-token': token } });
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
    
    await axios.post('/api/vault/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data', 'x-auth-token': token }
    });
    setFile(null);
    fetchItems();
    fetchStats(); // 👈 Refresh stats after upload
  };

  // ... (deleteItem and deleteUser functions remain the same) ...

  return (
    <div style={{ padding: '40px', color: 'white' }}>
      <h3>📤 UPLOAD NEW INTEL</h3>
      {/* ... (Upload Form) ... */}

      <h3 style={{ marginTop: '40px' }}>📂 SECURE ARCHIVE</h3>
      {/* ... (Items Grid) ... */}

      {/* 🕵️‍♂️ ADMIN COMMAND CENTER */}
      {currentUser && currentUser.role === 'admin' && (
        <div style={{ marginTop: '60px', borderTop: '2px solid #f85149', paddingTop: '20px' }}>
          <h3 style={{ color: '#f85149', textShadow: '0 0 10px rgba(248, 81, 73, 0.5)' }}>
            🕵️‍♂️ ADMIN COMMAND CENTER
          </h3>

          {/* 📊 STATS CARDS */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
            <div style={statCardStyle}>
              <h4 style={{ margin: 0, color: '#8b949e' }}>RECRUITS</h4>
              <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '10px 0' }}>{stats.users}</p>
            </div>
            <div style={statCardStyle}>
              <h4 style={{ margin: 0, color: '#8b949e' }}>SECURE FILES</h4>
              <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '10px 0' }}>{stats.files}</p>
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#161b22', borderRadius: '8px' }}>
            {/* ... (Table content) ... */}
          </table>
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
  flex: 1,
  textAlign: 'center',
  boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
};
export default Vault;