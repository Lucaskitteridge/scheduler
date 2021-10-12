import { useState } from "react";

//Set the mode to transition apporpriatly depending on the state
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      const newHistory = [...history];
      newHistory.splice([newHistory.length - 1], 1 , newMode);
      setHistory(newHistory);
      setMode(newMode);
    } else {
      setMode(newMode);
      setHistory(prev => [...prev, newMode]);
    }
  };

  const back = ()  => {
    if (history.length > 1) {
      const newHistory = [...history];
      console.log(newHistory)
      newHistory.pop();
      setMode(newHistory[newHistory.length - 1]);
      setHistory(newHistory);
    }
  };

  return { mode, transition, back };
}