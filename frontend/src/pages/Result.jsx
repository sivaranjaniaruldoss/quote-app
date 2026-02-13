import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Result.css";

function Result() {
  const location = useLocation();
  const { name, quote } = location.state || {};

  const [bgImage, setBgImage] = useState("");
  const [previousQuotes, setPreviousQuotes] = useState([]);
  const [randomFont, setRandomFont] = useState("");

  useEffect(() => {
    const totalImages = 11;

    // ✅ Random background (image1.jpg → image11.jpg)
    const randomNumber =
      Math.floor(Math.random() * totalImages) + 1;

    setBgImage(`/images/image${randomNumber}.jpg`);

    // ✅ Random font
    const fonts = [
      "Georgia, serif",
      "'Courier New', monospace",
      "'Trebuchet MS', sans-serif",
      "'Lucida Handwriting', cursive",
      "'Times New Roman', serif"
    ];

    const randomFontIndex =
      Math.floor(Math.random() * fonts.length);

    setRandomFont(fonts[randomFontIndex]);

    // ✅ Fetch previous quotes
    fetch("http://localhost:5000/quotes")
      .then((res) => res.json())
      .then((data) => setPreviousQuotes(data))
      .catch((err) =>
        console.log("Error fetching quotes:", err)
      );

  }, []);

  return (
    <div
      className="result-container"
      style={{
        backgroundImage: `url(${bgImage})`
      }}
    >
      <div className="overlay"></div>

      <div className="content">
        <div className="main-quote">
          <h1 style={{ fontFamily: randomFont }}>
            "{quote}"
          </h1>
          <p className="author">— {name}</p>
        </div>

        <div className="previous-section">
          <h2>Previous Quotes</h2>

          <div className="quote-grid">
            {previousQuotes.map((item, index) => (
              <div key={index} className="quote-card">
                <p>"{item.quote}"</p>
                <small>— {item.name}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
