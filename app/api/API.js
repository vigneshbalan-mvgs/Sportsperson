// api.js - Utility for making API calls

export const fetchData = async (
  endpoint,
  method = "GET",
  data = null,
  headers = {},
) => {
  try {
    const API_URL = "<https://your-api-url.com>";
    const url = `${API_URL}/${endpoint}`;

    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };

    const config = {
      method,
      headers: defaultHeaders,
      body: data ? JSON.stringify(data) : null,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("API Error: ", error);
    throw error;
  }
};
