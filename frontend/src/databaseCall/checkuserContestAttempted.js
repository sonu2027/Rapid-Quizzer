const checkuserContestAttempted = async (contestId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/contest/checkusercontestattempted`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ contestId }),
        credentials: "include",
      }
    );

    console.log("response is: ", response);

    let data;

    if (response) {
      data = await response.json();
      console.log("data is: ", data);
    }

    if (data.message == "user had attempted the quiz") return data;

    throw new Error("User hadn't attempted the quiz");
  } catch (error) {
    throw error;
  }
};

export { checkuserContestAttempted };
