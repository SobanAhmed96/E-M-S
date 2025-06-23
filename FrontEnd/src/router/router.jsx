import React, { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Error from "./Error404";

// ✅ Lazy Loaded Components
const AdminDashboard = lazy(() => import("../dashboard/admin/Admin"));
const Dashboard = lazy(() => import("../pages/adminpages/Dashboard"));
const AddEmployee = lazy(() => import("../pages/adminpages/AddEmployee"));
const Employee = lazy(() => import("../dashboard/employee/Employee"));
const Login = lazy(() => import("../auth/Login"));
const GetAllEmployee = lazy(() => import("../pages/adminpages/GetAllEmployee"));
const GetByIdEmployee = lazy(() => import("../pages/adminpages/GetByIdEmployee"));
const EditEmployee = lazy(() => import("../pages/adminpages/EditEmployee"));
const SalaryCreate = lazy(() => import("../pages/adminpages/SalaryCreate"));
const GetAllSalaries = lazy(() => import("../pages/adminpages/GetAllSalaries"));
const EditSalary = lazy(() => import("../pages/adminpages/EditSalary"));
const AddAttendance = lazy(() => import("../pages/adminpages/Attendance/AddAttendance"));
const GetAttendance = lazy(() => import("../pages/adminpages/Attendance/GetAttendance"));
const UpdateAttendance = lazy(() => import("../pages/adminpages/Attendance/UpdateAttendance"));
const EmployeeDashboard = lazy(() => import("../pages/employeepages/EmployeeDashboard"));
const ProfileDetails = lazy(() => import("../pages/employeepages/ProfileDetails"));
const AttendanceReport = lazy(() => import("../pages/adminpages/Attendance/AttendanceReport"));
const AddLeave = lazy(() => import("../pages/employeepages/AddLeave"));
const GetLeave = lazy(() => import("../pages/employeepages/GetLeave"));
const AllLeaves = lazy(() => import("../pages/adminpages/AllLeaves"));
const LeaveDetail = lazy(() => import("../pages/adminpages/LeaveDetail"));

const withSuspense = (Component) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={withSuspense(Login)} />

      <Route path="/employeeDashboard" element={withSuspense(Employee)}>
        <Route index element={withSuspense(EmployeeDashboard)} />
        <Route path="profileDetail" element={withSuspense(ProfileDetails)} />
        <Route path="addLeave" element={withSuspense(AddLeave)} />
        <Route path="getLeave" element={withSuspense(GetLeave)} />
      </Route>

      <Route
        path="/adminDashboard"
        element={withSuspense(AdminDashboard)}
        errorElement={<Error />}
      >
        <Route index element={withSuspense(Dashboard)} />
        <Route path="addEmployee" element={withSuspense(AddEmployee)} />
        <Route path="getAllEmployee" element={withSuspense(GetAllEmployee)} />
        <Route path="getByIdEmpoloyee/:id" element={withSuspense(GetByIdEmployee)} />
        <Route path="updateEmployee/:id" element={withSuspense(EditEmployee)} />
        <Route path="salaryCreate" element={withSuspense(SalaryCreate)} />
        <Route path="getSalaries" element={withSuspense(GetAllSalaries)} />
        <Route path="updateSalary/:id" element={withSuspense(EditSalary)} />
        <Route path="addAttendance" element={withSuspense(AddAttendance)} />
        <Route path="getAttendance" element={withSuspense(GetAttendance)} />
        <Route path="updateAttendance/:id" element={withSuspense(UpdateAttendance)} />
        <Route path="attendanceReport" element={withSuspense(AttendanceReport)} />
        <Route path="allLeaves" element={withSuspense(AllLeaves)} />
        <Route path="LeaveDetail/:id" element={withSuspense(LeaveDetail)} />
      </Route>
    </>
  )
);

export default router;
