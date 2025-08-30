"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function GameBoard() {
  const [players, setPlayers] = useState([
    { name: "Player 1", score: 0 },
    { name: "Player 2", score: 0 },
  ]);
  const [turn, setTurn] = useState(0);
  const [word, setWord] = useState("");
  const [history, setHistory] = useState([]);
  const [timer, setTimer] = useState(15);

  // coountdown
  useEffect(() => {
    if (timer === 0) {
      handleFail();
      return;
    }
    const countdown = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(countdown);
  }, [timer]);

  const handleFail = () => {
    let newPlayers = [...players];
    newPlayers[turn].score -= 1;
    setPlayers(newPlayers);
    nextTurn();
  };

  const nextTurn = () => {
    setTurn((turn + 1) % 2);
    setTimer(15);
    setWord("");
  };

  const submitWord = async () => {
    if (word.length < 4) return alert("Word too short!");
    if (history.includes(word)) return alert("Word already used!");

    // checking starting letters
    if (history.length > 0) {
      const last = history[history.length - 1];
      if (word[0].toLowerCase() !== last[last.length - 1].toLowerCase()) {
        return handleFail();
      }
    }

    // validating dictionary
    const res = await axios.post("/api", { word });
    if (!res.data.valid) return handleFail();

    // correct words
    setHistory([...history, word]);
    let newPlayers = [...players];
    newPlayers[turn].score += 1;
    setPlayers(newPlayers);
    nextTurn();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mt-64">Shiritori Game</h1>
      <p className="text-center">
        Turn: {players[turn].name} (⏳ {timer}s)
      </p>

      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        className="border p-2 rounded w-full my-2"
        placeholder="Enter a word..."
      />
      <button
        onClick={submitWord}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>

      <h2 className="mt-4 font-semibold">Scores:</h2>
      <ul>
        {players.map((p, i) => (
          <li key={i}>
            {p.name}: {p.score}
          </li>
        ))}
      </ul>

      <h2 className="mt-4 font-semibold">History:</h2>
      <ul>
        {history.map((w, i) => (
          <li key={i}>{w}</li>
        ))}
      </ul>
    </div>
  );
}
