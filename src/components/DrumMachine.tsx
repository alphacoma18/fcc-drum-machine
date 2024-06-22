"use client";

import { useEffect, useState } from "react";

interface KeyMapType {
  [key: string]: string;
}

const keyMap: KeyMapType = {
  q: "Heater-1",
  w: "Heater-2",
  e: "Heater-3",
  a: "Heater-4",
  s: "Clap",
  d: "Open-HH",
  z: "Kick-n-Hat",
  x: "Kick",
  c: "Closed-HH",
};

export default function DrumMachine() {
  const [displayText, setDisplayText] = useState("");

  const handleDrumPadClick = (audioClipName: string) => {
    setDisplayText(audioClipName);
    playAudio(audioClipName);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    const audioClipName = keyMap[event.key.toLowerCase()];
    if (audioClipName) {
      handleDrumPadClick(audioClipName);
    }
  };

  const playAudio = (audioClipName: string) => {
    const audioElement = document.getElementById(audioClipName) as HTMLAudioElement;
    audioElement.currentTime = 0;
    audioElement.play();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div
      id="drum-machine"
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#1e1e1e] to-[#121212] text-white"    >
      <div id="display" className="mb-8 text-2xl font-bold tracking-wider bg-[#222222] px-4 py-2 rounded-md shadow-md">
        {displayText}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(keyMap).map(([key, value]) => (
          <div
            key={value}
            id={key.toUpperCase()}
            className="drum-pad bg-[#444444] hover:bg-[#555555] active:bg-[#333333] rounded-md shadow-md p-4 cursor-pointer transition-colors"
            onClick={() => handleDrumPadClick(value)}
          >
            <audio id={value} className="clip">
              <source src={`/assets/${value}.mp3`} />
            </audio>
            {key.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
}
