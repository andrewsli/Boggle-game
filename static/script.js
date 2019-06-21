
// handleFormSubmission and AJAX request to "/guess"
// # - prevent form default
// # - grab input
// # - LATER TO DO: check if word has already been guessed
// # - axios request to "/guess" using input as parameters
// # - based on response (ok, not-on-board, not-a-word) render different template (TO DO: figure out that logic)



async function handleFormSubmission(evt){
  evt.preventDefault(); // prevent form refresh
  let guessedWord = $("#guess").val();
  console.log("guessed word: ", guessedWord);

  let params = {"guess" : guessedWord}
  let response = await axios.get("/check-word", {params})
  console.log("JS handleFormSubmission: ", response.data) // {"result": something}
  $("#form").trigger("reset");

  return response.data 
}

$("#form").on("submit", handleFormSubmission)