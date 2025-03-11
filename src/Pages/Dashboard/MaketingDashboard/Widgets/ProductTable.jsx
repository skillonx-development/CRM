import React from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

const ProductTable = () => {
  const products = [
    { id: "#1532", category: "IOT", quality: "High", college: "NIE", progress: "80%" },
    { id: "#1537", category: "ID Card", quality: "Medium", college: "MIT", progress: "20%" },
    { id: "#1539", category: "ID Card", quality: "Medium", college: "ATME", progress: "30%" },
    { id: "#1597", category: "Digital", quality: "Low", college: "NIE", progress: "0%" },
    { id: "#1507", category: "IOT", quality: "High", college: "ATME", progress: "80%" },
    { id: "#1837", category: "Digital", quality: "High", college: "ATME", progress: "60%" },
    { id: "#1537", category: "Digital", quality: "Medium", college: "NIE", progress: "50%" },
    { id: "#1737", category: "Light", quality: "Medium", college: "Twitch", progress: "30%" },
    { id: "#1580", category: "Network", quality: "Medium", college: "LinkedIn", progress: "60%" },
  ];

  // Function to get the color for quality indicator
  const getQualityColor = (quality) => {
    switch (quality) {
      case "High":
        return "text-red-500"; // Red for High
      case "Medium":
        return "text-yellow-400"; // Yellow for Medium
      case "Low":
        return "text-green-500"; // Green for Low
      default:
        return "text-gray-400"; // Default Gray
    }
  };

  return (
    <div className="bg-background-card p-6 rounded-lg shadow-card">
      <table className="w-full text-left text-white">
        <thead>
          <tr className="border-b border-border-dark text-gray-400">
            <th className="p-3">Product Name</th>
            <th className="p-3">Category</th>
            <th className="p-3">Quality</th>
            <th className="p-3">College</th>
            <th className="p-3">Progress</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="border-b border-border-dark">
              <td className="p-3">{product.id}</td>
              <td className="p-3">{product.category}</td>
              <td className="p-3 flex items-center space-x-2">
                <span className={`text-lg ${getQualityColor(product.quality)}`}>●</span>
                <span className="text-white">{product.quality}</span> {/* White text */}
              </td>
              <td className="p-3">{product.college}</td>
              <td className="p-3">{product.progress}</td>
              <td className="p-3 flex justify-center space-x-4">
                <FaPencilAlt className="text-gray-400 cursor-pointer hover:text-gray-300" />
                <FaTrash className="text-gray-400 cursor-pointer hover:text-gray-300" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Footer */}
      <div className="flex justify-between items-center mt-4 text-gray-400">
        <span className="text-sm">1 - 10 of 460</span>
        <div className="flex items-center space-x-4">
          <span className="text-sm">Rows per page:</span>
          <select className="bg-transparent border border-gray-600 p-1 rounded text-white">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <button className="text-gray-400 hover:text-white">←</button>
          <button className="text-gray-400 hover:text-white">→</button>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
