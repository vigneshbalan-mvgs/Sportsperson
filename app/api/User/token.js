export const token = async () => {
  const token = await getSecureStoreItem("token");
  return token;
};
