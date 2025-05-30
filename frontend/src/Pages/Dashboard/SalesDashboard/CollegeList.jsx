import { Edit, Trash2 } from "lucide-react";

const CollegeList = ({ colleges, onEdit, onDelete }) => {
  if (!colleges || colleges.length === 0) {
    return (
      <div className="text-center text-text-muted py-8">
        <p>No colleges found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {colleges.map((college) => (
        <div
          key={college._id}
          className="bg-background border border-border-dark rounded-lg p-4 hover:border-primary transition-colors"
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold text-white truncate pr-2">
              {college.name}
            </h3>
            <div className="flex gap-1 flex-shrink-0">
              <button
                onClick={() => onEdit(college)}
                className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                title="Edit College"
              >
                <Edit size={14} />
              </button>
              <button
                onClick={() => onDelete(college._id)}
                className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                title="Delete College"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
          
          <div className="space-y-2 text-sm text-text-muted">
            <p>
              <span className="font-medium">Type:</span>{" "}
              <span className="capitalize">{college.type}</span>
            </p>
            
            {college.principal && (
              <p>
                <span className="font-medium">Principal:</span> {college.principal}
              </p>
            )}
            
            {college.email && (
              <p>
                <span className="font-medium">Email:</span> {college.email}
              </p>
            )}
            
            {college.tier && (
              <p>
                <span className="font-medium">Tier:</span> {college.tier}
              </p>
            )}
            
            {college.placementOfficer && (
              <p>
                <span className="font-medium">Placement Officer:</span> {college.placementOfficer}
              </p>
            )}
            
            {college.stateName && (
              <p>
                <span className="font-medium">State:</span> {college.stateName}
              </p>
            )}
            
            {college.district && (
              <p>
                <span className="font-medium">District:</span> {college.district}
              </p>
            )}
            
            {college.contact && college.contact.length > 0 && (
              <p>
                <span className="font-medium">Contact:</span>{" "}
                {college.contact.filter(c => c.trim()).join(", ")}
              </p>
            )}
            
            {college.branches && college.branches.length > 0 && (
              <div>
                <span className="font-medium">Branches:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {college.branches.slice(0, 3).map((branch, idx) => (
                    <span
                      key={idx}
                      className="bg-primary/20 text-primary px-2 py-1 rounded text-xs"
                    >
                      {branch}
                    </span>
                  ))}
                  {college.branches.length > 3 && (
                    <span className="text-xs text-text-muted px-2 py-1">
                      +{college.branches.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}
            
            {college.address && (
              <p className="text-xs">
                <span className="font-medium">Address:</span> {college.address}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollegeList;