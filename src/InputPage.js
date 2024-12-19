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
    <div className="vertical">
      <div> Enter a 5 letter word for your friend to guess! </div>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "40px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              <label for="firstWord">Word:</label>
              <input
                type="text"
                id="firstWord"
                name="firstWord"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter a 5 letter word"
                required
                style={{ height: "40px", fontSize: "20px" }}
              />
            </div>

            {showError && (
              <span style={{ color: "red", fontSize: "12px" }}>
                Your word should have exactly 5 letters
              </span>
            )}
          </div>

          <button
            type="submit"
            style={{ height: "40px", width: "150px", backgroundColor: "pink" }}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputPagePlayer1;
