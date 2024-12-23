const loginUser = async (username, password) => {
    console.log("username and password is: ", username, password);
    
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/user/login`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ username, password }),
      }
    );
    console.log("response after login: ", response);
    const data = await response.json();
    console.log("data: ", data);
    return data
  } catch (error) {
    return error
  }
};

export default loginUser;
