import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [name, setName] = useState("");
  const [quote, setQuote] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !quote.trim()) {
      setError("Both fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, quote }),
      });

      if (response.ok) {
        navigate("/result", { state: { name, quote } });
      } else {
        setError("Failed to save quote.");
      }
    } catch (err) {
      setError("Server error.");
    }
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h2>Share Your Wisdom</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            placeholder="Write your quote..."
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
          />

          <button type="submit">Submit Quote</button>

          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Home;
