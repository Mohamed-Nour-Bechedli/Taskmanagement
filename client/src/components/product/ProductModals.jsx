import { useState, useRef } from "react";
import api from '../../api/Axios';
import { toast } from "react-toastify";

export default function ProductModals({
    isAddOpen,
    setIsAddOpen,
    editingProduct,
    setEditingProduct,
    productToDelete,
    setProductToDelete,
    fetchData,
}) {
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [editName, setEditName] = useState(editingProduct?.productName || "");
    const [editImage, setEditImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("productName", name);
            if (image) formData.append("image", image);

            await api.post("/products/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setName(""); setImage(null); setIsAddOpen(false);
            fetchData(); toast.success("Product added successfully!");
        } catch (err) {
            console.error(err); toast.error("Failed to add product");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editingProduct) return;
        try {
            const formData = new FormData();
            formData.append("productName", editName);
            if (editImage) formData.append("image", editImage);

            await api.put(`/products/${editingProduct._id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setEditingProduct(null); setEditName(""); setEditImage(null);
            fetchData(); toast.success("Product updated");
        } catch (err) {
            console.error(err); toast.error("Failed to update product");
        }
    };

    const confirmDelete = async () => {
        if (!productToDelete) return;
        try {
            await api.delete(`/products/${productToDelete._id}`);
            fetchData(); setProductToDelete(null);
            toast.info("Product deleted successfully");
        } catch (err) {
            console.error(err); toast.error("Failed to delete product");
        }
    };

    return (
        <>
            {/* Add Modal */}
            {isAddOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                            Create New Product
                        </h3>
                        <form onSubmit={handleAddProduct} className="space-y-4">
                            <input
                                type="text" value={name} onChange={(e) => setName(e.target.value)}
                                placeholder="Product name"
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            />
                            <div className="flex items-center gap-3">
                                <button type="button" onClick={() => fileInputRef.current.click()}
                                    className="px-4 py-2 bg-blue-600 text-white rounded">Choose Image</button>
                                <span>{image ? image.name : "No file selected"}</span>
                                <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => setImage(e.target.files[0])} />
                            </div>
                            <button type="submit" className="w-full py-2 bg-green-600 text-white rounded">Add Product</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editingProduct && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Edit Product</h3>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <input
                                type="text" value={editName} onChange={(e) => setEditName(e.target.value)}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                            <div className="flex items-center gap-3">
                                <button type="button" onClick={() => document.getElementById("editImageInput").click()}
                                    className="px-4 py-2 bg-blue-600 text-white rounded">Choose Image</button>
                                <span>{editImage ? editImage.name : "No file selected"}</span>
                                <input type="file" id="editImageInput" className="hidden" onChange={(e) => setEditImage(e.target.files[0])} />
                            </div>
                            <div className="flex justify-end gap-3">
                                <button type="button" onClick={() => setEditingProduct(null)} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {productToDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-sm p-6">
                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Delete Product</h3>
                        <p className="mb-4 dark:text-gray-300">
                            Are you sure you want to delete <strong>{productToDelete.productName}</strong>?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setProductToDelete(null)} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
                            <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
