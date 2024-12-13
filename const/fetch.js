import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store"; // Import SecureStore for token access

const useFetchWithToken = (url, method = "GET", body = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = await SecureStore.getItemAsync("token");

        if (!token) {
          throw new Error("Token not found");
        }

        const bearerToken = `Bearer ${token}`;
        const headers = {
          Authorization: bearerToken,
          "Content-Type": "application/json",
        };

        const options = {
          method,
          headers,
        };

        if (
          body &&
          (method === "POST" || method === "PUT" || method === "DELETE")
        ) {
          options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch data");
        }

        const result = await response.json();
        setData(result); // Set the fetched data
      } catch (err) {
        setError(err.message); // Set the error message
        console.error("Error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body]); // Re-run when URL, method, or body changes

  return { data, loading, error };
};

export default useFetchWithToken;
