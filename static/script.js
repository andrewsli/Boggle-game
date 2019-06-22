
correctlyGuessedWords = [];
GAME_TIME_IN_SEC = 60;

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

}

$("#form").on("submit", handleFormSubmission)

/* Modifies HTML based on validity of guessed word (from server response) */
function updateGame(responseObj, guessedWord){

  wordStatus = responseObj.result;
  updateMessage(wordStatus, guessedWord);
  
}

/* Updates response message based on validity of guessed word
   If word is valid, update score
*/
function updateMessage(wordStatus, guessedWord){
  
  $("#response-message").text(responseMessages[wordStatus]);

  if (wordStatus === "ok"){

    if(correctlyGuessedWords.includes(guessedWord)){
      $("#response-message").text("You already got that word!");
    }
    
    else{
      $("#validated-words").append(`<li>${guessedWord}</li>`);
      updateScore(guessedWord);
      correctlyGuessedWords.push(guessedWord)
    }
  }
}

/* updates score by adding word length */
function updateScore(guessedWord){
  let score = parseInt($("#score").text());
  $("#score").text(score + guessedWord.length);
}

/* counts down, and hides form in 60 seconds */
$(function(){
  // initialize timer
  $("#timer").text(GAME_TIME_IN_SEC)
  
  // start count down
  let timerID = setInterval(function(){
    let currentTime = parseInt($("#timer").text());
    if (currentTime === 1){
      $("#form").addClass("hidden")
    }
    $("#timer").text(currentTime - 1);
  },1000);
  
  setTimeout(function(){
    clearTimeout(timerID);
  },GAME_TIME_IN_SEC * 1000)
});

/* Object containing responses for various word guesses {word status: msg} */
responseMessages = {"ok": "Nice find!",
                    "not-word": "Not a valid word, try again.",
                    "not-on-board": "That word's not on the board, try again."}


// function updateMessage(wordStatus, guessedWord){
//   $("#response-message").text(responseMessages[wordStatus]);
//   if (wordStatus === "ok" && !correctlyGuessedWords.includes(guessedWord)){
//     $("#validated-words").append(`<li>${guessedWord}</li>`);
//     updateScore(guessedWord);
//     correctlyGuessedWords.push(guessedWord)
//   }
// }

