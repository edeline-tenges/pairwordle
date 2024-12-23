import "./App.css";
import * as React from "react";
import anyapic from "./anya-wordle.png";
import WordlePage from "./WordlePage";
import InputPagePlayer1 from "./InputPage";

function App() {
  /**
   * pseudo code
   *
   * - store correct word
   * - have an array of guesses
   * for each string in the guesses array,render WordleRow
   *
   * input box for guess input
   * - on clicking Enter, add to guesses array
   *
   * WordleResultRow:
   * for each char (in the string from the guesses array),
   *  render WordleLetter
   *
   * WordleLetter:
   * if guess[0] === word[0] {
   *     return green
   *     }
   *     if word.includes(guess[0]), {
   *     return yellow
   *     }
   *     return grey
   *
   *
   * Parent component:
   * allow guesses if numOfGuesses < 6 AND
   * if last guess !== correctWord
   *
   * if lastGuess === correctWord, show success text
   */

  const [correctWord, setCorrectWord] = React.useState("");
  const [guesses, setGuesses] = React.useState([]);

  const onConfirmCorrectWord = (word) => {
    setCorrectWord(word);
  };

  const addGuess = (word) => {
    console.log("guess", word);
    setGuesses([...guesses, word]);
  };

  const onDoneGuessing = () => {
    setCorrectWord(""); //reset the word
    setGuesses([]); //reset the guesses
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={anyapic} alt="Anya Wordling" height={"240px"} />

        <p style={{ fontSize: "50px", margin: "24px" }}>✨ Pair Wordle ✨</p>

        {correctWord.length !== 5 ? (
          <InputPagePlayer1
            onSubmitPlayer1Words={setCorrectWord}
          ></InputPagePlayer1>
        ) : (
          <WordlePage
            guesses={guesses}
            addGuess={addGuess}
            correctWord={correctWord}
            onDoneGuessing={onDoneGuessing}
          />
        )}
      </header>
    </div>
  );
}

export default App;
