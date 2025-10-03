import ProductRow from './ProductRow';

export default function ProductTable({ products, setEditingProduct, setProductToDelete }) {
    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="w-full text-gray-600 dark:text-gray-300 border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 uppercase text-sm">
                    <tr>
                        <th className="px-6 py-3 text-center">Image</th>
                        <th className="px-6 py-3 text-center">Product</th>
                        <th className="px-6 py-3 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <ProductRow
                                key={product._id}
                                product={product}
                                index={index}
                                setEditingProduct={setEditingProduct}
                                setProductToDelete={setProductToDelete}
                            />
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
    );
}
