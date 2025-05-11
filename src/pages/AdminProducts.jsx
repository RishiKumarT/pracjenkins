import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState("");

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    size: "",
    color: "",
    material: "",
    imageUrl: "",
    categoryId: "",
  });

  const token = localStorage.getItem("token"); 

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data;
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        setProducts([]);
        console.warn("Unexpected products data format:", data);
      }
    } catch (error) {
      console.error("Failed to fetch products", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:8081/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting product", err?.response?.data || err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setFormError("");

    try {
      const payload = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
        category: {
          id: parseInt(newProduct.categoryId),
        },
      };

      const response = await axios.post("http://localhost:8081/api/products", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts([...products, response.data]);
      setShowForm(false);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        size: "",
        color: "",
        material: "",
        imageUrl: "",
        categoryId: "",
      });
    } catch (error) {
      console.error("Error adding product", error?.response?.data || error.message);
      setFormError("Failed to add product. Please check inputs.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Products</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          <FiPlus /> Add Product
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow p-6 mt-6 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Add New Product</h3>
          <form onSubmit={handleAddProduct} className="grid grid-cols-2 gap-4">
            <input name="name" value={newProduct.name} onChange={handleInputChange} placeholder="Name" required className="border p-2 rounded" />
            <input name="description" value={newProduct.description} onChange={handleInputChange} placeholder="Description" className="border p-2 rounded col-span-2" />
            <input name="price" type="number" step="0.01" value={newProduct.price} onChange={handleInputChange} placeholder="Price" required className="border p-2 rounded" />
            <input name="stock" type="number" value={newProduct.stock} onChange={handleInputChange} placeholder="Stock" required className="border p-2 rounded" />
            <input name="size" value={newProduct.size} onChange={handleInputChange} placeholder="Size (e.g. M, L)" required className="border p-2 rounded" />
            <input name="color" value={newProduct.color} onChange={handleInputChange} placeholder="Color" required className="border p-2 rounded" />
            <input name="material" value={newProduct.material} onChange={handleInputChange} placeholder="Material" required className="border p-2 rounded" />
            <input name="imageUrl" value={newProduct.imageUrl} onChange={handleInputChange} placeholder="Image URL" className="border p-2 rounded col-span-2" />
            <input name="categoryId" value={newProduct.categoryId} onChange={handleInputChange} placeholder="Category ID" required className="border p-2 rounded col-span-2" />

            {formError && <p className="text-red-500 col-span-2">{formError}</p>}
            <div className="col-span-2 flex justify-end gap-2 mt-2">
              <button type="button" onClick={() => setShowForm(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                Add Product
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl shadow p-4 relative"
            >
              <img
                src={product.imageUrl || "https://via.placeholder.com/150"}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600 mb-2">₹{product.price}</p>
              <div className="flex justify-end gap-2 absolute bottom-4 right-4">
                <button className="p-2 text-blue-600 hover:text-blue-800">
                  <FiEdit size={18} />
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AdminProducts;
