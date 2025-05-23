import React from "react";

const CollegeList = ({ colleges }) => (
    <ul className="space-y-4">
        {colleges.length === 0 ? (
            <li className="text-text-muted">No colleges found.</li>
        ) : (
            colleges.map((c, idx) => (
                <li key={idx} className="p-4 bg-background-hover rounded-lg flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="font-bold text-white text-lg">{c.name}</div>
                        <div className="text-text-muted text-sm">Principal: {c.principal}</div>
                        <div className="text-text-muted text-sm">Type: {c.collegeType}</div>
                    </div>
                    <div className="text-text-muted text-sm mt-2 md:mt-0">{c.address}</div>
                </li>
            ))
        )}
    </ul>
);

export default CollegeList;
