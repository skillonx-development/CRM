import React, { useState, useEffect, useCallback, useRef } from "react";
import { Plus, CheckCircle, AlertCircle, X, Search, Filter, Download, ExternalLink, Upload } from "lucide-react";
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

// CSV Import Modal Component
const CSVImportModal = ({ showModal, onClose, onImport, importType, setImportType }) => {
  const [csvFile, setCsvFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [importing, setImporting] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "text/csv" || file.name.endsWith('.csv')) {
        setCsvFile(file);
      } else {
        alert("Please upload a CSV file only");
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "text/csv" || file.name.endsWith('.csv')) {
        setCsvFile(file);
      } else {
        alert("Please upload a CSV file only");
        e.target.value = '';
      }
    }
  };

  const handleImport = async () => {
    if (!csvFile) {
      alert("Please select a CSV file");
      return;
    }

    setImporting(true);
    try {
      await onImport(csvFile, importType);
      setCsvFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      onClose();
    } catch (error) {
      console.error("Import failed:", error);
    } finally {
      setImporting(false);
    }
  };

  const resetModal = () => {
    setCsvFile(null);
    setImporting(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    if (!showModal) {
      resetModal();
    }
  }, [showModal]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-background-card rounded-lg p-6 w-full max-w-md border border-border-dark">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">Import CSV Data</h3>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Import Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-text-muted mb-2">
            Import Data As
          </label>
          <select
            value={importType}
            onChange={(e) => setImportType(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-background text-white border border-border-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="college">College Information</option>
            <option value="school">School Information</option>
          </select>
        </div>

        {/* File Upload Area */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-text-muted mb-2">
            Select CSV File
          </label>
          
          {/* Drag and Drop Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive
                ? 'border-primary bg-primary/10'
                : 'border-border-dark hover:border-primary/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-text-muted mb-4" />
            
            {csvFile ? (
              <div className="text-white">
                <p className="font-medium">{csvFile.name}</p>
                <p className="text-sm text-text-muted">
                  {(csvFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            ) : (
              <div>
                <p className="text-white mb-2">
                  Drag and drop your CSV file here, or
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-primary hover:text-primary-light transition-colors font-medium"
                >
                  browse to upload
                </button>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        {/* CSV Format Guidelines */}
        <div className="mb-6 p-4 bg-background rounded-lg border border-border-dark">
          <h4 className="text-sm font-medium text-white mb-2">CSV Format Guidelines:</h4>
          <div className="text-xs text-text-muted space-y-1">
            {importType === 'college' ? (
              <>
                <p>• Required columns: name, principal, email</p>
                <p>• Optional: website, placementOfficer, placementEmail, tier, address, contact, branches</p>
                <p>• Use semicolon (;) to separate multiple contacts or branches</p>
              </>
            ) : (
              <>
                <p>• Required columns: name, principal, email</p>
                <p>• Optional: website, address, contact</p>
                <p>• Use semicolon (;) to separate multiple contacts</p>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-border-dark text-text-muted rounded-lg hover:bg-background-hover transition"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={!csvFile || importing}
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {importing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Importing...
              </>
            ) : (
              <>
                <Upload size={16} />
                Import CSV
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const initialInstitution = {
  name: "",
  principal: "",
  email: "",
  website: "", // Added website field
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
  website: "", // Added website field
  contact: [""],
  address: "",
};

// Enhanced CollegeCard Component
const CollegeCard = ({ college, onEdit, onDelete }) => {
  return (
    <div className="bg-background border border-border-dark rounded-lg p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2">{college.name}</h3>
          {college.website && (
            <a
              href={college.website.startsWith('http') ? college.website : `https://${college.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors text-sm mb-2"
            >
              <ExternalLink size={14} />
              Visit Website
            </a>
          )}
          <div className="text-text-muted text-sm space-y-1">
            <p><span className="font-medium">Principal:</span> {college.principal}</p>
            <p><span className="font-medium">Email:</span> {college.email}</p>
            <p><span className="font-medium">Type:</span> {college.type || college.collegeType}</p>
            {college.tier && <p><span className="font-medium">Tier:</span> {college.tier}</p>}
            {college.placementOfficer && (
              <p><span className="font-medium">Placement Officer:</span> {college.placementOfficer}</p>
            )}
            {college.placementEmail && (
              <p><span className="font-medium">Placement Email:</span> {college.placementEmail}</p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(college)}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(college._id)}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition"
          >
            Delete
          </button>
        </div>
      </div>
      
      {college.branches && college.branches.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-text-muted mb-2">Branches:</p>
          <div className="flex flex-wrap gap-2">
            {college.branches.map((branch, idx) => (
              <span key={idx} className="bg-primary/20 text-primary px-2 py-1 rounded text-xs">
                {branch}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {college.contact && college.contact.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-text-muted mb-2">Contact:</p>
          <div className="space-y-1">
            {college.contact.map((contact, idx) => (
              <p key={idx} className="text-sm text-text-muted">{contact}</p>
            ))}
          </div>
        </div>
      )}
      
      {college.address && (
        <div>
          <p className="text-sm font-medium text-text-muted mb-1">Address:</p>
          <p className="text-sm text-text-muted">{college.address}</p>
          {college.stateName && (
            <p className="text-sm text-text-muted">
              {college.district && `${college.district}, `}{college.stateName}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

// Enhanced SchoolCard Component
const SchoolCard = ({ school, onEdit, onDelete }) => {
  return (
    <div className="bg-background border border-border-dark rounded-lg p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2">{school.name}</h3>
          {school.website && (
            <a
              href={school.website.startsWith('http') ? school.website : `https://${school.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors text-sm mb-2"
            >
              <ExternalLink size={14} />
              Visit Website
            </a>
          )}
          <div className="text-text-muted text-sm space-y-1">
            <p><span className="font-medium">Principal:</span> {school.principal}</p>
            <p><span className="font-medium">Email:</span> {school.email}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(school)}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(school._id)}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition"
          >
            Delete
          </button>
        </div>
      </div>
      
      {school.contact && school.contact.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-text-muted mb-2">Contact:</p>
          <div className="space-y-1">
            {school.contact.map((contact, idx) => (
              <p key={idx} className="text-sm text-text-muted">{contact}</p>
            ))}
          </div>
        </div>
      )}
      
      {school.address && (
        <div>
          <p className="text-sm font-medium text-text-muted mb-1">Address:</p>
          <p className="text-sm text-text-muted">{school.address}</p>
          {school.stateName && (
            <p className="text-sm text-text-muted">
              {school.district && `${school.district}, `}{school.stateName}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

// Enhanced CollegeList Component
const EnhancedCollegeList = ({ colleges, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {colleges.map((college) => (
        <CollegeCard key={college._id} college={college} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

// Enhanced SchoolList Component
const EnhancedSchoolList = ({ schools, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {schools.map((school) => (
        <SchoolCard key={school._id} school={school} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

const ManageData = () => {
  const [activeTab, setActiveTab] = useState("college");
  const [search, setSearch] = useState("");
  const [placeSearch, setPlaceSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importType, setImportType] = useState("college");
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
  const [downloadingExcel, setDownloadingExcel] = useState(false);

  // Toast hook
  const { toasts, showToast, removeToast } = useToast();

  const fetchInstitutions = useCallback(async () => {
    setLoadingInstitutions(true);
    try {
      const [collegesRes, schoolsRes] = await Promise.all([
        axios.get("https://crm-r5rr.onrender.com/api/institution"),
        axios.get("https://crm-r5rr.onrender.com/api/institution")
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
        const res = await fetch('https://crm-r5rr.onrender.com/api/state-districts/states');
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
          const res = await fetch(`https://crm-r5rr.onrender.com/api/state-districts/districts/${selectedState}`);
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

  // CSV Import Function
  const handleCSVImport = async (csvFile, importType) => {
    try {
      const formData = new FormData();
      formData.append('csvFile', csvFile);
      formData.append('importType', importType);

      const response = await axios.post(
        'https://crm-r5rr.onrender.com/api/csv/import',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const result = response.data;
      
      if (result.success) {
        showToast(
          `Successfully imported ${result.imported} ${importType}s. ${result.skipped > 0 ? `Skipped ${result.skipped} duplicates.` : ''}`,
          "success"
        );
        
        // Refresh the data
        await fetchInstitutions();
      } else {
        showToast(result.message || "Failed to import CSV data", "error");
      }
    } catch (error) {
      console.error('CSV Import error:', error);
      const errorMessage = error.response?.data?.message || "Failed to import CSV data. Please check the file format and try again.";
      showToast(errorMessage, "error");
    }
  };

  // Download Excel function - FIXED
  const handleDownloadExcel = async () => {
    setDownloadingExcel(true);
    try {
      const currentData = activeTab === "college" ? filteredColleges : filteredSchools;
      const dataType = activeTab === "college" ? "colleges" : "schools";
      
      if (currentData.length === 0) {
        showToast(`No ${dataType} data available to download`, "error");
        return;
      }

      // Use the correct endpoint
      const response = await axios.post(
        `https://crm-r5rr.onrender.com/api/export/${dataType}`,
        {
          data: currentData,
          filters: {
            search,
            placeSearch,
            tierFilter: activeTab === "college" ? tierFilter : null,
            activeTab
          }
        },
        {
          responseType: 'blob',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      // Create blob link to download
      const blob = new Blob([response.data], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Generate filename with timestamp and filter info
      const timestamp = new Date().toISOString().split('T')[0];
      const filterSuffix = hasActiveFilters ? '_filtered' : '';
      const filename = `${dataType}_data${filterSuffix}_${timestamp}.xlsx`;
      link.setAttribute('download', filename);
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      showToast(`${dataType.charAt(0).toUpperCase() + dataType.slice(1)} data downloaded successfully!`, "success");
    } catch (error) {
      console.error('Download error:', error);
      const errorMessage = error.response?.data?.message || "Failed to download data. Please try again.";
      showToast(errorMessage, "error");
    } finally {
      setDownloadingExcel(false);
    }
  };

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
        website: data.website || "", // Include website field
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
        website: data.website || "", // Include website field
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
        await axios.delete(`https://crm-r5rr.onrender.com/api/institution/${id}?type=${type}`);

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
          await axios.put(`https://crm-r5rr.onrender.com/api/institution/${institution._id}`, {
            category: "college",
            data: newCollege,
          });
          showToast(`College "${institution.name}" updated successfully!`, "success");
        } else {
          await axios.post("https://crm-r5rr.onrender.com/api/institution/create", {
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
          await axios.put(`https://crm-r5rr.onrender.com/api/institution/${school._id}`, {
            category: "school",
            data: newSchool,
          });
          showToast(`School "${school.name}" updated successfully!`, "success");
        } else {
          await axios.post("https://crm-r5rr.onrender.com/api/institution/create", {
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
  <div className="flex items-center gap-3"> {/* Change this line */}
    <button
      onClick={() => setShowImportModal(true)}
      className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
    >
      <Upload size={18} /> Import CSV
    </button>
    <button
      className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-dark transition"
      onClick={handleModalOpen}
    >
      <Plus size={18} /> Add New Institution
    </button>
  </div> {/* Add this closing div */}
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

          {/* Filter Toggle Button and Download Button */}
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

            <div className="flex items-center gap-3">
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-text-muted hover:text-white transition text-sm"
                >
                  Clear all filters
                </button>
              )}
              
              {/* Download Excel Button */}
              <button
                onClick={handleDownloadExcel}
                disabled={downloadingExcel || (activeTab === "college" ? filteredColleges.length === 0 : filteredSchools.length === 0)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={16} />
                {downloadingExcel ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Downloading...
                  </>
                ) : (
                  `Download ${activeTab === "college" ? "Colleges" : "Schools"} Excel`
                )}
              </button>
            </div>
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
                <EnhancedCollegeList
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
                <EnhancedSchoolList
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
         <CSVImportModal
          showModal={showImportModal}
          onClose={() => setShowImportModal(false)}
          onImport={handleCSVImport}
          importType={importType}
          setImportType={setImportType}
        />
      </main>
    </div>
  );
};

export default ManageData;