import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Admin.css';
import Logo from "../../assets/pizzaLogo.png";

// Font Awesome icons
import { FaTachometerAlt, FaTags, FaPizzaSlice, FaPhone, FaUsers, FaShoppingCart, FaClipboardList } from 'react-icons/fa';

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <div className="left">
        <img src={Logo} alt="Logo" />
      </div>
      <nav>
        <Link to="/admin">
          <FaTachometerAlt className="icon" /> Dashboard
        </Link>
        <Link to="/admin/category">
          <FaTags className="icon" /> Manage Category
        </Link>
        <Link to="/admin/item">
          <FaPizzaSlice className="icon" /> Manage Item
        </Link>
        <Link to="/admin/contact">
          <FaPhone className="icon" /> Manage Contact
        </Link>
        <Link to="/admin/customer">
          <FaUsers className="icon" /> Manage Customer
        </Link>
        <Link to="/admin/cart">
          <FaShoppingCart className="icon" /> View Cart Report
        </Link>
        <Link to="/admin/orders">
          <FaClipboardList className="icon" /> Manage Orders
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;
