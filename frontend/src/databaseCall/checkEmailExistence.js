const checkEmailExistence = async (email) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/user/checkemailexistence`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email }),
      }
    );
    console.log("response: ", response);
    const data = await response.json();
    console.log("data: ", data);
    return data.status;
  } catch (error) {
    return error;
  }
};

export default checkEmailExistence;
