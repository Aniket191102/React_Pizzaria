import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import Bg1 from "../assets/pizza.jpeg";
import Bg2 from "../assets/pizza2.jpg";
import Bg3 from "../assets/pizza3.jpg";
import axios from "axios";

const backgroundImages = [Bg1, Bg2, Bg3];

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "");
}

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const slideRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 8000); // Change image every 8 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <div className="sliderContainer">
        <div className="sliderWrapper" ref={slideRef}>
          {backgroundImages.map((img, i) => (
            <div
              key={i}
              className="slide"
              style={{ backgroundImage: `url(${img})` }}
            >
              <div className="headerContainer">
                <h1>Aniket's Pizzaria</h1>
                <p>PIZZA TO FIT ANY TASTE</p>
                <Link to="/veg-pizza">
                  <button>ORDER NOW</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="homeContent">
        <h2>WHY CHOOSE US?</h2>
        <div className="features">
          <div className="feature">
            <h3>Fresh Ingredients</h3>
            <p>Only the best ingredients go into our pizzas.</p>
          </div>
          <div className="feature">
            <h3>Fast Delivery</h3>
            <p>Guaranteed hot delivery in under 30 minutes.</p>
          </div>
          <div className="feature">
            <h3>Wide Variety</h3>
            <p>From classic Margherita to custom builds.</p>
          </div>
        </div>

        <h1 className="menuTitle">CATEGORIES</h1>
        <div className="homeitems">
          {categories.map((item, index) => (
            <div className="item" key={index}>
              <Link to={`/${slugify(item.name)}`}>
                <img src={item.image} alt={item.name} />
                <h1>{item.name}</h1>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
