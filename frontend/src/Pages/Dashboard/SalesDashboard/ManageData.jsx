import React, { useState, useEffect } from "react";
import { Plus, CheckCircle, AlertCircle, X, Search, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Sidebar from "./Shared/Sidebar";
import CollegeList from "./CollegeList";
import SchoolList from "./SchoolList";
import InstitutionModal from "./InstitutionModal";


// Toast Component
const Toast = ({ message, type, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      className={`fixed top-4 right-4 z-[9999] px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 max-w-md ${type === 'success'
        ? 'bg-green-600 text-white'
        : 'bg-red-600 text-white'
        }`}
    >
      {type === 'success' ? (
        <CheckCircle size={20} />
      ) : (
        <AlertCircle size={20} />
      )}
      <span className="flex-1">{message}</span>
      <button
        onClick={onClose}
        className="text-white hover:text-gray-200 transition-colors"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
};

// Toast Hook
const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    const toast = { id, message, type };

    setToasts(prev => [...prev, toast]);

    // Auto remove after 4 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return { toasts, showToast, removeToast };
};

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
  tier: "",
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
  const [placeSearch, setPlaceSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState("college");
  const [collegeType, setCollegeType] = useState("engineering");
  const [institution, setInstitution] = useState(initialInstitution);
  const [school, setSchool] = useState(initialSchool);
  const [colleges, setColleges] = useState([]);
  const [schools, setSchools] = useState([]);
  const [branchesInput, setBranchesInput] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loadingInstitutions, setLoadingInstitutions] = useState(false);

  // Toast hook
  const { toasts, showToast, removeToast } = useToast();

  const fetchInstitutions = useCallback(async () => {
    setLoadingInstitutions(true);
    try {
      const [collegesRes, schoolsRes] = await Promise.all([
        axios.get("http://localhost:5001/api/institution"),
        axios.get("http://localhost:5001/api/institution")
      ]);
      setColleges(collegesRes.data.data.colleges || []);
      setSchools(schoolsRes.data.data.schools || []);
    } catch (error) {
      showToast("Failed to fetch institutions", "error");
    } finally {
      setLoadingInstitutions(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchInstitutions();
  }, [fetchInstitutions]);

  // Fetch states from backend
  useEffect(() => {
    const fetchStates = async () => {
      setLoadingInstitutions(true);
      try {
        const res = await fetch('http://localhost:5001/api/location/states');
        const data = await res.json();
        setStates(data.states || []);
      } catch {
        showToast('Failed to fetch states', 'error');
        setStates([]);
      } finally {
        setLoadingInstitutions(false);
      }
    };
    fetchStates();
  }, [showToast]);

  // Fetch districts when state changes
  useEffect(() => {
    const fetchDistricts = async () => {
      setLoadingInstitutions(true);
      if (selectedState) {
        try {
          const res = await fetch(`http://localhost:5001/api/location/districts/${selectedState}`);
          const data = await res.json();
          setDistricts(data.districts || []);
        } catch {
          showToast('Failed to fetch districts', 'error');
          setDistricts([]);
        } finally {
          setLoadingInstitutions(false);
        }
      } else {
        setDistricts([]);
        setLoadingInstitutions(false);
      }
    };
    fetchDistricts();
  }, [selectedState, showToast]);

  // Enhanced filtering logic
  const applyFilters = (items) => {
    return items.filter((item) => {
      // Name search
      const matchesName = item.name.toLowerCase().includes(search.toLowerCase());

      // Place search (state, district, address)
      const matchesPlace = placeSearch === "" ||
        (item.stateName && item.stateName.toLowerCase().includes(placeSearch.toLowerCase())) ||
        (item.district && item.district.toLowerCase().includes(placeSearch.toLowerCase())) ||
        (item.address && item.address.toLowerCase().includes(placeSearch.toLowerCase()));

      // Tier filter (only for colleges)
      const matchesTier = tierFilter === "" ||
        (activeTab === "college" && item.tier === tierFilter) ||
        activeTab === "school"; // Always pass for schools

      return matchesName && matchesPlace && matchesTier;
    });
  };

  const filteredColleges = applyFilters(colleges);
  const filteredSchools = applyFilters(schools);

  // Clear all filters
  const clearAllFilters = () => {
    setSearch("");
    setPlaceSearch("");
    setTierFilter("");
  };

  // Check if any filters are active
  const hasActiveFilters = search || placeSearch || tierFilter;

  const handleAddContact = (type) => {
    const update =
      type === "college"
        ? { ...institution, contact: [...institution.contact, ""] }
        : { ...school, contact: [...school.contact, ""] };
    type === "college" ? setInstitution(update) : setSchool(update);
  };

  const handleContactChange = (type, idx, value) => {
    const updated =
      type === "college" ? [...institution.contact] : [...school.contact];
    updated[idx] = value;
    type === "college"
      ? setInstitution({ ...institution, contact: updated })
      : setSchool({ ...school, contact: updated });
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
    setIsEditing(false);
    setShowModal(true);
    setCategory("college");
    setCollegeType("engineering");
    setInstitution(initialInstitution);
    setSchool(initialSchool);
    setBranchesInput("");
    setSelectedState("");
    setSelectedDistrict("");
  };

  const handleModalClose = () => setShowModal(false);

  const handleInstitutionChange = (e) => {
    setInstitution({ ...institution, [e.target.name]: e.target.value });
  };

  const handleSchoolChange = (e) => {
    setSchool({ ...school, [e.target.name]: e.target.value });
  };

  const handleEdit = (data, type) => {
    setIsEditing(true);
    if (type === "college") {
      setCategory("college");
      setCollegeType(data.type || "engineering");
      setInstitution({
        _id: data._id,
        name: data.name || "",
        principal: data.principal || "",
        email: data.email || "",
        placementOfficer: data.placementOfficer || "",
        placementEmail: data.placementEmail || "",
        contact: data.contact || [""],
        branches: data.branches || [],
        address: data.address || "",
        tier: data.tier || "",
      });
    } else {
      setCategory("school");
      setSchool({
        _id: data._id,
        name: data.name || "",
        principal: data.principal || "",
        email: data.email || "",
        contact: data.contact || [""],
        address: data.address || "",
      });
    }

    // Set the state ID for fetching districts
    setSelectedState(data.stateId || "");
    setSelectedDistrict(data.district || "");
    setShowModal(true);
  };

  const handleDelete = async (id, type) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      try {
        await axios.delete(`http://localhost:5001/api/institution/${id}?type=${type}`);

        showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`, "success");

        await fetchInstitutions();
      } catch {
        showToast(`Failed to delete ${type}. Please try again.`, "error");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (category === "college") {
        const cleanedContacts = institution.contact.filter((c) => c.trim() !== "");
        const cleanedBranches = institution.branches.filter((b) => b.trim() !== "");

        if (!institution.name.trim()) {
          showToast("Please enter the college name", "error");
          return;
        }
        if (!institution.principal.trim()) {
          showToast("Please enter the principal name", "error");
          return;
        }
        if (!institution.email.trim()) {
          showToast("Please enter the email address", "error");
          return;
        }

        const newCollege = {
          ...institution,
          type: collegeType,
          contact: cleanedContacts,
          branches: cleanedBranches,
          stateId: selectedState, // Store the state ID
          stateName: states.find((s) => s.state_id === selectedState)?.state_name || "",
          district: selectedDistrict,
        };

        if (institution._id) {
          await axios.put(`http://localhost:5001/api/institution/${institution._id}`, {
            category: "college",
            data: newCollege,
          });
          showToast(`College "${institution.name}" updated successfully!`, "success");
        } else {
          await axios.post("http://localhost:5001/api/institution/create", {
            category: "college",
            data: newCollege,
          });
          showToast(`College "${institution.name}" created successfully!`, "success");
        }

        await fetchInstitutions();
      } else {
        const cleanedContacts = school.contact.filter((c) => c.trim() !== "");

        if (!school.name.trim()) {
          showToast("Please enter the school name", "error");
          return;
        }
        if (!school.principal.trim()) {
          showToast("Please enter the principal name", "error");
          return;
        }
        if (!school.email.trim()) {
          showToast("Please enter the email address", "error");
          return;
        }

        const newSchool = {
          ...school,
          contact: cleanedContacts,
          stateId: selectedState, // Store the state ID
          stateName: states.find((s) => s.state_id === selectedState)?.state_name || "",
          district: selectedDistrict,
        };

        if (school._id) {
          await axios.put(`http://localhost:5001/api/institution/${school._id}`, {
            category: "school",
            data: newSchool,
          });
          showToast(`School "${school.name}" updated successfully!`, "success");
        } else {
          await axios.post("http://localhost:5001/api/institution/create", {
            category: "school",
            data: newSchool,
          });
          showToast(`School "${school.name}" created successfully!`, "success");
        }

        await fetchInstitutions();
      }

      setShowModal(false);
    } catch (err) {
      console.error("Server error:", err.response?.data || err);
      const errorMessage = err.response?.data?.message || "An error occurred while saving the institution";
      showToast(errorMessage, "error");
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Toast Container */}
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>

      <Sidebar setActiveTab={setActiveTab} collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className={`flex-1 transition-all duration-300 ${collapsed ? "ml-[80px]" : "ml-[256px]"} p-6 md:p-8`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Manage Data</h2>
          <button
            className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-dark transition"
            onClick={handleModalOpen}
          >
            <Plus size={18} /> Add New Institution
          </button>
        </div>

        {/* Enhanced Search and Filter Section */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted h-5 w-5" />
            <input
              type="text"
              placeholder="Search by institution name..."
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-background-card text-white border border-border-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filter Toggle Button */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background-card text-text-muted hover:bg-background-hover transition border border-border-dark"
            >
              <Filter size={16} />
              Advanced Filters
              {hasActiveFilters && (
                <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                  Active
                </span>
              )}
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-text-muted hover:text-white transition text-sm"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-background-card rounded-lg border border-border-dark p-4 space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Place Search */}
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">
                      Search by Location
                    </label>
                    <input
                      type="text"
                      placeholder="State, district, or address..."
                      className="w-full px-3 py-2 rounded-lg bg-background text-white border border-border-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={placeSearch}
                      onChange={(e) => setPlaceSearch(e.target.value)}
                    />
                  </div>

                  {/* Tier Filter - Only for Colleges */}
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">
                      Filter by Tier
                      {activeTab === "school" && (
                        <span className="text-xs text-yellow-500 ml-2">(Disabled for Schools)</span>
                      )}
                    </label>
                    <select
                      className="w-full px-3 py-2 rounded-lg bg-background text-white border border-border-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      value={tierFilter}
                      onChange={(e) => setTierFilter(e.target.value)}
                      disabled={activeTab === "school"}
                    >
                      <option value="">All Tiers</option>
                      <option value="tier1">Tier 1</option>
                      <option value="tier2">Tier 2</option>
                      <option value="tier3">Tier 3</option>
                    </select>
                  </div>
                </div>

                {/* Filter Summary */}
                {hasActiveFilters && (
                  <div className="pt-2 border-t border-border-dark">
                    <div className="flex flex-wrap gap-2">
                      {search && (
                        <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
                          Name: "{search}"
                        </span>
                      )}
                      {placeSearch && (
                        <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
                          Location: "{placeSearch}"
                        </span>
                      )}
                      {tierFilter && activeTab === "college" && (
                        <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
                          Tier: {tierFilter.charAt(0).toUpperCase() + tierFilter.slice(1)}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded-lg font-semibold transition ${activeTab === "college"
              ? "bg-primary text-white"
              : "bg-background-card text-text-muted hover:bg-background-hover"
              }`}
            onClick={() => {
              setActiveTab("college");
              if (tierFilter && activeTab === "school") {
                // Keep tier filter when switching to colleges
              }
            }}
          >
            Colleges ({filteredColleges.length})
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-semibold transition ${activeTab === "school"
              ? "bg-primary text-white"
              : "bg-background-card text-text-muted hover:bg-background-hover"
              }`}
            onClick={() => {
              setActiveTab("school");
              // Clear tier filter when switching to schools since it doesn't apply
            }}
          >
            Schools ({filteredSchools.length})
          </button>
        </div>

        {/* Results Section */}
        <div className="bg-background-card rounded-lg p-6 min-h-[300px]">
          {activeTab === "college" ? (
            <>
              {loadingInstitutions ? (
                <div className="text-center py-12 text-text-muted">Loading colleges...</div>
              ) : filteredColleges.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-text-muted text-lg mb-2">
                    {hasActiveFilters
                      ? "No colleges match your search criteria"
                      : "No colleges found"
                    }
                  </div>
                  {hasActiveFilters && (
                    <button
                      onClick={clearAllFilters}
                      className="text-primary hover:text-primary-light transition"
                    >
                      Clear filters to see all colleges
                    </button>
                  )}
                </div>
              ) : (
                <CollegeList
                  colleges={filteredColleges}
                  onEdit={(college) => handleEdit(college, "college")}
                  onDelete={(id) => handleDelete(id, "college")}
                />
              )}
            </>
          ) : (
            <>
              {loadingInstitutions ? (
                <div className="text-center py-12 text-text-muted">Loading schools...</div>
              ) : filteredSchools.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-text-muted text-lg mb-2">
                    {hasActiveFilters
                      ? "No schools match your search criteria"
                      : "No schools found"
                    }
                  </div>
                  {hasActiveFilters && (
                    <button
                      onClick={clearAllFilters}
                      className="text-primary hover:text-primary-light transition"
                    >
                      Clear filters to see all schools
                    </button>
                  )}
                </div>
              ) : (
                <SchoolList
                  schools={filteredSchools}
                  onEdit={(school) => handleEdit(school, "school")}
                  onDelete={(id) => handleDelete(id, "school")}
                />
              )}
            </>
          )}
        </div>

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
          isEditing={isEditing}
        />
      </main>
    </div>
  );
};

export default ManageData;
