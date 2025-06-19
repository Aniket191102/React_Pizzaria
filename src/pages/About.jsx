import React from "react";
import MultiplePizzas from "../assets/multiplePizzas.jpeg";
import '../styles/About.css'

function About() {
  return (
    <div className="about">
      <div
        className="aboutTop"
        style={{ backgroundImage: `url(${MultiplePizzas})` }}
      ></div>
      <div className="aboutBottom">
        <h1>ABOUT US</h1>
        <p>
        <center>Welcome to Aniket’s Pizzaria – where passion meets pizza!<br/><br/></center>
        At Aniket’s Pizzaria, we believe that great pizza starts with great ingredients and a whole lot of love. Founded with the dream of serving mouth-watering, hand-tossed pizzas in a cozy, friendly environment, we’re more than just a pizza place — we’re a slice of home.<br/>
        Every pizza we make is crafted with fresh dough, house-made sauces, and premium toppings to bring you the perfect balance of flavor, texture, and satisfaction. Whether you’re a classic Margherita fan or love exploring bold new toppings, we’ve got something hot and delicious waiting for you.<br/>
        Our commitment to quality, community, and comfort has made us a favorite for families, foodies, and pizza lovers of all ages.<br/>
        So come on in — or order online — and experience why Aniket’s Pizzaria is the ultimate destination for pizza with heart.
        </p>
      </div>
    </div>
  );
}

export default About;
