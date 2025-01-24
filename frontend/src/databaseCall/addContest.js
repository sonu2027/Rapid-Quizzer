const addContest = async (info) => {
  console.log("data is addContest: ", info);
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/contest/addcontest`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(info),
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

export { addContest };
