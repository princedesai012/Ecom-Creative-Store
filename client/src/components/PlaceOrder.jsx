import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/PlaceOrder.css";
import { MapPin, Landmark, Building2, Globe, Mail } from "lucide-react";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: ""
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();

    const allFilled = Object.values(address).every((val) => val.trim() !== "");
    if (!allFilled) {
      return alert("Please fill all fields.");
    }

    navigate("/payment", { state: { address, cartItems: state?.cartItems || [] } });
  };

  const fieldIcons = {
    street: <MapPin size={18} />,
    city: <Building2 size={18} />,
    state: <Landmark size={18} />,
    zip: <Mail size={18} />,
    country: <Globe size={18} />
  };

  return (
    <div className="address-form-container">
      <form onSubmit={handleNext} className="address-form">
        <h2>📦 Shipping Address</h2>

        {["street", "city", "state", "zip", "country"].map((field) => (
          <div key={field} className="form-group">
            <label htmlFor={field}>
              {fieldIcons[field]} {field[0].toUpperCase() + field.slice(1)}
            </label>
            <input
              type="text"
              id={field}
              name={field}
              placeholder={`Enter your ${field}`}
              value={address[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <button type="submit">🛒 Continue to Payment</button>
      </form>
    </div>
  );
};

export default PlaceOrder;
