import { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa"; // Importing icons

export default function ProductList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([
    { id: "#1523", name: "KF", category: "IoT", quality: "High", chips: "NIT", progress: 80 },
    { id: "#1531", name: "Crypto", category: "IT Card", quality: "Medium", chips: "Alfred", progress: 30 },
    { id: "#1540", name: "IoT", category: "Digital", quality: "High", chips: "NIT", progress: 0 },
    { id: "#1547", name: "Digital", category: "Fin", quality: "Low", chips: "NITS", progress: 0 },
    { id: "#1552", name: "AI", category: "Fin", quality: "High", chips: "ATMC", progress: 60 },
    { id: "#1563", name: "Light", category: "Medium", quality: "Medium", chips: "Trade", progress: 90 },
    { id: "#1578", name: "Havatek", category: "Medium", quality: "Medium", chips: "LianMin", progress: 80 },
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    quality: "Medium",
    chips: "",
    progress: 0
  });

  // Handle search
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle product deletion
  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  // Handle form input
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Handle adding new product
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.chips) return;

    setProducts([
      ...products,
      { id: `#${products.length + 1523}`, ...newProduct }
    ]);

    setShowForm(false);
    setNewProduct({ name: "", category: "", quality: "Medium", chips: "", progress: 0 });
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search for product..."
          className="p-2 rounded-md bg-background-card text-white placeholder-gray-400 border border-border-dark w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-purple-700 transition"
          onClick={() => setShowForm(true)}
        >
          <FaPlus size={14} />
          <span>Add Product</span>
        </button>
      </div>

      {/* Product Table */}
      <div className="bg-background-card rounded-lg p-4 shadow-md">
        <table className="w-full">
          <thead>
            <tr className="text-white border-b border-border-dark">
              <th className="py-2 px-4 text-left">Product Name</th>
              <th className="py-2 px-4 text-left">Category</th>
              <th className="py-2 px-4 text-left">Quality</th>
              <th className="py-2 px-4 text-left">Chips</th>
              <th className="py-2 px-4 text-left">Progress</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-text-muted py-4">
                  No products found
                </td>
              </tr>
            ) : (
              filteredProducts.map((product, index) => (
                <tr key={index} className="border-b border-border-dark text-white">
                  <td className="py-2 px-4">{product.id}</td>
                  <td className="py-2 px-4">{product.category}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-md ${
                        product.quality === "High" ? "bg-green-500" :
                        product.quality === "Medium" ? "bg-yellow-500" :
                        "bg-red-500"
                      }`}
                    >
                      {product.quality}
                    </span>
                  </td>
                  <td className="py-2 px-4">{product.chips}</td>
                  <td className="py-2 px-4">
                    <div className="w-full bg-gray-700 rounded-full h-2 relative">
                      <div
                        className="h-2 bg-blue-500 rounded-full"
                        style={{ width: `${product.progress}%` }}
                      ></div>
                      <span className="absolute right-0 top-0 text-xs text-white">
                        {product.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="py-2 px-4 flex items-center space-x-4">
                    <button className="text-white hover:text-gray-300">
                      <FaEdit size={18} />
                    </button>
                    <button className="text-red-400 hover:text-red-600" onClick={() => handleDelete(product.id)}>
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-background-card p-6 rounded-lg w-96 text-white">
            <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              className="w-full p-2 mb-2 rounded-md bg-gray-800 border border-gray-600 text-white"
              value={newProduct.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              className="w-full p-2 mb-2 rounded-md bg-gray-800 border border-gray-600 text-white"
              value={newProduct.category}
              onChange={handleChange}
            />
            <select
              name="quality"
              className="w-full p-2 mb-2 rounded-md bg-gray-800 border border-gray-600 text-white"
              value={newProduct.quality}
              onChange={handleChange}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <input
              type="text"
              name="chips"
              placeholder="Chips"
              className="w-full p-2 mb-2 rounded-md bg-gray-800 border border-gray-600 text-white"
              value={newProduct.chips}
              onChange={handleChange}
            />
            <button
              className="bg-green-500 px-4 py-2 rounded-md w-full hover:bg-green-700 transition"
              onClick={handleAddProduct}
            >
              Add Product
            </button>
            <button
              className="mt-2 w-full text-center text-red-400 hover:text-red-600"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
