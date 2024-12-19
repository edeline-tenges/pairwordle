import React, { useState } from "react";

const InputPagePlayer1 = ({ onSubmitPlayer1Words }) => {
  // State to manage form data
  const [formData, setFormData] = useState({
    firstWord: "",
  });
  const [showError, setShowError] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Call your custom function
    handleFormSubmission(formData);
  };

  // Custom function to handle form submission logic
  const handleFormSubmission = (data) => {
    if (data.firstWord.length !== 5) {
      setShowError(true);
      return;
    }
    setShowError(false);
    onSubmitPlayer1Words(data.firstWord);
  };

  return (
    <div>
      <title> Player 1 - Enter a word for Player 2 to guess </title>

      <form onSubmit={handleSubmit}>
        <label for="fname">Word:</label>
        <input
          type="text"
          id="firstWord"
          name="firstWord"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter a 5 letter word"
          required
        />
        {showError && (
          <span style={{ color: "red" }}>
            Your word should have exactly 5 letters
          </span>
        )}

        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default InputPagePlayer1;
