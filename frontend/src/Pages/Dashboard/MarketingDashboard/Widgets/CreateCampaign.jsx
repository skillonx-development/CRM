import React, { useState } from "react";

const CreateCampaign = ({ onClose }) => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => (prev < 4 ? prev + 1 : prev));
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-background-card p-6 rounded-lg shadow-card text-text-default w-full max-w-lg relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-text-muted hover:text-white"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Create Instagram Campaign</h2>

        {/* Step Indicator */}
        <div className="flex justify-between mb-6">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${
                num <= step
                  ? "bg-primary text-white"
                  : "bg-border-dark text-text-muted"
              }`}
            >
              {num}
            </div>
          ))}
        </div>

        {/* Step 1: Campaign Details */}
        {step === 1 && (
          <div>
            <label className="block mb-2 text-text-muted">Campaign Name</label>
            <input
              type="text"
              placeholder="Enter campaign name"
              className="w-full p-2 rounded bg-background-hover border border-border-dark text-text-default"
            />

            <label className="block mt-4 mb-2 text-text-muted">Description</label>
            <textarea
              placeholder="What's your campaign about?"
              className="w-full p-2 rounded bg-background-hover border border-border-dark text-text-default"
              rows="3"
            ></textarea>

            <label className="block mt-4 mb-2 text-text-muted">Budget</label>
            <input
              type="number"
              placeholder="$ 0.00"
              className="w-full p-2 rounded bg-background-hover border border-border-dark text-text-default"
            />
          </div>
        )}

        {/* Step 2: Target Audience */}
        {step === 2 && (
          <div>
            <label className="block mb-2 text-text-muted">Age Range</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                className="w-full p-2 rounded bg-background-hover border border-border-dark text-text-default"
              />
              <input
                type="number"
                placeholder="Max"
                className="w-full p-2 rounded bg-background-hover border border-border-dark text-text-default"
              />
            </div>
          </div>
        )}

        {/* Step 3: Content */}
        {step === 3 && (
          <div>
            <label className="block mb-2 text-text-muted">Upload Image</label>
            <div className="border-dashed border-2 border-border-dark rounded-lg p-6 text-center">
              <p className="text-text-muted">Drag and drop your image here</p>
              <p className="text-sm text-text-disabled">PNG, JPG, GIF up to 10MB</p>
              <button className="mt-2 bg-primary px-4 py-2 rounded-md hover:bg-primary-dark transition">
                Upload Image
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className="text-center">
            <h3 className="text-lg font-bold text-primary">Campaign Ready!</h3>
            <p className="text-text-muted">Review and launch your campaign.</p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            className={`px-4 py-2 rounded-md ${
              step === 1
                ? "bg-background-hover text-text-disabled cursor-not-allowed"
                : "bg-border-dark hover:bg-border-default"
            }`}
            onClick={prevStep}
            disabled={step === 1}
          >
            Back
          </button>

          <button
            className="bg-primary px-4 py-2 rounded-md hover:bg-primary-dark transition"
            onClick={nextStep}
          >
            {step === 4 ? "Launch Campaign" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;
