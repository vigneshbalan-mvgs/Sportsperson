import { fetchData } from "../API";

// Registration (Sign Up)
export const registerUser = async (username, email, password) => {
  const data = { username, email, password };

  try {
    const result = await fetchData("register", "POST", data);
    return result; // Return the result for further processing (e.g., success message, user data)
  } catch (error) {
    console.error("Registration Error:", error);
    throw error;
  }
};
