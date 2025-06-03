// src/components/Logout.jsx
import "../assets/css/admin-dashboard.css";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication tokens or user data here
    // For example: localStorage.removeItem('authToken');
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="logout-section">
      <h2>Logout</h2>
      <p>Click the button below to logout.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
