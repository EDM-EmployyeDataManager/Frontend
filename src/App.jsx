// App.js

import { useState, useEffect } from "react";
import { fetchEmployees, createEmployee, terminateEmployee } from "./api";

function App() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    qualification: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch employees on component mount
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    const response = await fetchEmployees();

    if (response.success) {
      setEmployees(response.data);
    } else {
      setMessage("Failed to fetch employee data");
    }
  };

  const handleCreateEmployee = async () => {
    const response = await createEmployee(newEmployee);

    if (response.success) {
      setMessage("Employee created successfully");
      setNewEmployee({ name: "", qualification: "" });
      fetchEmployeeData();
    } else {
      setMessage(response.message);
    }
  };

  const handleTerminateEmployee = async (employeeId) => {
    const response = await terminateEmployee(employeeId);

    if (response.success) {
      setMessage("Employee terminated successfully");
      fetchEmployeeData();
    } else {
      setMessage(response.message);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Employee Management System</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-bold mb-2">Create Employee</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateEmployee();
            }}
          >
            <div className="mb-2">
              <label className="block mb-1">Name</label>
              <input
                type="text"
                value={newEmployee.name}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, name: e.target.value })
                }
                className="border border-gray-300 rounded px-2 py-1 w-full"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Qualification</label>
              <input
                type="text"
                value={newEmployee.qualification}
                onChange={(e) =>
                  setNewEmployee({
                    ...newEmployee,
                    qualification: e.target.value,
                  })
                }
                className="border border-gray-300 rounded px-2 py-1 w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-2"
            >
              Create
            </button>
          </form>
        </div>
        <div className="col-span-2">
          <h2 className="text-xl font-bold mb-2">Employee List</h2>
          {employees.length === 0 ? (
            <p>No employees found</p>
          ) : (
            <ul className="border border-gray-300 rounded p-2">
              {employees.map((employee) => (
                <li key={employee._id} className="mb-2">
                  {employee.name} - {employee.qualification}
                  <button
                    onClick={() => handleTerminateEmployee(employee._id)}
                    className="bg-red-500 text-white rounded px-2 py-1 ml-4"
                  >
                    Terminate
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}

export default App;
