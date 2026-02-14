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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, quote }),
      });

      if (response.ok) {
        navigate("/result", { state: { name, quote } });
      } else {
        setError("Failed to save quote.");
      }
    } catch {
      setError("Server error.");
    }
  };

  return (
    <div className="home-container">

      {/* TOP NAV */}
      <div className="navbar">
        <div className="logo">
          <span className="logo-icon">❝</span>
          QuoteVerse
        </div>

        {/* 🔥 FIXED BUTTON */}
        <button
          className="nav-btn"
          onClick={() => navigate("/result")}
        >
          Back to Feed
        </button>
      </div>

      {/* HERO */}
      <div className="hero">
        <h1>
          Inspire the <span>World</span>
        </h1>
        <p>Your words might be exactly what someone needs to hear today.</p>
      </div>

      {/* FORM CARD */}
      <div className="form-card">
        <form onSubmit={handleSubmit}>

          <label>AUTHOR NAME</label>
          <input
            type="text"
            placeholder="e.g., Marcus Aurelius"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>THE QUOTE</label>
          <textarea
            placeholder="Write something legendary..."
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            maxLength="280"
          />

          <button type="submit">
            ➤ Submit Quote
          </button>

          {error && <p className="error">{error}</p>}

        </form>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>
          By submitting, you agree to our <span>Community Guidelines</span> and <span>Terms of Service</span>.
        </p>

        <div className="footer-links">
          <a>About</a>
          <a>Guidelines</a>
          <a>Privacy</a>
        </div>

        <p className="copyright">
          © 2026 QUOTEVERSE. ALL RIGHTS RESERVED.
        </p>
      </footer>

    </div>
  );
}

export default Home;
