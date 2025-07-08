import { login } from "../store/authslice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../css/AdminLogin.css"; // Assuming you have a CSS file for styling

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(login({ email, password }))
      .unwrap()
      .then((response) => {
        if (response.user?.isAdmin) {
          navigate("/admin/panel");
        } else {
          alert("Access denied. You are not an admin.");
        }
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin} className="admin-login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      {error && <p className="error-message">{typeof error === 'string' ? error : error.message}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
