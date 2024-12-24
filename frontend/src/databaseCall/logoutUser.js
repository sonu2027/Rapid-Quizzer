const logoutUser = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/user/logout`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    console.log("response after login: ", response);
    const data = await response.json();
    console.log("data: ", data);
    return data;
  } catch (error) {
    return error;
  }
};

export default logoutUser;
