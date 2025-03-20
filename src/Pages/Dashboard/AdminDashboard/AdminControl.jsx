import React from 'react';
import AccessControl from './Widgets/AccessControl'; // Ensure this path is correct
import Layout from './Shared/Layout'; // Adjusted import path for Layout if necessary

const AdminControl = () => {
    return (
        <Layout>
            {/* Widgets Section */}
            <div className="p-4 bg-gray-900 min-h-screen"> {/* Added background and min-height */}
                <AccessControl />
            </div>
        </Layout>
    );
};

export default AdminControl;