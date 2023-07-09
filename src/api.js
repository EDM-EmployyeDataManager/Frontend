// api.js

const BASE_URL = "http://localhost:3000"; // Replace with your backend API URL

export async function signupEmployee(employeeData) {
  try {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employeeData),
    });
    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    return { success: false, message: "Failed to create employee" };
  }
}
