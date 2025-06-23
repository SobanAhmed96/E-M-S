import React from "react";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { IoIosAddCircle, IoMdListBox } from "react-icons/io";
import { FaMoneyCheckAlt } from "react-icons/fa";

const Link = () => {
  return (
    <div className="mt-4 p-2">
      {/* Dashboard Link */}
      <NavLink
        to="/adminDashboard"
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

      {/* Add Employee */}
      <NavLink
        to="/adminDashboard/addEmployee"
        className={({ isActive }) =>
          `flex items-center gap-2 px-6 py-2 rounded-xl mt-3 font-medium text-sm tracking-wide transition-all duration-300 ease-in-out ${
            isActive
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
              : "bg-gray-100 text-gray-800 hover:bg-blue-800 hover:text-white hover:shadow-md"
          }`
        }
      >
        <IoIosAddCircle size={20} /> Add Employee
      </NavLink>

      {/* Get All Employee */}
      <NavLink
        to="/adminDashboard/getAllEmployee"
        className={({ isActive }) =>
          `flex items-center gap-2 px-6 py-2 rounded-xl mt-3 font-medium text-sm tracking-wide transition-all duration-300 ease-in-out ${
            isActive
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
              : "bg-gray-100 text-gray-800 hover:bg-blue-800 hover:text-white hover:shadow-md"
          }`
        }
      >
        <IoMdListBox size={20} /> Get Employees
      </NavLink>

      {/* Salary Create */}
      <NavLink
        to="/adminDashboard/salaryCreate"
        className={({ isActive }) =>
          `flex items-center gap-2 px-6 py-2 rounded-xl mt-3 font-medium text-sm tracking-wide transition-all duration-300 ease-in-out ${
            isActive
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
              : "bg-gray-100 text-gray-800 hover:bg-blue-800 hover:text-white hover:shadow-md"
          }`
        }
      >
        <FaMoneyCheckAlt size={20} /> Salary Create
      </NavLink>
      {/*Get All Salaries*/}
      <NavLink
        to="/adminDashboard/getSalaries"
        className={({ isActive }) =>
          `flex items-center gap-2 px-6 py-2 rounded-xl mt-3 font-medium text-sm tracking-wide transition-all duration-300 ease-in-out ${
            isActive
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
              : "bg-gray-100 text-gray-800 hover:bg-blue-800 hover:text-white hover:shadow-md"
          }`
        }
      >
        <IoMdListBox size={20} /> Get All Salaries
      </NavLink>
      {/*Add Attendance*/}
      <NavLink
        to="/adminDashboard/addAttendance"
        className={({ isActive }) =>
          `flex items-center gap-2 px-6 py-2 rounded-xl mt-3 font-medium text-sm tracking-wide transition-all duration-300 ease-in-out ${
            isActive
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
              : "bg-gray-100 text-gray-800 hover:bg-blue-800 hover:text-white hover:shadow-md"
          }`
        }
      >
        <IoIosAddCircle size={20} /> Add Attendance
      </NavLink>
      {/*Get Attendance*/}
      <NavLink
        to="/adminDashboard/getAttendance"
        className={({ isActive }) =>
          `flex items-center gap-2 px-6 py-2 rounded-xl mt-3 font-medium text-sm tracking-wide transition-all duration-300 ease-in-out ${
            isActive
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
              : "bg-gray-100 text-gray-800 hover:bg-blue-800 hover:text-white hover:shadow-md"
          }`
        }
      >
        <IoMdListBox size={20} />Attendance History
      </NavLink>
      {/*Get Attendance*/}
      <NavLink
        to="/adminDashboard/attendanceReport"
        className={({ isActive }) =>
          `flex items-center gap-2 px-6 py-2 rounded-xl mt-3 font-medium text-sm tracking-wide transition-all duration-300 ease-in-out ${
            isActive
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
              : "bg-gray-100 text-gray-800 hover:bg-blue-800 hover:text-white hover:shadow-md"
          }`
        }
      >
        <IoMdListBox size={20} />Attendance Report
      </NavLink>
      {/*All Leave*/}
      <NavLink
        to="/adminDashboard/allLeaves"
        className={({ isActive }) =>
          `flex items-center gap-2 px-6 py-2 rounded-xl mt-3 font-medium text-sm tracking-wide transition-all duration-300 ease-in-out ${
            isActive
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
              : "bg-gray-100 text-gray-800 hover:bg-blue-800 hover:text-white hover:shadow-md"
          }`
        }
      >
        <IoMdListBox size={20} /> All Leaves
      </NavLink>
    </div>
  );
};

export default Link;
