import * as SecureStore from "expo-secure-store";

export const PORT = "http://147.79.68.157:4500";

//token
const TOKEN = async () => {
  try {
    const token = await SecureStore.getItemAsync("token"); // Correct method
    return token || null; // Return the token or null if not found
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null; // Handle error gracefully by returning null
  }
};

export const fetchToken = async () => {
  try {
    const token = await TOKEN();
    console.log(token || "No token found");
    return token; // Return token if needed elsewhere
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
};
