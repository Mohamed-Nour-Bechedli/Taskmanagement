import axios from "axios";
import { Trash2, Pencil, Plus } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products/");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const removeProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("productName", name);
      if (image) formData.append("image", image);

      await axios.post("http://localhost:5000/api/products/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setName("");
      setImage(null);
      setIsAddOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    try {
      const formData = new FormData();
      formData.append("productName", editName);
      if (editImage) formData.append("image", editImage);

      await axios.put(
        `http://localhost:5000/api/products/${editingProduct._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setEditingProduct(null);
      setEditName("");
      setEditImage(null);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full text-left text-gray-600 dark:text-gray-300 border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 uppercase text-sm">
            <tr>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3 flex justify-between items-center">
                Action
                <button
                  onClick={() => setIsAddOpen(true)}
                  className="ml-2 p-2 bg-green-600 hover:bg-green-700 text-white rounded flex items-center transition-transform transform hover:-translate-y-0.5 hover:scale-105"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr
                  key={product._id}
                  className={`${index % 2 === 0
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-50 dark:bg-gray-700"
                    } hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300`}
                >
                  <td className="px-6 py-4">
                    <img
                      src={product.image}
                      alt={product.productName}
                      className="w-20 h-20 object-cover rounded transition-transform duration-300 hover:scale-105"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold dark:text-white">
                    {product.productName}
                  </td>
                  <td className="px-6 py-4 flex justify-center items-center gap-4">
                    <button
                      onClick={() => {
                        setEditingProduct(product);
                        setEditName(product.productName);
                      }}
                      className="text-blue-600 hover:text-blue-800 transition-transform transform hover:scale-110"
                    >
                      <Pencil />
                    </button>
                    <button
                      onClick={() => removeProduct(product._id)}
                      className="text-red-600 hover:text-red-800 transition-transform transform hover:scale-110"
                    >
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-6 dark:text-gray-300">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      
      {isAddOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6 transform transition-transform duration-300 scale-95 opacity-0 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Product
              </h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="text-gray-400 hover:text-gray-700 dark:hover:text-white transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                  Product Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Type product name"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-transform transform hover:scale-105"
                >
                  Choose Image
                </button>
                <span className="text-gray-600 dark:text-gray-300">
                  {image ? image.name : "No file selected"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-transform transform hover:-translate-y-0.5 hover:scale-105"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6 transform transition-transform duration-300 scale-95 opacity-0 animate-fadeIn">
            <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              Edit Product
            </h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("editImageInput").click()
                  }
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-transform transform hover:scale-105"
                >
                  Choose Image
                </button>
                <span className="text-gray-600 dark:text-gray-300">
                  {editImage ? editImage.name : "No file selected"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  id="editImageInput"
                  className="hidden"
                  onChange={(e) => setEditImage(e.target.files[0])}
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 bg-gray-400 rounded text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-transform transform hover:-translate-y-0.5 hover:scale-105"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Fade-in animation */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Product;
