import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ token, setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');
  };

  // If there is no token, don't show the navbar at all (or show a simple version)
  if (!token) return null;

  return (
    <nav style={{ 
      padding: '15px 30px', 
      background: '#161b22', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      borderBottom: '1px solid #30363d' 
    }}>
      <h2 style={{ color: '#238636', margin: 0, fontSize: '1.2rem' }}>🛡️ SENTINEL VAULT</h2>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/vault" style={{ color: '#58a6ff', textDecoration: 'none', fontWeight: 'bold' }}>MY INTEL</Link>
        <button 
          onClick={handleLogout} 
          style={{ background: '#da3633', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          LOGOUT
        </button>
      </div>
    </nav>
  );
};

export default Navbar;