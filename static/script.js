

/** Handle submission of word guess by:
 * - Sending guessed word to server ("check-word") to validate 
 * - Passing server response to updateGame
 */
async function handleFormSubmission(evt){
  evt.preventDefault(); 
  let guessedWord = $("#guess").val();
  // console.log("guessed word: ", guessedWord);

  let params = {"guess" : guessedWord}
  let response = await axios.get("/check-word", {params})
  // console.log("JS handleFormSubmission: ", response.data) // {"result": something}
  $("#form").trigger("reset");

  updateGame(response.data, guessedWord);

  return
}

$("#form").on("submit", handleFormSubmission)

/* Modifies HTML based on validity of guessed word (from server response) */
function updateGame(responseObj, guessedWord){

  wordStatus = responseObj.result;

  if (wordStatus === "ok"){
    $("#response-message").text("Nice find!");
    $("#validated-words").append(`<li>${guessedWord}</li>`);

  } else if (wordStatus === "not-word"){
    $("#response-message").text("Not a valid word, try again");

  } else if (wordStatus === "not-on-board"){
    $("#response-message").text("That word's not on the board, try again");
  }

  return
}