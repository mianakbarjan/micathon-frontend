import React, { useState, useEffect } from "react";

const TextToSpeech = ({ text }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    synth.speak(u);

    setUtterance(u);
    
    return () => {
      synth.cancel();
    };
  }, [text]);


  return (
    <div>
      </div>
  );
};

export default TextToSpeech;


