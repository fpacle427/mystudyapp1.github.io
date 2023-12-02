import React, { useState, useEffect, useRef } from 'react';
import './MotivationalQuotes.css'; // Import your main stylesheet
const Quote = require('inspirational-quotes');

function App() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const newQuote = Quote.getRandomQuote();
    setQuote(newQuote);

    const interval = setInterval(() => {
      const newQuote = Quote.getRandomQuote();
      setQuote(newQuote);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollingTextStyle = {
    position: 'fixed',
    top: '20px', 
    right: '10px',
    color: 'white',
    fontSize: '18px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    animation: 'scrollText 15s linear infinite',
  };

  const keyframes = `
    @keyframes scrollText {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(-100%);
      }
    }
  `;

  const textRef = useRef(null);

  const handleAnimationIteration = () => {
    const newQuote = Quote.getRandomQuote();
    setQuote(newQuote);
  };

  useEffect(() => {
    const textElement = textRef.current;
    textElement.addEventListener('animationiteration', handleAnimationIteration);
    return () => {
      textElement.removeEventListener('animationiteration', handleAnimationIteration);
    };
  }, []);

  return (
    <div className="pomodoro-app">
      <style>{keyframes}</style>
      <div ref={textRef} style={scrollingTextStyle}>
        {quote}
      </div>
    </div>
  );
}

export default App;
