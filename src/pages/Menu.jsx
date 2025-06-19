import React, { useState, useEffect } from "react";
import MenuItem from "../components/MenuItem";
import "../styles/Menu.css";
import axios from "axios";

function Menu({ id }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/items");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);


  const filteredItems = items.filter(
    (item) => String(item.category_id) === String(id)
  );

  return (
    <div className="menu">
      <h1 className="menuTitle">Our Menu</h1>
      <div className="menuList">
        {filteredItems.length === 0 ? (
          <p>No items found in this category.</p>
        ) : (
          filteredItems.map((menuItem) => (
            <MenuItem
              key={menuItem.id}
              image={menuItem.image}
              name={menuItem.name}
              price={menuItem.price}
              description={menuItem.description}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Menu;
