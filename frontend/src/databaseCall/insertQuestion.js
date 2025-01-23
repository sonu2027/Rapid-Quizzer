const insertQuestion = async () => {
  // `${import.meta.env.VITE_API_URL}/api/question/insertquestion`,
  // let data = {
  //   question: ``,
  //   options: [``, ``, ``, ``],
  //   answer:``,
  //   difficulty: 0,
  //   subject: ``,
  //   chapter: ``,
  // };

  try {
    let response = await fetch(
      // `http://localhost:8000/api/question/insertquestion`,
      `https://playquizesbackend.vercel.app/api/question/insertquestion`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      response = await response.json();
      return response;
    } else {
      throw new Error("Internal server error");
    }
  } catch (error) {
    throw error;
  }
};

insertQuestion()
  .then((res) => {
    console.log("Res is: ", res);
  })
  .catch((error) => {
    console.error("Error is: ", error);
  });
