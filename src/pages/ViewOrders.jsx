import React from "react";
import "../styles/ViewOrders.css";

const orders = [
  {
    id: "ORD12345",
    items: ["Margherita", "Pepperoni"],
    total: "20.00",
    status: "Delivered",
    date: "2025-05-29",
  },
  {
    id: "ORD67890",
    items: ["Veggie Supreme"],
    total: "12.00",
    status: "On the way",
    date: "2025-05-30",
  },
];

function ViewOrders() {
  return (
    <div className="orders-page">
      <h2>My Orders</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div className="order-card" key={order.id}>
            <div className="order-header">
              <h3>Order #{order.id}</h3>
              <span className={`status ${order.status.replace(" ", "").toLowerCase()}`}>
                {order.status}
              </span>
            </div>
            <p><strong>Date:</strong> {order.date}</p>
            <p><strong>Items:</strong> {order.items.join(", ")}</p>
            <p><strong>Total:</strong> ₹{order.total}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewOrders;
