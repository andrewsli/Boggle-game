from boggle import Boggle
from flask import Flask, request, render_template, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension

boggle_game = Boggle()

app = Flask(__name__)
app.config["SECRET_KEY"] = "SUPER-SECRET-KEY"

debug = DebugToolbarExtension(app)


@app.route("/")
def display_game():
    """
    Creates and displays new boggle board
    """
    BOGGLE_GRID = boggle_game.make_board()
    session["letters_board"] = BOGGLE_GRID
    # print(session["letters_board"])
    return render_template("boggle.html", letters_grid=BOGGLE_GRID)


@app.route('/check-word')
def handle_guess():
    """
    Handles word guess submission by:
    - validating if word has been guessed already
    - finding the word in the board
    - returns verdict as json
    """
    guessed_word = request.args["guess"] 
    verdict = boggle_game.check_valid_word(session["letters_board"], guessed_word)
    result = {"result": verdict}
    return jsonify(result)
