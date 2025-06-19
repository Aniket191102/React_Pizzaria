// components/MenuItem.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Menu.css";

function MenuItem({ image, name, price, description }) {
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="menuItem">
      <div style={{ backgroundImage: `url(${image})` }}></div>
      <h3>{name}</h3>
      <p>₹{price}</p>
      <Link
        to={`/pizza/${slug}`}
        state={{ image, name, price, description }}
        className="details-button"
      >
        View Details
      </Link>
    </div>
  );
}

export default MenuItem;
