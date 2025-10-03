import { Trash2, Pencil } from "lucide-react";

export default function ProductRow({ product, index, setEditingProduct, setProductToDelete }) {
    return (
        <tr
            className={`${index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"
                } hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300`}
        >
            <td className="px-6 py-4 text-center">
                <img
                    src={product.image}
                    alt={product.productName}
                    className="w-20 h-20 object-cover rounded transition-transform duration-300 hover:scale-105 mx-auto"
                />
            </td>
            <td className="px-6 py-4 font-semibold dark:text-white text-center">
                {product.productName}
            </td>
            <td className="px-6 py-4">
                <div className="flex justify-center items-center gap-6">
                    <button
                        onClick={() => setEditingProduct(product)}
                        className="text-blue-600 hover:text-blue-800 transition-transform transform hover:scale-110"
                    >
                        <Pencil className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setProductToDelete(product)}
                        className="text-red-600 hover:text-red-800 transition-transform transform hover:scale-110"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </td>
        </tr>
    );
}
