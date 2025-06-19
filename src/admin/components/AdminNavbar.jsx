import React from 'react';
import { FiLogOut } from 'react-icons/fi'; // ⬅️ Logout icon from Feather Icons

const AdminUser =JSON.parse(localStorage.getItem('adminUser'))
const AdminNavbar = () => (
  <div className="admin-navbar">
    <h3>Welcome, {AdminUser.name}</h3>
    <button
      onClick={() => {
        localStorage.removeItem('authToken'); // or sessionStorage
        window.location.href = '/admin/login';
      }}
      className="btn logout"
    >
      <FiLogOut style={{ marginRight: '8px' }} />
      Logout
    </button>
  </div>
);

export default AdminNavbar;
