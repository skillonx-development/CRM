import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";

const InstitutionModal = ({
    showModal,
    handleModalClose,
    category,
    setCategory,
    collegeType,
    setCollegeType,
    institution,
    school,
    branchesInput,
    setBranchesInput,
    handleAddBranch,
    handleRemoveBranch,
    handleAddContact,
    handleContactChange,
    handleInstitutionChange,
    handleSchoolChange,
    handleSubmit,
    states,
    districts,
    selectedState,
    setSelectedState,
    selectedDistrict,
    setSelectedDistrict
}) => {
    return (
        <AnimatePresence>
            {showModal && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-background-card rounded-lg w-full max-w-lg relative max-h-[90vh] overflow-y-auto p-8"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                    >
                        {/* Cross button at the very top right, always visible */}
                        <button
                            className="absolute top-2 right-2 text-text-muted hover:text-white z-10"
                            onClick={handleModalClose}
                            aria-label="Close modal"
                        >
                            <X size={28} />
                        </button>
                        <h3 className="text-xl font-bold text-white mb-4 mt-2">Add New Institution</h3>
                        <div className="mb-4 flex gap-4">
                            <button
                                className={`px-4 py-2 rounded-lg font-semibold transition ${category === "college" ? "bg-primary text-white" : "bg-background-hover text-text-muted"}`}
                                onClick={() => setCategory("college")}
                            >
                                College
                            </button>
                            <button
                                className={`px-4 py-2 rounded-lg font-semibold transition ${category === "school" ? "bg-primary text-white" : "bg-background-hover text-text-muted"}`}
                                onClick={() => setCategory("school")}
                            >
                                School
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            {category === "college" ? (
                                <>
                                    <div className="mb-3">
                                        <label className="block text-text mb-1">College Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={institution.name}
                                            onChange={handleInstitutionChange}
                                            className="w-full px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="block text-text mb-1">Principal Name</label>
                                        <input
                                            type="text"
                                            name="principal"
                                            value={institution.principal}
                                            onChange={handleInstitutionChange}
                                            className="w-full px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="block text-text mb-1">Email ID</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={institution.email}
                                            onChange={handleInstitutionChange}
                                            className="w-full px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="block text-text mb-1">College Type</label>
                                        <div className="flex gap-4">
                                            <button
                                                type="button"
                                                className={`px-3 py-2 rounded-lg font-semibold transition ${collegeType === "engineering" ? "bg-primary text-white" : "bg-background-hover text-text-muted"}`}
                                                onClick={() => setCollegeType("engineering")}
                                            >
                                                Engineering
                                            </button>
                                            <button
                                                type="button"
                                                className={`px-3 py-2 rounded-lg font-semibold transition ${collegeType === "degree" ? "bg-primary text-white" : "bg-background-hover text-text-muted"}`}
                                                onClick={() => setCollegeType("degree")}
                                            >
                                                Degree
                                            </button>
                                        </div>
                                    </div>
                                    <AnimatePresence>
                                        {collegeType === "engineering" && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="mb-3"
                                            >
                                                <label className="block text-text mb-1">Placement Officer</label>
                                                <input
                                                    type="text"
                                                    name="placementOfficer"
                                                    value={institution.placementOfficer}
                                                    onChange={handleInstitutionChange}
                                                    className="w-full px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                                                />
                                                <label className="block text-text mb-1 mt-2">Placement Officer Email</label>
                                                <input
                                                    type="email"
                                                    name="placementEmail"
                                                    value={institution.placementEmail}
                                                    onChange={handleInstitutionChange}
                                                    className="w-full px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                                                />
                                            </motion.div>
                                        )}
                                        {collegeType === "degree" && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="mb-3"
                                            >
                                                <label className="block text-text mb-1">Branches</label>
                                                <div className="flex gap-2 mb-2">
                                                    <input
                                                        type="text"
                                                        value={branchesInput}
                                                        onChange={(e) => setBranchesInput(e.target.value)}
                                                        className="flex-1 px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                                                        placeholder="Add branch"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="bg-primary text-white px-3 py-2 rounded-lg hover:bg-primary-dark transition"
                                                        onClick={handleAddBranch}
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {institution.branches.map((branch, idx) => (
                                                        <span key={idx} className="bg-background-hover text-white px-3 py-1 rounded-full flex items-center gap-1">
                                                            {branch}
                                                            <button type="button" onClick={() => handleRemoveBranch(idx)} className="ml-1 text-text-muted hover:text-white"><X size={14} /></button>
                                                        </span>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    <div className="mb-3">
                                        <label className="block text-text mb-1">Contact</label>
                                        {institution.contact.map((num, idx) => (
                                            <div key={idx} className="flex gap-2 mb-2">
                                                <input
                                                    type="text"
                                                    value={num}
                                                    onChange={(e) => handleContactChange("college", idx, e.target.value)}
                                                    className="flex-1 px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                                                    placeholder="Contact number"
                                                    required={idx === 0}
                                                />
                                                {idx === institution.contact.length - 1 && (
                                                    <button
                                                        type="button"
                                                        className="bg-primary text-white px-2 py-2 rounded-lg hover:bg-primary-dark transition"
                                                        onClick={() => handleAddContact("college")}
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-text mb-1">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={institution.address}
                                            onChange={handleInstitutionChange}
                                            className="w-full px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="block text-text mb-1">State</label>
                                        <select
                                            className="w-full px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                                            value={selectedState}
                                            onChange={e => {
                                                setSelectedState(e.target.value);
                                                setSelectedDistrict("");
                                            }}
                                            required
                                        >
                                            <option value="">Select State</option>
                                            {states.map((state) => (
                                                <option key={state.state_id} value={state.state_id}>{state.state_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-text mb-1">District</label>
                                        <select
                                            className="w-full px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                                            value={selectedDistrict}
                                            onChange={e => setSelectedDistrict(e.target.value)}
                                            required
                                            disabled={!selectedState}
                                        >
                                            <option value="">Select District</option>
                                            {districts.map((district) => (
                                                <option key={district.district_id} value={district.district_name}>{district.district_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="mb-3">
                                        <label className="block text-text mb-1">School Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={school.name}
                                            onChange={handleSchoolChange}
                                            className="w-full px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="block text-text mb-1">Principal Name</label>
                                        <input
                                            type="text"
                                            name="principal"
                                            value={school.principal}
                                            onChange={handleSchoolChange}
                                            className="w-full px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="block text-text mb-1">Email ID</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={school.email}
                                            onChange={handleSchoolChange}
                                            className="w-full px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="block text-text mb-1">Contact</label>
                                        {school.contact.map((num, idx) => (
                                            <div key={idx} className="flex gap-2 mb-2">
                                                <input
                                                    type="text"
                                                    value={num}
                                                    onChange={(e) => handleContactChange("school", idx, e.target.value)}
                                                    className="flex-1 px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                                                    placeholder="Contact number"
                                                    required={idx === 0}
                                                />
                                                {idx === school.contact.length - 1 && (
                                                    <button
                                                        type="button"
                                                        className="bg-primary text-white px-2 py-2 rounded-lg hover:bg-primary-dark transition"
                                                        onClick={() => handleAddContact("school")}
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-text mb-1">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={school.address}
                                            onChange={handleSchoolChange}
                                            className="w-full px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="block text-text mb-1">State</label>
                                        <select
                                            className="w-full px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                                            value={selectedState}
                                            onChange={e => {
                                                setSelectedState(e.target.value);
                                                setSelectedDistrict("");
                                            }}
                                            required
                                        >
                                            <option value="">Select State</option>
                                            {states.map((state) => (
                                                <option key={state.state_id} value={state.state_id}>{state.state_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-text mb-1">District</label>
                                        <select
                                            className="w-full px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                                            value={selectedDistrict}
                                            onChange={e => setSelectedDistrict(e.target.value)}
                                            required
                                            disabled={!selectedState}
                                        >
                                            <option value="">Select District</option>
                                            {districts.map((district) => (
                                                <option key={district.district_id} value={district.district_name}>{district.district_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </>
                            )}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition font-semibold"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default InstitutionModal;
