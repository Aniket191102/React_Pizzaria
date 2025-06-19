import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ViewCartReport.css';

const ViewCartReport = () => {
  const [cartReports, setCartReports] = useState([]);

  useEffect(() => {
    // Load all necessary data
    const fetchData = async () => {
      try {
        const [cartRes, usersRes, itemsRes] = await Promise.all([
          axios.get('http://localhost:3000/cart'),
          axios.get('http://localhost:3000/users'),
          axios.get('http://localhost:3000/items'),
        ]);

        const cart = cartRes.data;
        const users = usersRes.data;
        const items = itemsRes.data;
        
        
        // Join data
        const reports = cart.map((entry) => {
          const user = users.find((u) => u.id === entry.user_id);
          const item = items.find((i) => Number(i.id) === Number(entry.item_id));
          
          return {
            id: entry.id,
            customerName: user ? user.name : 'Unknown User',
            itemName: item ? item.name : 'Unknown Item',
            quantity: entry.quantity,
            unitPrice: item ? item.price : 0,
            addedAt: new Date(entry.addedAt).toLocaleString(),
          };
        });

        setCartReports(reports);
      } catch (err) {
        console.error('Error fetching cart report:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-view-container">
      <h2>Cart Report</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Item</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Total</th>
            <th>Added At</th>
          </tr>
        </thead>
        <tbody>
          {cartReports.length > 0 ? (
            cartReports.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.customerName}</td>
                <td>{item.itemName}</td>
                <td>{item.quantity}</td>
                <td>₹{item.unitPrice.toFixed(2)}</td>
                <td>₹{(item.unitPrice * item.quantity).toFixed(2)}</td>
                <td>{item.addedAt}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-data">No cart items found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCartReport;
