// components/PizzaDetails.jsx
import React from "react";
import { useParams, useLocation } from "react-router-dom";
import "../styles/PizzaDetails.css";

function PizzaDetails() {
  const { name } = useParams(); // slug (e.g. "margerita-pizza")
  const location = useLocation();
  const pizza = location.state;

  if (!pizza) {
    return <div className="pizza-details"><h2>Pizza details not provided.</h2></div>;
  }

  return (
    <div className="pizza-details">
      <div className="pizza-card">
        <img src={pizza.image} alt={pizza.name} />
        <div className="pizza-info">
          <h2>{pizza.name}</h2>
          <p className="description">
            {pizza.description || "Delicious hand-crafted pizza made with fresh ingredients."}
          </p>
          <h3>Price: ₹{pizza.price}</h3>
          <button className="add-to-cart">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default PizzaDetails;
