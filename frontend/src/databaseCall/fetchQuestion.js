const fetchQuestion = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/question/fetchquestion`,
      {
        method: "GET",
      }
    );
    console.log("response: ", response);
    let data;
    if (response.ok) {
      data = await response.json();
      console.log("Data: ", data);
      return data;
    }
    throw new Error("Something went wrong")
  } catch (error) {
    console.log("Error: ", error);
    return error
  }
};

export default fetchQuestion;
