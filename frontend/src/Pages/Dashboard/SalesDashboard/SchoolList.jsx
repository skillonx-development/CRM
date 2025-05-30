import React from "react";
import { Edit, Trash2 } from "lucide-react";

const SchoolList = ({ schools, onEdit, onDelete }) => {
  if (!schools || schools.length === 0) {
    return (
      <div className="text-center text-text-muted py-8">
        <p>No schools found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {schools.map((school) => (
        <div
          key={school._id}
          className="bg-background border border-border-dark rounded-lg p-4 hover:border-primary transition-colors"
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold text-white truncate pr-2">
              {school.name}
            </h3>
            <div className="flex gap-1 flex-shrink-0">
              <button
                onClick={() => onEdit(school)}
                className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                title="Edit School"
              >
                <Edit size={14} />
              </button>
              <button
                onClick={() => onDelete(school._id)}
                className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                title="Delete School"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
          
          <div className="space-y-2 text-sm text-text-muted">
            {school.principal && (
              <p>
                <span className="font-medium">Principal:</span> {school.principal}
              </p>
            )}
            
            {school.email && (
              <p>
                <span className="font-medium">Email:</span> {school.email}
              </p>
            )}
            
            {school.stateName && (
              <p>
                <span className="font-medium">State:</span> {school.stateName}
              </p>
            )}
            
            {school.district && (
              <p>
                <span className="font-medium">District:</span> {school.district}
              </p>
            )}
            
            {school.contact && school.contact.length > 0 && (
              <p>
                <span className="font-medium">Contact:</span>{" "}
                {school.contact.filter(c => c.trim()).join(", ")}
              </p>
            )}
            
            {school.address && (
              <p className="text-xs">
                <span className="font-medium">Address:</span> {school.address}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SchoolList;