import React, { useState } from 'react';
import '../styles/Order.css';

function Order() {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order submitted:', formData);
    alert('Order placed successfully!');
    // Optionally: clear cart, redirect to order success page
  };

  return (
    <div className="order-page">
      <div className="order-container">
        <h1>Checkout</h1>
        <form onSubmit={handleSubmit} className="order-form">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
          />

          <label>Address</label>
          <textarea
            name="address"
            rows="3"
            required
            value={formData.address}
            onChange={handleChange}
          />

          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
          />

          <button type="submit">Place Order</button>
        </form>
      </div>
    </div>
  );
}

export default Order;
