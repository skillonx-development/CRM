import React from "react";

const ProductListHeader = () => {
  return (
    <div className="flex items-center justify-between bg-background-card p-4 rounded-lg shadow-card">
      {/* Title */}
      <h2 className="text-white text-lg font-semibold">Product List</h2>

      {/* Search Input */}
      <div className="relative w-1/3">
        <input
          type="text"
          placeholder="Search for product..."
          className="w-full p-2 pl-10 text-text-muted bg-transparent border border-border-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light"
        />
        <span className="absolute left-3 top-2.5 text-text-muted">
          🔍
        </span>
      </div>

      {/* Add Product Button */}
      <button className="bg-primary px-4 py-2 text-white font-medium rounded-md hover:bg-primary-dark transition">
        Add New Product
      </button>
    </div>
  );
};

export default ProductListHeader;
