import React from 'react';
import { MdDashboard } from 'react-icons/md';
import { FaRegAddressCard, FaCalendarPlus, FaCalendarCheck } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const EmployeeLink = () => {
  return (
    <div className="mt-5 p-3">
      {/* Dashboard */}
      <NavLink
        to="/employeeDashboard"
        className={({ isActive }) =>
          `flex items-center gap-2 px-6 py-2 rounded-xl font-medium text-sm tracking-wide transition-all duration-300 ease-in-out ${
            isActive
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
              : "bg-gray-100 text-gray-800 hover:bg-blue-800 hover:text-white hover:shadow-md"
          }`
        }
      >
        <MdDashboard size={20} /> Dashboard
      </NavLink>

      {/* Profile Detail */}
      <NavLink
        to="/employeeDashboard/profileDetail"
        className={({ isActive }) =>
          `flex items-center gap-2 px-6 mt-3 py-2 rounded-xl font-medium text-sm tracking-wide transition-all duration-300 ease-in-out ${
            isActive
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
              : "bg-gray-100 text-gray-800 hover:bg-blue-800 hover:text-white hover:shadow-md"
          }`
        }
      >
        <FaRegAddressCard size={18} /> Profile Detail
      </NavLink>

      {/* Add Leave */}
      <NavLink
        to="/employeeDashboard/addLeave"
        className={({ isActive }) =>
          `flex items-center gap-2 px-6 mt-3 py-2 rounded-xl font-medium text-sm tracking-wide transition-all duration-300 ease-in-out ${
            isActive
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
              : "bg-gray-100 text-gray-800 hover:bg-blue-800 hover:text-white hover:shadow-md"
          }`
        }
      >
        <FaCalendarPlus size={18} /> Add Leave
      </NavLink>

      {/* Get Leave */}
      <NavLink
        to="/employeeDashboard/getLeave"
        className={({ isActive }) =>
          `flex items-center gap-2 px-6 mt-3 py-2 rounded-xl font-medium text-sm tracking-wide transition-all duration-300 ease-in-out ${
            isActive
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
              : "bg-gray-100 text-gray-800 hover:bg-blue-800 hover:text-white hover:shadow-md"
          }`
        }
      >
        <FaCalendarCheck size={18} /> Get Leave
      </NavLink>
    </div>
  );
};

export default EmployeeLink;
