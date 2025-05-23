import React from "react";

const SchoolList = ({ schools }) => (
    <ul className="space-y-4">
        {schools.length === 0 ? (
            <li className="text-text-muted">No schools found.</li>
        ) : (
            schools.map((s, idx) => (
                <li key={idx} className="p-4 bg-background-hover rounded-lg flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="font-bold text-white text-lg">{s.name}</div>
                        <div className="text-text-muted text-sm">Principal: {s.principal}</div>
                    </div>
                    <div className="text-text-muted text-sm mt-2 md:mt-0">{s.address}</div>
                </li>
            ))
        )}
    </ul>
);

export default SchoolList;
