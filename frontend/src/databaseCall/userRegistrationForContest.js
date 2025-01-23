const userRegistartionForContest = async (contestId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/contest/userregistartionforcontest`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({ contestId }),
        credentials: "include",
      }
    );
    console.log("response: ", response);
    let data;
    if (response.ok) {
      data = await response.json();
      console.log("data: ", data);
      return data.status;
    }
    throw error;
  } catch (error) {
    throw error;
  }
};

export default userRegistartionForContest;
