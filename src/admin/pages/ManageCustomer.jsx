import React, { useEffect, useState } from 'react';
import '../styles/ManageCustomer.css'; // Create this CSS file if not already
import {FaTrash} from "react-icons/fa";
import axios from 'axios';

const ManageCustomer = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:3000/users')
    .then((res)=>setCustomers(res.data))
  })

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      axios.delete(`http://localhost:3000/users/${id}`)
      .then(()=>{
      setCustomers(customers.filter((cust) => cust.id !== id));
    })
    }
  };

  return (
    <div className="admin-view-container">
      <div className="top-bar">
        <h2>Manage Customers</h2>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Order Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((cust) => (
              <tr key={cust.id}>
                <td>{cust.name}</td>
                <td>{cust.email}</td>
                <td>{cust.phone}</td>
                <td>{cust.address}</td>
                <td>{cust.orderDate}</td>
                <td>
                  <button className="btn delete" onClick={() => handleDelete(cust.id)}>
                   <FaTrash/> Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data">
                No customers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCustomer;
