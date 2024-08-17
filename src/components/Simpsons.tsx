import React, { useState, useEffect } from "react";
import axios from "axios";

interface Quote {
    quote: string;
    character: string;
    image: string;
    characterDirection: string;
}


const Simpsons = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [error, setError] = useState("");

  const getQuotes = async () => {
    try {
      const response = await axios.get(
        "https://thesimpsonsquoteapi.glitch.me/quotes?count=20"
      );
      setQuotes(response.data);
      if (response.data.length > 0) {
        setCurrentQuote(response.data[Math.floor(Math.random() * response.data.length)]);
      }
      setError("");
    } catch (err) {
      setError("Failed to fetch quotes. Please try again later.");
      console.error(err);
    }
  };

  useEffect(() => {
    getQuotes();
  }, []);

  const getRandomQuote = () => {
    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    }
  };

  return (
    <div className="Quotes " style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: 400, margin: "30px auto", backgroundColor: "crimson" , height: "520px", color: "#fff", padding: 20, gap: 10}}>
      <h1>Simpson's Quotes</h1>
      {error && <p className="error">{error}</p>}
      {currentQuote && (
        <>
          <p>{currentQuote.quote}</p>
          <img src={currentQuote.image} alt={currentQuote.character} width={150} />
          <p>{currentQuote.character}</p>
        </>
      )}
      <button type="button" onClick={getRandomQuote} style={{padding: "10px 30px", fontWeight: "bold", color: "crimson", cursor: "pointer"}}>
        Get Random Quote
      </button>
    </div>
  );
};

export default Simpsons;
