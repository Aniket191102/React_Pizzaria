import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Cart.css";
import image1 from '../assets/margherita.jpg'
import image2 from '../assets/pepperoni.jpg'

function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Margherita Pizza",
      description: "Classic cheese and tomato pizza",
      price: 120,
      quantity: 1,
      image: image1,
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      description: "Pepperoni with mozzarella cheese",
      price: 250,
      quantity: 2,
      image: image2,
    },
  ]);

  const updateQuantity = (id, amount) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const getTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-list">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} className="item-image" />

              <div className="item-info">
                <h4>{item.name}</h4>
                <p className="description">{item.description}</p>
                <p>₹{item.price} x {item.quantity}</p>
              </div>

              <div className="item-actions">
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                <button className="remove" onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
          ))}

          <div className="cart-total">
            <h3>Total: ₹{getTotal()}</h3>
            <Link to="/order">
              <button className="checkout-btn">Proceed to Checkout</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
