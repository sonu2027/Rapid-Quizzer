const checkCookies = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/user/checkcookies`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
    console.log("data: ", data);
    return data;
  } catch (error) {
    return error;
  }
};

export default checkCookies;
