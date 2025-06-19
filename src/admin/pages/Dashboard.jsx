import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css'; // Update this with better styles or switch to Tailwind

const Dashboard = () => {
  const [stats, setStats] = useState({
    categories: 0,
    pizzas: 0,
    orders: 0,
    customers: 0,
  });

  const [recentOrders, setRecentOrders] = useState([
    {
      id: "ORD001",
      customerName: "Aniket Gajjar",
      phone: '987-654-3210',
      totalAmount: 1000,
      status: "Delivered",
      orderDate: "2025-06-04T14:00:00Z",
      items: [
        { pizzaName: "Margherita", quantity: 2 },
        { pizzaName: "Pepperoni", quantity: 1 }
      ]
    },
    {
      id: "ORD002",
      customerName: "John Doe",
      phone: '987-654-3210',
      totalAmount: 850,
      status: "Pending",
      orderDate: "2025-06-03T17:30:00Z",
      items: [
        { pizzaName: "Veggie Supreme", quantity: 1 }
      ]
    }
  ]);
  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, pizzaRes, orderRes, userRes, recentOrdersRes] = await Promise.all([
          axios.get('http://localhost:3000/categories'),
          axios.get('http://localhost:3000/items'),
          axios.get('http://localhost:3000/orders'),
          axios.get('http://localhost:3000/users'),
          // axios.get('/api/orders/recent'), // Endpoint should return recent orders
        ]);
  
        setStats({
          categories: catRes.data.length,
          pizzas: pizzaRes.data.length,
          orders: orderRes.data.length,
          customers: userRes.data.length,
        });

        setRecentOrders(recentOrdersRes.data.orders); // Ensure your backend returns this
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };

    fetchData();
  }, []);

  const AdminUser = JSON.parse(localStorage.getItem('adminUser'))

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Welcome, {AdminUser.name}</h1>

      <div className="dashboard-cards">
        <div className="card"><h3>Categories</h3><p>{stats.categories}</p></div>
        <div className="card"><h3>Pizzas</h3><p>{stats.pizzas}</p></div>
        <div className="card"><h3>Orders</h3><p>{stats.orders}</p></div>
        <div className="card"><h3>Customers</h3><p>{stats.customers}</p></div>
      </div>

      <div className="recent-orders">
  <h2>Recent Orders</h2>
  <table>
    <thead>
      <tr>
        <th>Order ID</th>
        <th>Customer</th>
        <th>Phone</th>
        <th>Total</th>
        <th>Status</th>
        <th>Date</th>
        <th>Items</th> {/* Added Items column */}
      </tr>
    </thead>
    <tbody>
      {recentOrders.map((order) => (
        <tr key={order.id}>
          <td>{order.id}</td>
          <td>{order.customerName}</td>
          <td>{order.phone}</td>
          <td>₹{order.totalAmount.toFixed(2)}</td>
          <td>{order.status}</td>
          <td>{new Date(order.orderDate).toLocaleDateString()}</td>
          <td>
            {order.items && order.items.length > 0 ? (
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.pizzaName} x{item.quantity}
                  </li>
                ))}
              </ul>
            ) : (
              "—"
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default Dashboard;
