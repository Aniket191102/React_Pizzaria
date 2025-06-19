import React, { useState, useEffect } from "react";
import "../styles/Manage.css";
import { FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import axios from "axios";

const ManageItem = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
    category_id: "", // keep as string for <select>
  });

  // Load items and categories on mount
  useEffect(() => {
    axios.get("http://localhost:3000/items").then((res) => setItems(res.data));
    axios.get("http://localhost:3000/categories").then((res) =>
      setCategories(res.data)
    );
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setForm((prev) => ({
            ...prev,
            image: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.description ||
      !form.price ||
      !form.image ||
      !form.category_id
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const newItem = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price) || 0,
      image: form.image,
      category_id: form.category_id, // keep as string
    };


    if (isEditing) {
      axios
        .put(`http://localhost:3000/items/${editId}`, newItem)
        .then((res) => {
          setItems((prev) =>
            prev.map((item) => (item.id === editId ? res.data : item))
          );
          resetForm();
        });
    } else {
      axios.post("http://localhost:3000/items", newItem).then((res) => {
        setItems([...items, res.data]);
        resetForm();
      });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios.delete(`http://localhost:3000/items/${id}`).then(() => {
        setItems(items.filter((item) => item.id !== id));
      });
    }
  };

  const handleUpdate = (id) => {
    const itemToEdit = items.find((item) => item.id === id);
    if (itemToEdit) {
      setForm({
        name: itemToEdit.name,
        description: itemToEdit.description,
        price: itemToEdit.price,
        image: itemToEdit.image,
        category_id: String(itemToEdit.category_id), // convert to string for select
      });
      setIsEditing(true);
      setEditId(id);
      setShowForm(true);
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      image: null,
      category_id: "",
    });
    setShowForm(false);
    setIsEditing(false);
    setEditId(null);
  };

  return (
    <div className="admin-view-container">
      <div className="top-bar">
        <h2>Manage Items</h2>
        <button className="btn add" onClick={() => setShowForm(!showForm)}>
          {showForm ? (
            <>
              <FaTimes /> Close Form
            </>
          ) : (
            <>
              <FaPlus /> Add Item
            </>
          )}
        </button>
      </div>

      {showForm && (
        <form className="admin-form vertical" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={form.name}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Item Description"
            value={form.description}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Item Price"
            value={form.price}
            onChange={handleChange}
          />
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />

          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <button type="submit" className="btn add">
              {isEditing ? (
                <>
                  <FaEdit /> Update
                </>
              ) : (
                <>
                  <FaPlus /> Add
                </>
              )}
            </button>

            {isEditing && (
              <button
                type="button"
                className="btn cancel"
                onClick={handleCancel}
              >
                <FaTimes /> Cancel
              </button>
            )}
          </div>
        </form>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="category-img"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  ₹
                  {typeof item.price === "number"
                    ? item.price.toFixed(2)
                    : "0.00"}
                </td>
                <td>{item.category_id}</td>
                <td>
                  <button
                    className="btn update"
                    onClick={() => handleUpdate(item.id)}
                  >
                    <FaEdit /> Update
                  </button>
                  <button
                    className="btn delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data">
                No items yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageItem;
