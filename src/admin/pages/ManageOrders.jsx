import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ManageOrders.css';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [ordRes, itemsRes, custRes, oiRes] = await Promise.all([
          axios.get('http://localhost:3000/orders'),
          axios.get('http://localhost:3000/items'),
          axios.get('http://localhost:3000/users'),
          axios.get('http://localhost:3000/order_items'),
        ]);

        const ordersData = ordRes.data;
        const items = itemsRes.data;
        const customers = custRes.data;
        const orderItems = oiRes.data;

        const fullOrders = ordersData.map((o) => {
          const customer = customers.find((c) =>  Number(c.id) ===  Number(o.user_id)) || {};
          const relatedItems = orderItems
            .filter((oi) => oi.order_id === o.id)
            .map((oi) => {
              const fullItem = items.find((it) => it.id === oi.item_id) || {};
              return { name: fullItem.name, quantity: oi.quantity, price: oi.price };
            });
      
          return {
            id: o.id,
            customerName: customer.name || 'Unknown',
            phone: customer.phone || '',
            address: customer.address || '',
            items: relatedItems,
            orderDate: new Date(o.orderDate).toLocaleString(),
            status: o.status,
          };
        });

        setOrders(fullOrders);
      } catch (err) {
        console.error('Error loading orders:', err);
      }
    };
    fetchAll();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
  
    try {
      await axios.patch(`http://localhost:3000/orders/${orderId}`, {
        status: newStatus
      });
    } catch (err) {
      console.error('Failed to update status:', err);
      // Optionally revert the change in UI
    }
  };
  

  return (
    <div className="admin-view-container">
      <h2>Manage Orders</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th><th>Customer</th><th>Phone</th><th>Address</th>
            <th>Items</th><th>Total</th><th>Date</th><th>Status</th><th>Change</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr><td colSpan="9" className="no-data">No orders found</td></tr>
          ) : (
            orders.map((ord, i) => {
              const total = ord.items.reduce((sum, it) => sum + it.price * it.quantity, 0);
              return (
                <tr key={ord.id}>
                  <td>{i + 1}</td>
                  <td>{ord.customerName}</td>
                  <td>{ord.phone}</td>
                  <td>{ord.address}</td>
                  <td>
                    {ord.items.map((it, idx) => (
                      <div key={idx}>{`${it.name} ×${it.quantity}`}</div>
                    ))}
                  </td>
                  <td>₹{total.toFixed(2)}</td>
                  <td>{ord.orderDate}</td>
                  <td>{ord.status}</td>
                  <td>
                    <select value={ord.status} onChange={(e) => updateStatus(ord.id, e.target.value)}>
                      {['Pending','Preparing','Delivered','Cancelled'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;
