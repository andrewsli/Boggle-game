from boggle import Boggle
from flask import Flask, request, render_template, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension
import unittest

boggle_game = Boggle()

app = Flask(__name__)
app.config["SECRET_KEY"] = "SUPER-SECRET-KEY"

debug = DebugToolbarExtension(app)


@app.route("/")
def display_game():
    """
    creates and displays new boggle board
    """
    boggle_grid = boggle_game.make_board()
    session["letters_board"] = boggle_grid
    print(session["letters_board"])
    return render_template("boggle.html", letters_grid=boggle_grid)


@app.route('/check-word')
def handle_guess():
    """
    handles guess submission by:
    - validating if word has been guessed already
    - finding the word in the board
    - returns verdict as json
    """
    guessed_word = request.args["guess"] 
    # write code to handle checking valid/finding guess
    verdict = boggle_game.check_valid_word(session["letters_board"], guessed_word)
    result = {"result": verdict}
    print("PY handle_guess validation result:", result)
    return jsonify(result)

# Notes on @app.route above
# In JS we will axios.get("/guess") --> this will return something like {"result": "ok"}
# Next we'll use the ok, not-on-board, or not-a-word to determine how to modify HTML and game state
# Also maybe words that were guessed...?

# After lunch - switch to JS file handleFormSubmission and AJAX request to "/guess"
# - prevent form default
# - grab input
# - LATER TO DO: check if word has already been guessed
# - axios request to "/guess" using input as parameters
# - based on response (ok, not-on-board, not-a-word) render different template (TO DO: figure out that logic)

