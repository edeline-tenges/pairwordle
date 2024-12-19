import * as React from "react";
import { useState } from "react";

const WordleRow = ({ word, correctWord }) => {
  return (
    <div className="row">
      {word.split("").map((letter, index) => {
        const colour = getLetterColour({
          word,
          correctWord,
          index,
        });
        return (
          <div
            key={index}
            className="box items-center justify-center"
            style={{ backgroundColor: colour }}
          >
            {letter.toUpperCase()}
          </div>
        );
      })}
    </div>
  );
};

const countOccurrences = (word, letter) => {
  return word.split(letter).length - 1;
};

function removeLetterAt(word, index) {
  return word.slice(0, index) + word.slice(index + 1);
}

const getLetterColour = ({ word, correctWord, index }) => {
  const letter = word[index];
  console.log("print index", index);
  console.log("print letter", letter);

  if (letter === correctWord[index]) {
    return "#4dd141"; // green
  }
  if (!correctWord.split("").includes(letter)) {
    return "b0b0b0"; // grey
  }

  const numberInWord = countOccurrences(removeLetterAt(word, index), letter);
  const numberInCorrectWord = countOccurrences(
    removeLetterAt(correctWord, index),
    letter
  );
  console.log("print numberInWord", numberInWord);
  console.log("print numberInCorrectWord", numberInCorrectWord);

  if (numberInCorrectWord < numberInWord + 1) {
    return "b0b0b0"; // grey
  }
  return "#ffe045"; // yellow
};

const EmptyRow = () => {
  return (
    <div className="row">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="box white"></div>
      ))}
    </div>
  );
};

const MAX_GUESSES = 6;

const WordlePage = ({ guesses, addGuess, correctWord, onDoneGuessing }) => {
  const numOfEmptyRows = MAX_GUESSES - guesses.length;

  const [draftGuess, setDraftGuess] = useState("");

  const hasHitMaxGuesses = numOfEmptyRows === 0;

  const lastGuess = guesses[guesses.length - 1];
  const doneGuessing = lastGuess
    ? lastGuess === correctWord || hasHitMaxGuesses
    : false;

  return (
    <div className="vertical">
      <div className="row">
        <input
          type="text"
          value={draftGuess}
          disabled={hasHitMaxGuesses}
          onChange={(e) => {
            const { value } = e.target;
            setDraftGuess(value);
          }}
          style={{ fontSize: "16px" }}
        />
        <button
          type="submit"
          disabled={hasHitMaxGuesses}
          onClick={() => {
            addGuess(draftGuess);
            setDraftGuess(""); // reset the input box
          }}
          style={{ height: "40px", width: "100px", backgroundColor: "pink" }}
        >
          Submit
        </button>
      </div>

      <div className="wordle-container">
        {guesses.map((guess) => (
          <WordleRow word={guess} correctWord={correctWord} />
        ))}
        {Array.from({ length: numOfEmptyRows }).map((_, index) => (
          <EmptyRow />
        ))}
      </div>
      {doneGuessing && (
        <div className="vertical">
          <div>
            {lastGuess === correctWord
              ? "Nice"
              : `Word: ${correctWord.toUpperCase()}`}
          </div>
          <button
            onClick={() => {
              onDoneGuessing();
            }}
          >
            Back to input
          </button>
        </div>
      )}
    </div>
  );
};

export default WordlePage;
