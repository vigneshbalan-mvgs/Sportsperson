import * as SecureStore from "expo-secure-store";

// Save Functions
export const saveImage = async (url: string) => {
  try {
    await SecureStore.setItemAsync("C_Pro", url.trim());
    console.log("Profile image saved:", url);
    return true;
  } catch (error) {
    console.error("Error saving profile image:", error);
    return false;
  }
};

export const saveName = async (name: string) => {
  try {
    await SecureStore.setItemAsync("C_User", name.trim());
    console.log("User name saved:", name);
    return true;
  } catch (error) {
    console.error("Error saving user name:", error);
    return false;
  }
};

export const saveToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync("token", token.trim());
    console.log("Token saved:", token);
    return true;
  } catch (error) {
    console.error("Error saving token:", error);
    return false;
  }
};

export const saveUuid = async (uuid: string) => {
  try {
    await SecureStore.setItemAsync("Uuid", uuid.trim());
    console.log("Uuid saved:", uuid);
    return true;
  } catch (error) {
    console.error("Error saving Uuid:", error);
    return false;
  }
};

// Retrieve Functions
export const getImage = async () => {
  try {
    const url = await SecureStore.getItemAsync("C_Pro");
    const cleanedUrl = url?.replace(/^"|"$/g, ""); // Remove surrounding quotes if any
    console.log("Profile image:", cleanedUrl);
    return cleanedUrl;
  } catch (error) {
    console.error("Error fetching profile image:", error);
    return null;
  }
};

export const getName = async () => {
  try {
    const name = await SecureStore.getItemAsync("C_User");
    const cleanedName = name?.replace(/^"|"$/g, ""); // Remove surrounding quotes if any
    console.log("User name:", cleanedName);
    return cleanedName;
  } catch (error) {
    console.error("Error fetching user name:", error);
    return null;
  }
};

export const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync("token");
    const cleanedToken = token?.replace(/^"|"$/g, ""); // Remove surrounding quotes if any
    console.log("Token:", cleanedToken);
    return cleanedToken;
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
};

export const getUuid = async () => {
  try {
    const uuid = await SecureStore.getItemAsync("Uuid");
    const cleanedUuid = uuid?.replace(/^"|"$/g, ""); // Remove surrounding quotes if any
    console.log("Uuid:", cleanedUuid);
    return cleanedUuid;
  } catch (error) {
    console.error("Error fetching Uuid:", error);
    return null;
  }
};


//how do use it

//import { saveImage, saveName, saveToken, saveUuid } from '@/hooks/userDetails';

// const saveUserData = async () => {
//   await saveImage("https://example.com/profile.jpg");
//   await saveName("John Doe");
//   await saveToken("12345abcde");
//   await saveUuid("unique-uuid-value");
// };



// import { getImage, getName, getToken, getUuid } from '@/hooks/userDetails';
//
// const loadUserData = async () => {
//   const imageUrl = await getImage();
//   const userName = await getName();
//   const userToken = await getToken();
//   const userUuid = await getUuid();
//
//   console.log({ imageUrl, userName, userToken, userUuid });
// };
//

