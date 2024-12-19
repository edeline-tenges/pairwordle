import * as React from "react";
import { useState } from "react";

const WordleRow = ({ word, correctWord }) => {
  return (
    <div className="flex">
      {word.split("").map((letter, index) => {
        const colour = getLetterColour({
          letter,
          correctLetter: correctWord[index],
        });
        return (
          <div
            key={index}
            className="w-12 h-12 border flex items-center justify-center"
            style={{ color: colour }}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
};

const getLetterColour = ({ letter, correctWord, correctLetter }) => {
  if (letter === correctLetter) {
    return "green";
  }
  if (correctWord.split("").includes(letter)) {
    return "yellow";
  }
  return "grey";
};

const EmptyRow = () => {
  return (
    <div className="row">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="box"></div>
      ))}
    </div>
  );
};

const MAX_GUESSES = 6;

const WordlePage = ({ guesses }) => {
  const numOfEmptyRows = MAX_GUESSES - guesses.length;

  const [draftGuess, setDraftGuess] = useState("");

  return (
    <div className="vertical">
      wordle page is here
      <input
        type="text"
        value={draftGuess}
        onChange={(e) => {
          const { value } = e.target;
          setDraftGuess(value);
        }}
      />
      <div className="wordle-container">
        {guesses.map((guess) => (
          <WordleRow word={guess} />
        ))}
        {Array.from({ length: numOfEmptyRows }).map((_, index) => (
          <EmptyRow />
        ))}
      </div>
    </div>
  );
};

export default WordlePage;
