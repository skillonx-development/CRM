import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import Sidebar from "./Shared/Sidebar";
import CollegeList from "./CollegeList";
import SchoolList from "./SchoolList";
import InstitutionModal from "./InstitutionModal";
import { indianStates } from "../../../data/indianStates.js";

const initialInstitution = {
    name: "",
    principal: "",
    email: "",
    collegeType: "engineering",
    placementOfficer: "",
    placementEmail: "",
    branches: [],
    contact: [""],
    address: "",
};

const initialSchool = {
    name: "",
    principal: "",
    email: "",
    contact: [""],
    address: "",
};

const ManageData = () => {
    const [activeTab, setActiveTab] = useState("college");
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [category, setCategory] = useState("college");
    const [collegeType, setCollegeType] = useState("engineering");
    const [institution, setInstitution] = useState(initialInstitution);
    const [school, setSchool] = useState(initialSchool);
    const [colleges, setColleges] = useState([]);
    const [schools, setSchools] = useState([]);
    const [branchesInput, setBranchesInput] = useState("");
    const [collapsed, setCollapsed] = useState(false);
    const [states] = useState(indianStates);
    const [districts, setDistricts] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");

    console.log(selectedState)
    // Fetch districts when state changes
    useEffect(() => {
        const fetchDistricts = async () => {
            if (selectedState) {
                try {
                    const res = await fetch(`/api/districts/${selectedState}`);
                    const data = await res.json();
                    console.log(data)
                    // Convert district_id to string for consistency in select
                    const normalizedDistricts = (data.districts || []).map(district => ({
                        ...district,
                        district_id: String(district.district_id)
                    }));
                    setDistricts(normalizedDistricts);
                } catch (err) {
                    console.error("Failed to fetch districts:", err);
                    setDistricts([]);
                }
            } else {
                setDistricts([]);
            }
        };
        fetchDistricts();
    }, [selectedState]);

    // Filtered list for search
    const filteredColleges = colleges.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );
    const filteredSchools = schools.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddContact = (type) => {
        if (type === "college") {
            setInstitution({ ...institution, contact: [...institution.contact, ""] });
        } else {
            setSchool({ ...school, contact: [...school.contact, ""] });
        }
    };

    const handleContactChange = (type, idx, value) => {
        if (type === "college") {
            const updated = [...institution.contact];
            updated[idx] = value;
            setInstitution({ ...institution, contact: updated });
        } else {
            const updated = [...school.contact];
            updated[idx] = value;
            setSchool({ ...school, contact: updated });
        }
    };

    const handleAddBranch = () => {
        if (branchesInput.trim()) {
            setInstitution({
                ...institution,
                branches: [...institution.branches, branchesInput.trim()],
            });
            setBranchesInput("");
        }
    };

    const handleRemoveBranch = (idx) => {
        setInstitution({
            ...institution,
            branches: institution.branches.filter((_, i) => i !== idx),
        });
    };

    const handleModalOpen = () => {
        setShowModal(true);
        setCategory("college");
        setCollegeType("engineering");
        setInstitution(initialInstitution);
        setSchool(initialSchool);
        setBranchesInput("");
    };

    const handleModalClose = () => setShowModal(false);

    const handleInstitutionChange = (e) => {
        setInstitution({ ...institution, [e.target.name]: e.target.value });
    };

    const handleSchoolChange = (e) => {
        setSchool({ ...school, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (category === "college") {
            setColleges([...colleges, { ...institution, collegeType }]);
        } else {
            setSchools([...schools, { ...school }]);
        }
        setShowModal(false);
    };

    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar setActiveTab={setActiveTab} collapsed={collapsed} setCollapsed={setCollapsed} />
            <main
                className={`flex-1 transition-all duration-300 ${collapsed ? "ml-[80px]" : "ml-[256px]"} p-6 md:p-8`}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Manage Data</h2>
                    <button
                        className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-dark transition"
                        onClick={handleModalOpen}
                    >
                        <Plus size={18} /> Add New Institution
                    </button>
                </div>
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search institution..."
                        className="w-full px-4 py-2 rounded-lg bg-background-card text-white border border-border-dark focus:outline-none focus:ring-2 focus:ring-primary"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-4 mb-4">
                    <button
                        className={`px-4 py-2 rounded-lg font-semibold transition ${activeTab === "college" ? "bg-primary text-white" : "bg-background-card text-text-muted hover:bg-background-hover"}`}
                        onClick={() => setActiveTab("college")}
                    >
                        Colleges
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg font-semibold transition ${activeTab === "school" ? "bg-primary text-white" : "bg-background-card text-text-muted hover:bg-background-hover"}`}
                        onClick={() => setActiveTab("school")}
                    >
                        Schools
                    </button>
                </div>
                <div className="bg-background-card rounded-lg p-6 min-h-[300px]">
                    {activeTab === "college" ? (
                        <CollegeList colleges={filteredColleges} />
                    ) : (
                        <SchoolList schools={filteredSchools} />
                    )}
                </div>
                {/* Modal */}
                <InstitutionModal
                    showModal={showModal}
                    handleModalClose={handleModalClose}
                    category={category}
                    setCategory={setCategory}
                    collegeType={collegeType}
                    setCollegeType={setCollegeType}
                    institution={institution}
                    setInstitution={setInstitution}
                    school={school}
                    setSchool={setSchool}
                    branchesInput={branchesInput}
                    setBranchesInput={setBranchesInput}
                    handleAddBranch={handleAddBranch}
                    handleRemoveBranch={handleRemoveBranch}
                    handleAddContact={handleAddContact}
                    handleContactChange={handleContactChange}
                    handleInstitutionChange={handleInstitutionChange}
                    handleSchoolChange={handleSchoolChange}
                    handleSubmit={handleSubmit}
                    states={states}
                    districts={districts}
                    selectedState={selectedState}
                    setSelectedState={setSelectedState}
                    selectedDistrict={selectedDistrict}
                    setSelectedDistrict={setSelectedDistrict}
                />
            </main>
        </div>
    );
};

export default ManageData;
