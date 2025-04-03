import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const [role, setRole] = useState("Member");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background-default text-text-default">
      <h2 className="text-2xl font-bold mb-4">Register as</h2>
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-6 py-2 rounded-lg ${role === "Lead" ? "bg-background-card text-text-muted border border-purple-500" : "bg-primary-default text-white"}`}
          onClick={() => {
            setRole("Lead");
            navigate("/register/lead");
          }}
  
        >
          Lead
        </button>
        <button
          className={`px-6 py-2 rounded-lg ${role === "Member" ?"bg-background-card text-text-muted  border border-purple-500" : "bg-primary-default text-white"}`}
          onClick={() => {
            setRole("Member");
            navigate("/register/member");
          }}
  
        >
          Member
        </button>
      </div>

      <div className="bg-background-card p-6 rounded-lg shadow-card w-96">
        <h3 className="text-xl font-semibold mb-4">{role} Registration</h3>
        <form>
          <label className="block mb-2">Name:</label>
          <input type="text" placeholder="Enter Name" className="w-full p-2 rounded bg-background-default border border-border-default text-text-default mb-4" />
          
          <label className="block mb-2">Contact number:</label>
          <input type="text" placeholder="Enter Contact Number" className="w-full p-2 rounded bg-background-default border border-border-default text-text-default mb-4" />
          
          <label className="block mb-2">Email:</label>
          <input type="email" placeholder="Enter Email" className="w-full p-2 rounded bg-background-default border border-border-default text-text-default mb-4" />
          
          {/* Team Selection Field for Both Roles */}
          <label className="block mb-2">Team:</label>
          <select className="w-full p-2 rounded bg-background-default border border-border-default text-text-default mb-4">
            <option>Sales</option>
            <option>Marketing</option>
            <option>Tech</option>
          </select>

          <label className="block mb-2">Password:</label>
          <input type="password" placeholder="Enter Password" className="w-full p-2 rounded bg-background-default border border-border-default text-text-default mb-4" />
          
          <label className="block mb-2">Confirm Password:</label>
          <input type="password" placeholder="Confirm Password" className="w-full p-2 rounded bg-background-default border border-border-default text-text-default mb-4" />
          
          <button type="submit" className="w-full p-2 rounded bg-status-success text-white">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
