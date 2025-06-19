import React, { useState } from 'react';
import '../styles/ManageContact.css'; // use your existing or shared CSS
import {FaTrash} from "react-icons/fa";
import { useEffect } from 'react';
import axios from 'axios';

const ManageContact = () => {
  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:3000/contact_messages')
    .then((res)=>setMessages(res.data))
  })

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      axios.delete(`http://localhost:3000/contact_messages/${id}`)
      .then(()=>{
      setMessages(messages.filter((msg) => msg.id !== id));
    })
    }
  };

  return (
    <div className="admin-view-container">
      <div className="top-bar">
        <h2>Manage Contact Us Messages</h2>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.length > 0 ? (
            messages.map((msg) => (
              <tr key={msg.id}>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.message}</td>
                <td>{msg.date}</td>
                <td>
                  <button className="btn delete" onClick={() => handleDelete(msg.id)}>
                  <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-data">
                No messages yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageContact;
