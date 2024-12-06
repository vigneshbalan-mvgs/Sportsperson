import { fetchData } from "../API";

export const signInUser = async (email, password) => {
  const data = { email, password };

  try {
    const result = await fetchData("login", "POST", data);
    return result;
  } catch (error) {
    console.error("SignIn Error:", error);
    throw error;
  }
};
