// src/components/RequireAuth.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchCurrentUser } from '../api/auth.api';

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await fetchCurrentUser(); // This should validate cookie/session
        setLoading(false); // ✅ Authenticated
      } catch (error) {
        console.log("Unauthorized, redirecting to login");
        navigate('/login', { state: { from: location.pathname } });
      }
    };

    checkAuth();
  }, [navigate, location]);

  if (loading) return <div>Loading...</div>;

  return children;
};

export default RequireAuth;
