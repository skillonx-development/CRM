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
  setSelectedDistrict,
  isEditing,
  fetchDistricts,
  fetchInstitutionLocation,
}) => {
  const [isLoadingLocation, setIsLoadingLocation] = React.useState(false);
  const [editModeInitialized, setEditModeInitialized] = React.useState(false);

  // Unified function to fetch and set state/district data
  const fetchAndSetLocationData = React.useCallback(async (currentData) => {
    setIsLoadingLocation(true);
    
    try {
      let stateValue = null;
      let districtValue = null;
      let stateName = null;

      // First, try to get state/district from the current data
      stateValue = currentData.stateId || currentData.state_id || currentData.state;
      districtValue = currentData.district || currentData.districtName || currentData.district_name;
      stateName = currentData.stateName || currentData.state_name;

      console.log('Initial data check:', {
        stateValue,
        districtValue,
        stateName,
        hasLocationFetcher: !!fetchInstitutionLocation
      });

      // If state/district data is missing and we have a location fetcher, try to fetch it
      if ((!stateValue || !districtValue) && currentData._id && fetchInstitutionLocation) {
        console.log('Fetching location data from API for ID:', currentData._id);
        
        try {
          const locationData = await fetchInstitutionLocation(currentData._id);
          console.log('Fetched location data:', locationData);
          
          // Use fetched data if current data is missing
          stateValue = stateValue || locationData.stateId || locationData.state_id || locationData.state;
          districtValue = districtValue || locationData.district || locationData.districtName || locationData.district_name;
          stateName = stateName || locationData.stateName || locationData.state_name;
          
          // Update the current data object with fetched location data
          const locationUpdateEvent = {
            target: { name: 'locationData', value: locationData }
          };
          
          if (category === "college") {
            // Update institution object with location data
            if (locationData.stateId) handleInstitutionChange({ target: { name: "stateId", value: locationData.stateId } });
            if (locationData.stateName) handleInstitutionChange({ target: { name: "stateName", value: locationData.stateName } });
            if (locationData.district) handleInstitutionChange({ target: { name: "district", value: locationData.district } });
          } else {
            // Update school object with location data
            if (locationData.stateId) handleSchoolChange({ target: { name: "stateId", value: locationData.stateId } });
            if (locationData.stateName) handleSchoolChange({ target: { name: "stateName", value: locationData.stateName } });
            if (locationData.district) handleSchoolChange({ target: { name: "district", value: locationData.district } });
          }
        } catch (locationError) {
          console.error('Error fetching location data:', locationError);
        }
      }

      // Process state data
      if (stateValue && states.length > 0) {
        const foundState = states.find(s => 
          s.state_id.toString() === stateValue.toString() || 
          s.state_name === stateName ||
          s.state_id === parseInt(stateValue)
        );
        
        if (foundState) {
          console.log('Setting state to:', foundState.state_id);
          setSelectedState(foundState.state_id);
          
          // Update form data with state information
          const stateChangeEvents = [
            { target: { name: "stateId", value: foundState.state_id } },
            { target: { name: "stateName", value: foundState.state_name } }
          ];
          
          stateChangeEvents.forEach(event => {
            if (category === "college") {
              handleInstitutionChange(event);
            } else {
              handleSchoolChange(event);
            }
          });
          
          // Fetch districts for this state
          if (fetchDistricts) {
            console.log('Fetching districts for state:', foundState.state_id);
            await fetchDistricts(foundState.state_id);
            
            // Set district after districts are loaded
            if (districtValue) {
              console.log('Setting district to:', districtValue);
              setSelectedDistrict(districtValue);
              
              // Update form data with district
              const districtEvent = { target: { name: "district", value: districtValue } };
              if (category === "college") {
                handleInstitutionChange(districtEvent);
              } else {
                handleSchoolChange(districtEvent);
              }
            }
          }
        } else {
          console.log('State not found in states array for value:', stateValue);
          console.log('Available states:', states.map(s => ({id: s.state_id, name: s.state_name})));
        }
      } else if (!stateValue) {
        console.log('No state data found - this might be expected for some records');
      }
      
    } catch (error) {
      console.error('Error in fetchAndSetLocationData:', error);
    } finally {
      setIsLoadingLocation(false);
    }
  }, [states, fetchDistricts, fetchInstitutionLocation, category, handleInstitutionChange, handleSchoolChange]);

  // Initialize state and district values when editing modal opens
  React.useEffect(() => {
    const initializeEditMode = async () => {
      if (isEditing && showModal && states.length > 0 && !editModeInitialized) {
        const currentData = category === "college" ? institution : school;
        
        console.log('Initializing edit mode with data:', currentData);
        console.log('Available properties:', Object.keys(currentData));
        
        // Use unified fetch function
        await fetchAndSetLocationData(currentData);
        
        setEditModeInitialized(true);
      }
    };

    initializeEditMode();
  }, [isEditing, showModal, category, institution, school, states, editModeInitialized, fetchAndSetLocationData]);

  // Reset initialization flag when modal closes or category changes
  React.useEffect(() => {
    if (!showModal) {
      setEditModeInitialized(false);
      // Reset state and district when modal closes
      setSelectedState("");
      setSelectedDistrict("");
    }
  }, [showModal]);

  // Reset edit mode when category changes (if allowed)
  React.useEffect(() => {
    if (!isEditing) {
      setEditModeInitialized(false);
    }
  }, [category, isEditing]);

  // Get the current state value for the select dropdown
  const getCurrentStateValue = () => {
    if (selectedState) {
      return selectedState;
    }
    
    if (isEditing) {
      const currentData = category === "college" ? institution : school;
      const stateValue = currentData.stateId || currentData.state_id || currentData.state;
      
      if (stateValue && states.length > 0) {
        const foundState = states.find(s => 
          s.state_id.toString() === stateValue.toString() || 
          s.state_id === parseInt(stateValue)
        );
        
        if (foundState) {
          return foundState.state_id;
        }
      }
      
      return stateValue || "";
    }
    return "";
  };

  // Get the current district value for the select dropdown
  const getCurrentDistrictValue = () => {
    if (selectedDistrict) {
      return selectedDistrict;
    }
    
    if (isEditing) {
      const currentData = category === "college" ? institution : school;
      const districtValue = currentData.district || currentData.districtName || currentData.district_name;
      return districtValue || "";
    }
    return "";
  };

  // Handle state change
  const handleStateChange = async (e) => {
    const newStateId = e.target.value;
    const selectedStateName = states.find(s => s.state_id.toString() === newStateId.toString())?.state_name || "";
    
    console.log('State changed to:', newStateId, selectedStateName);
    
    // Update local state
    setSelectedState(newStateId);
    setSelectedDistrict(""); // Reset district when state changes
    
    // Fetch districts for the new state
    if (newStateId && fetchDistricts) {
      setIsLoadingLocation(true);
      try {
        await fetchDistricts(newStateId);
      } catch (error) {
        console.error('Error fetching districts:', error);
      } finally {
        setIsLoadingLocation(false);
      }
    }
    
    // Update the form data - store both stateId and stateName to match your data structure
    const stateUpdateEvents = [
      { target: { name: "stateId", value: newStateId } },
      { target: { name: "stateName", value: selectedStateName } }
    ];
    
    stateUpdateEvents.forEach(event => {
      if (category === "college") {
        handleInstitutionChange(event);
      } else {
        handleSchoolChange(event);
      }
    });
  };

  // Handle district change
  const handleDistrictChange = (e) => {
    const newDistrict = e.target.value;
    
    console.log('District changed to:', newDistrict);
    
    // Update local state
    setSelectedDistrict(newDistrict);
    
    // Update the form data
    const changeEvent = { target: { name: "district", value: newDistrict } };
    if (category === "college") {
      handleInstitutionChange(changeEvent);
    } else {
      handleSchoolChange(changeEvent);
    }
  };

  // Debug current values
  React.useEffect(() => {
    if (isEditing && showModal) {
      const currentData = category === "college" ? institution : school;
      console.log('=== DEBUG INFO ===');
      console.log('Current data:', currentData);
      console.log('Selected state:', selectedState);
      console.log('Selected district:', selectedDistrict);
      console.log('Available states:', states.length);
      console.log('Available districts:', districts.length);
      console.log('Edit mode initialized:', editModeInitialized);
      console.log('Is loading location:', isLoadingLocation);
    }
  }, [isEditing, showModal, category, institution, school, selectedState, selectedDistrict, states, districts, editModeInitialized, isLoadingLocation]);

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
            
            {/* Loading indicator */}
            {isLoadingLocation && (
              <div className="absolute top-12 right-4 bg-primary text-white px-2 py-1 rounded text-xs">
                Loading location...
              </div>
            )}
            
            <h3 className="text-xl font-bold text-white mb-4 mt-2">
              {isEditing ? "Edit Institution" : "Add New Institution"}
            </h3>
            <div className="flex gap-2 mb-4">
              <button
                className={`px-4 py-2 rounded-lg ${
                  category === "college" ? "bg-primary text-white" : "bg-transparent border-purple-500"
                }`}
                onClick={() => setCategory("college")}
                disabled={isEditing} // Disable while editing
              >
                College
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  category === "school" ? "bg-primary text-white" : "bg-transparent border-purple-500"
                }`}
                onClick={() => setCategory("school")}
                disabled={isEditing} // Disable while editing
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
                      value={institution.name || ""}
                      onChange={handleInstitutionChange}
                      className="w-full px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-text mb-1">
                      Principal Name
                    </label>
                    <input
                      type="text"
                      name="principal"
                      value={institution.principal || ""}
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
                      value={institution.email || ""}
                      onChange={handleInstitutionChange}
                      className="w-full px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-text mb-1">Website</label>
                    <input
                      type="url"
                      name="website"
                      value={institution.website || ""}
                      onChange={handleInstitutionChange}
                      className="w-full px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                      placeholder="https://example.com"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-text mb-1">College Type</label>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        className={`px-3 py-2 rounded-lg font-semibold transition ${
                          collegeType === "engineering"
                            ? "bg-primary text-white"
                            : "bg-background-hover text-text-muted"
                        }`}
                        onClick={() => setCollegeType("engineering")}
                      >
                        Engineering
                      </button>
                      <button
                        type="button"
                        className={`px-3 py-2 rounded-lg font-semibold transition ${
                          collegeType === "degree"
                            ? "bg-primary text-white"
                            : "bg-background-hover text-text-muted"
                        }`}
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
                        <div className="mb-3">
                          <label className="block text-text mb-1">Tier</label>
                          <select
                            name="tier"
                            value={institution.tier || ""}
                            onChange={handleInstitutionChange}
                            className="w-full px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                            required
                          >
                            <option value="">Select Tier</option>
                            <option value="tier1">Tier 1</option>
                            <option value="tier2">Tier 2</option>
                            <option value="tier3">Tier 3</option>
                          </select>
                        </div>

                        <label className="block text-text mb-1">
                          Placement Officer
                        </label>
                        <input
                          type="text"
                          name="placementOfficer"
                          value={institution.placementOfficer || ""}
                          onChange={handleInstitutionChange}
                          className="w-full px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                        />
                        <label className="block text-text mb-1 mt-2">
                          Placement Officer Email
                        </label>
                        <input
                          type="email"
                          name="placementEmail"
                          value={institution.placementEmail || ""}
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
                        <div className="mb-3">
                          <label className="block text-text mb-1">Tier</label>
                          <select
                            name="tier"
                            value={institution.tier || ""}
                            onChange={handleInstitutionChange}
                            className="w-full px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                            required
                          >
                            <option value="">Select Tier</option>
                            <option value="tier1">Tier 1</option>
                            <option value="tier2">Tier 2</option>
                            <option value="tier3">Tier 3</option>
                          </select>
                        </div>
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
                          {(institution.branches || []).map((branch, idx) => (
                            <span
                              key={idx}
                              className="bg-background-hover text-white px-3 py-1 rounded-full flex items-center gap-1"
                            >
                              {branch}
                              <button
                                type="button"
                                onClick={() => handleRemoveBranch(idx)}
                                className="ml-1 text-text-muted hover:text-white"
                              >
                                <X size={14} />
                              </button>
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="mb-3">
                    <label className="block text-text mb-1">Contact</label>
                    {(institution.contact || [""]).map((num, idx) => (
                      <div key={idx} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={num}
                          onChange={(e) =>
                            handleContactChange("college", idx, e.target.value)
                          }
                          className="flex-1 px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                          placeholder="Contact number"
                          required={idx === 0}
                        />
                        {idx === (institution.contact || [""]).length - 1 && (
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
                      value={institution.address || ""}
                      onChange={handleInstitutionChange}
                      className="w-full px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-text mb-1">State</label>
                    <select
                      className="w-full px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                      value={getCurrentStateValue()}
                      onChange={handleStateChange}
                      required={category === "college"}
                      disabled={isLoadingLocation}
                    >
                      <option value="">
                        {isLoadingLocation ? "Loading..." : "Select State"}
                      </option>
                      {states.map((state) => (
                        <option key={state.state_id} value={state.state_id}>
                          {state.state_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-text mb-1">District</label>
                    <select
                      className="w-full px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                      value={getCurrentDistrictValue()}
                      onChange={handleDistrictChange}
                      required={category === "college"}
                      disabled={!getCurrentStateValue() || isLoadingLocation}
                    >
                      <option value="">
                        {isLoadingLocation ? "Loading..." : "Select District"}
                      </option>
                      {districts.map((district) => (
                        <option
                          key={district.district_id}
                          value={district.district_name}
                        >
                          {district.district_name}
                        </option>
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
                      value={school.name || ""}
                      onChange={handleSchoolChange}
                      className="w-full px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-text mb-1">
                      Principal Name
                    </label>
                    <input
                      type="text"
                      name="principal"
                      value={school.principal || ""}
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
                      value={school.email || ""}
                      onChange={handleSchoolChange}
                      className="w-full px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-text mb-1">Contact</label>
                    {(school.contact || [""]).map((num, idx) => (
                      <div key={idx} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={num}
                          onChange={(e) =>
                            handleContactChange("school", idx, e.target.value)
                          }
                          className="flex-1 px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                          placeholder="Contact number"
                          required={idx === 0}
                        />
                        {idx === (school.contact || [""]).length - 1 && (
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
                      value={school.address || ""}
                      onChange={handleSchoolChange}
                      className="w-full px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-text mb-1">State</label>
                    <select
                      className="w-full px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                      value={getCurrentStateValue()}
                      onChange={handleStateChange}
                      required
                      disabled={isLoadingLocation}
                    >
                      <option value="">
                        {isLoadingLocation ? "Loading..." : "Select State"}
                      </option>
                      {states.map((state) => (
                        <option key={state.state_id} value={state.state_id}>
                          {state.state_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-text mb-1">District</label>
                    <select
                      className="w-full px-3 py-2 rounded bg-background focus:outline-none border border-border-dark text-white"
                      value={getCurrentDistrictValue()}
                      onChange={handleDistrictChange}
                      required
                      disabled={!getCurrentStateValue() || isLoadingLocation}
                    >
                      <option value="">
                        {isLoadingLocation ? "Loading..." : "Select District"}
                      </option>
                      {districts.map((district) => (
                        <option
                          key={district.district_id}
                          value={district.district_name}
                        >
                          {district.district_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
                  disabled={isLoadingLocation}
                >
                  {isEditing ? "Update" : "Add"}
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