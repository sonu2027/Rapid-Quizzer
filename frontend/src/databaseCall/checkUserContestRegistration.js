const checkUserContestRegistration = async (contestId) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/api/contest/checkusercontestregistration`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ contestId }),
        credentials: "include",
      }
    );
    let data;
    if (response) {
      data =await response.json();
      return data.status;
    }
    throw error;
  } catch (error) {
    throw error;
  }
};

export default checkUserContestRegistration;
