import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import "./Result.css";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const name = location.state?.name;
  const quote = location.state?.quote;

  const [previousQuotes, setPreviousQuotes] = useState([]);
  const [randomFont, setRandomFont] = useState("");

  useEffect(() => {
    const fonts = [
      "Georgia, serif",
      "'Playfair Display', serif",
      "'Cormorant Garamond', serif",
      "'Merriweather', serif"
    ];

    const randomFontIndex =
      Math.floor(Math.random() * fonts.length);

    setRandomFont(fonts[randomFontIndex]);

    fetch("http://localhost:5000/quotes")
      .then((res) => res.json())
      .then((data) => setPreviousQuotes(data))
      .catch((err) =>
        console.log("Error fetching quotes:", err)
      );
  }, []);

  // 🔥 DOWNLOAD FUNCTION
  const handleDownload = async (index) => {
    const element = document.getElementById(`quote-card-${index}`);

    if (!element) return;

    const canvas = await html2canvas(element);
    const link = document.createElement("a");

    link.download = "quote.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="result-container">

      {/* HERO SECTION */}
      {quote && name && (
        <div className="hero-section">

          <div className="quote-mark">❝</div>

          <h1
            className="hero-quote"
            style={{ fontFamily: randomFont }}
          >
            {quote}
          </h1>

          <div className="author-line">
            <div className="divider"></div>
            <p className="author">— {name}</p>
          </div>

          <button
            className="back-btn"
            onClick={() => navigate("/")}
          >
            Submit Another
          </button>

        </div>
      )}

      {/* PREVIOUS QUOTES */}
      <div className="previous-section">
        <h2>Previous Quotes</h2>

        {previousQuotes.length === 0 ? (
          <p className="empty">
            No quotes yet. Be the first to inspire ✨
          </p>
        ) : (
          <div className="quote-grid">
            {previousQuotes.map((item, index) => {

              const totalImages = 11;
              const randomNumber =
                Math.floor(Math.random() * totalImages) + 1;

              const cardImage =
                `/images/image${randomNumber}.jpg`;

              return (
                <div
                  key={index}
                  id={`quote-card-${index}`}
                  className="quote-card"
                  style={{
                    backgroundImage: `url(${cardImage})`
                  }}
                >
                  <div className="card-overlay"></div>

                  <div className="card-content">
                    <p>"{item.quote}"</p>
                    <small>— {item.name}</small>

                    {/* DOWNLOAD BUTTON */}
                    <button
                      className="download-btn"
                      onClick={() => handleDownload(index)}
                    >
                      Download
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}

export default Result;
