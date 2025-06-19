import React from "react";
import Logo from "../assets/pizzaLogo.png";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "");
}

function Navbar() {
  const [categories, setCategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    const user = localStorage.getItem("user");
  setIsLoggedIn(!!user);
    fetchCategories();
  }, []);
  return (
    <div className="navbar">
      <div className="leftSide">
        <img src={Logo} alt="" />
      </div>
      <div className="rightSide">
        <div className="navLinks">
          <Link to="/">Home</Link>
          <div className="nav-item dropdown">
            <Link
              href="#"
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              Menu
            </Link>
            <div className="dropdown-menu fade-down m-0">
              {categories.map((item, index) => (
                <Link
                  key={index}
                  to={`/${slugify(item.name)}`}
                  className="dropdown-item"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Account Icon on the Far Right */}
        <div className="nav-item dropdown accountIcon">
          <Link
            href="#"
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <AccountCircleIcon fontSize="large" style={{ color: "white" }} />
          </Link>
          <div className="dropdown-menu fade-down m-0">
            {!isLoggedIn ? (
              <Link to="/login" className="dropdown-item">
                Login
              </Link>
            ) : (
              <>
                <Link to="/profile" className="dropdown-item">
                  Manage profile
                </Link>
                <Link to="/cart" className="dropdown-item">
                  Cart
                </Link>
                <Link to="/vieworder" className="dropdown-item">
                  View Order
                </Link>
                <Link
                  className="dropdown-item"
                  onClick={() => {
                    localStorage.removeItem("user");
                    window.location.href = '/';
                  }}
                >
                  Logout
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
