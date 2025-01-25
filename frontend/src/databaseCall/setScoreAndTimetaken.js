const setScoreAndTimetaken = async (contestId, score, timeTaken) => {
  console.log("contestId, score, timeTaken: ", contestId, score, timeTaken);

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/contest/setscoreandtimetaken`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({ contestId, score, timeTaken }),
        credentials: "include",
      }
    );
    console.log("response: ", response);
    let data;
    if (response.ok) {
      data = await response.json();
      return data;
    }
    throw error;
  } catch (error) {
    throw error;
  }
};

export default setScoreAndTimetaken;
