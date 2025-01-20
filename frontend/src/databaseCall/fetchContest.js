const fetchContest = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contest/fetchcontest`,
        {
          method: "GET",
        }
      );
      console.log("contest response: ", response);
      let data;
      if (response.ok) {
        data = await response.json();
        console.log(" contest Data: ", data);
        return data;
      }
      throw new Error("Something went wrong")
    } catch (error) {
      console.log("Error: ", error);
      return error
    }
  };
  
  export default fetchContest;
  