import Header from "./Header";
import { useState, useEffect } from 'react';

function Generate(props) {
  const [initialText] = useState(props.submitButton.vision_response);
  const [generatedText, setGeneratedText] = useState("");
  const [index, setIndex] = useState(0);
  const [textLength, setTextLength] = useState(initialText.length);

  useEffect(() => {
    setTextLength(initialText.length); // Initialize text length
    const interval = setInterval(() => {
      if (index < textLength) {
        setGeneratedText((prev) => prev + initialText[index]);
        setIndex(index + 1);
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, [index, textLength, initialText]);

  return (
    <div className="flex flex-col items-center pt-20 h-screen bg-black text-center">
      <h1 className="text-5xl text-white">Description</h1>
      <p className="text-xl mt-4 text-white">{generatedText}</p>
    </div>
  );
}

export default Generate;
