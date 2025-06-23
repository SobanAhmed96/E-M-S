import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProfileDetails = () => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const res = await axios.get("/api/v1/getEmployee");
        const id = res.data.verifyToken.id;

        try {
          const empRes = await axios.get(`/api/v1/getEmployee/${id}`);
          setEmployee(empRes.data.employee);
        } catch (error) {
          console.error("Error fetching employee by ID:", error);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
      }
    };

    getEmployee();
  }, []);

  if (!employee) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-black text-white rounded-xl shadow-lg mt-10">
        <h1 className='text-4xl text-center mb-5'>Employee Details</h1>
      <div className="flex items-center space-x-6">
        <img
          src={employee.profilePhoto}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
        />
        <div>
          <h2 className="text-3xl font-semibold">{employee.fullname}</h2>
          <p className="text-blue-400">{employee.designation} - {employee.department}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div>
          <p><span className="font-semibold text-gray-300">Email:</span> {employee.email}</p>
          <p><span className="font-semibold text-gray-300">Phone:</span> {employee.phone}</p>
          <p><span className="font-semibold text-gray-300">Gender:</span> {employee.gender}</p>
          <p><span className="font-semibold text-gray-300">DOB:</span> {new Date(employee.dob).toLocaleDateString()}</p>
        </div>

        <div>
          <p><span className="font-semibold text-gray-300">Employment Type:</span> {employee.employmentType}</p>
          <p><span className="font-semibold text-gray-300">Joining Date:</span> {new Date(employee.joiningDate).toLocaleDateString()}</p>
          <p><span className="font-semibold text-gray-300">Status:</span> <span className={`font-bold ${employee.status === 'Active' ? 'text-green-400' : 'text-red-400'}`}>{employee.status}</span></p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
