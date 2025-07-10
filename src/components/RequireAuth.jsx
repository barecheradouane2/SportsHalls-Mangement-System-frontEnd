// components/RequireAuth.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios"; // uses `withCredentials: true`

function RequireAuth({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {

    axios
      .get("https://localhost:7259/user/me", { withCredentials: true })
      .then(() => {

  
        
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setLoading(false);
      });

   
  }, []);

  if (loading) return <p>Loading...</p>;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default RequireAuth;
