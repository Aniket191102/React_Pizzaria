import React, { useEffect, useState } from "react";
import "../styles/Manage.css";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import axios from "axios";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    image: null,
  });

  useEffect(() => {
    axios.get("http://localhost:3000/categories")
      .then((res) => setCategories(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setForm((prev) => ({ ...prev, image: reader.result }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.image) {
      alert("Please provide both name and image");
      return;
    }

    const newCategory = {
      name: form.name,
      image: form.image,
    };

    if (isEditing) {
      axios.put(`http://localhost:3000/categories/${editId}`, newCategory)
        .then((res) => {
          setCategories((prev) =>
            prev.map((cat) => (cat.id === editId ? res.data : cat))
          );
        });
    } else {
      axios.post("http://localhost:3000/categories", newCategory)
        .then((res) => {
          setCategories([...categories, res.data]);
        });
    }

    // Reset form and state
    setForm({ name: "", image: null });
    setShowForm(false);
    setIsEditing(false);
    setEditId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      axios.delete(`http://localhost:3000/categories/${id}`)
        .then(() => {
          setCategories(categories.filter((c) => c.id !== id));
        });
    }
  };

  const handleUpdate = (id) => {
    const categoryToEdit = categories.find((cat) => cat.id === id);
    if (categoryToEdit) {
      setForm({
        name: categoryToEdit.name,
        image: categoryToEdit.image,
      });
      setIsEditing(true);
      setEditId(id);
      setShowForm(true);
    }
  };

  const handleCancel = () => {
    setForm({ name: "", image: null });
    setShowForm(false);
    setIsEditing(false);
    setEditId(null);
  };

  return (
    <div className="admin-view-container">
      <div className="top-bar">
        <h2>Manage Category</h2>
        <button className="btn add" onClick={() => setShowForm(!showForm)}>
          {showForm ? (
            <>
              <FaTimes /> Close Form
            </>
          ) : (
            <>
              <FaPlus /> Add Category
            </>
          )}
        </button>
      </div>

      {showForm && (
        <form className="admin-form horizontal" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Category Name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
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
            <button type="button" className="btn cancel" onClick={handleCancel}>
              <FaTimes /> Cancel
            </button>
          )}
        </form>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((cat) => (
              <tr key={cat.id}>
                <td>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="category-img"
                  />
                </td>
                <td>{cat.name}</td>
                <td>
                  <button
                    className="btn update"
                    onClick={() => handleUpdate(cat.id)}
                  >
                    <FaEdit /> Update
                  </button>
                  <button
                    className="btn delete"
                    onClick={() => handleDelete(cat.id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-data">
                No categories yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCategory;
