const changePassword = async (email, password) => {
  console.log("email and password for change password: ", email, password);
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/user/changepassword`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    console.log("response: ", response);
    const data = await response.json();
    console.log("data: ", data.status);
    return data.status
  } catch (error) {
    console.log("error: ", error);
    return error;
  }
};

export default changePassword;
