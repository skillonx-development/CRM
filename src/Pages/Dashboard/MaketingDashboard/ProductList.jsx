import React from "react"; 
import Layout from "./Shared/Layout";
import ProductListHeader from "./Widgets/ProductListHeader";  // Import the header component
import ProductTable from "./Widgets/ProductTable";  // Import the table component

const ProductList = () => {
  return (
    <Layout>
      {/* Widgets Section */}
      <div className="p-6 space-y-6">
        {/* Product List Header */}
        <ProductListHeader />

        {/* Product Table */}
        <ProductTable />
      </div>
    </Layout>
  );
};

export default ProductList;
