import React, { useState, useEffect } from "react";
import "./App.css";

const randomPosition = () => ({
  top: `${Math.random() * 90}vh`, // Random position in viewport height
  left: `${Math.random() * 100 - 40}vw`, // Random position in viewport width
});

const App: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [correctButtonPosition, setCorrectButtonPosition] = useState(
    randomPosition()
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name && password) {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    // Randomly position the correct button every 2 seconds
    const interval = setInterval(() => {
      setCorrectButtonPosition(randomPosition());
    }, 2000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="App">
      {isLoggedIn ? (
        <h1>Welcome, {name}! You have successfully logged in.</h1>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ position: "relative", height: "100vh" }}
        >
          <h1>Login</h1>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Render multiple buttons */}
          {Array.from({ length: 500 }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={index === 0 ? handleSubmit : undefined} // Only the first button works
              style={{
                position: "absolute",
                ...randomPosition(),
              }}
            >
              Enter
            </button>
          ))}
          <button
            type="button"
            style={{ position: "absolute", ...correctButtonPosition }}
            onClick={handleSubmit}
          >
            Enter
          </button>
        </form>
      )}
    </div>
  );
};

export default App;
