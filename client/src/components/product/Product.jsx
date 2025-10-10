import { useEffect, useState } from "react";
import api from '../../api/Axios';
import Pagination from '../Pagination';
import ProductTable from './ProductTable';
import ProductModals from './ProductModals';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  const fetchData = async () => {
    try {
      const res = await api.get("/products/");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const filterProducts = products.filter(p =>
    p.productName.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filterProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filterProducts.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white w-48"
        />
        <button
          onClick={() => setIsAddOpen(true)}
          className="ml-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 font-semibold transition-transform transform hover:-translate-y-0.5 hover:scale-105"
        >
          <span className="text-xl font-bold">+</span> Add Product
        </button>
      </div>

      <ProductTable
        products={currentProducts}
        setEditingProduct={setEditingProduct}
        setProductToDelete={setProductToDelete}
      />

      {filterProducts.length > productsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <ProductModals
        isAddOpen={isAddOpen}
        setIsAddOpen={setIsAddOpen}
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
        productToDelete={productToDelete}
        setProductToDelete={setProductToDelete}
        fetchData={fetchData}
      />
    </div>
  );
};

export default Product;
