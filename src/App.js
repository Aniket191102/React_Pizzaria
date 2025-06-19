import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

// Components & Pages
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import PizzaDetails from "./pages/PizzaDetails";
import Order from "./pages/Order";
import ViewOrders from "./pages/ViewOrders";
import AdminRoutes from "./admin/AdminRoutes";

// Helper to create slug from category name
const slugify = (name) =>
  name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "");

function App() {
  const [menuCategory, setMenuCategory] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/categories");
        const categoriesWithSlugs = response.data.map((cat) => ({
          ...cat,
          slug: slugify(cat.name),
        }));
        setMenuCategory(categoriesWithSlugs);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Home */}
          <Route path="/" element={<><Navbar /><Home categories={menuCategory} /><Footer /></>} />

          {/* Dynamically Generated Menu Routes */}
          {menuCategory.map(({ id, slug }) => (
            <Route
              key={id}
              path={`/${slug}`}
              element={<><Navbar /><Menu id={id} /><Footer /></>}
            />
          ))}

          {/* Static Routes */}
          <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
          <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
          <Route path="/pizza/:name" element={<><Navbar /><PizzaDetails /><Footer /></>} />
          <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
          <Route path="/register" element={<><Navbar /><Register /><Footer /></>} />
          <Route path="/profile" element={<><Navbar /><Profile /><Footer /></>} />
          <Route path="/cart" element={<><Navbar /><Cart /><Footer /></>} />
          <Route path="/order" element={<><Navbar /><Order /><Footer /></>} />
          <Route path="/vieworder" element={<><Navbar /><ViewOrders /><Footer /></>} />
        </Routes>

        {/* Admin routes are outside regular routes */}
        <AdminRoutes />
      </Router>
    </div>
  );
}

export default App;
