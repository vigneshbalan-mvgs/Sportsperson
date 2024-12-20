import * as SecureStore from "expo-secure-store"; // Import SecureStore for token access
import { PORT } from "@/const/PORT";

const uselikeAPI = async ({ postId }) => {
  console.log(postId);
  try {
    const sanitizedToken = await SecureStore.getItemAsync("token");
    const token = sanitizedToken?.replace(/^"|"$/g, ""); // Removes leading and trailing quotes


    const url = `${PORT}/api/user/like/${postId}`;
    const options = {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    console.log("Response Data:", data);

    return data; // Optional: Return the response data if needed
  } catch (error) {
    console.error("Error:", error);
  }
};

export default uselikeAPI;

