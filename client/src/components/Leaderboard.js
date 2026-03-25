import React, { useEffect, useState } from "react";
import { getLeaderboard, addPlayer } from "../services/api";

function Leaderboard() {

  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");
  const [score, setScore] = useState("");

  const loadLeaderboard = async () => {
    const res = await getLeaderboard();
    setPlayers(res.data);
  };

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const player = {
      name: name,
      score: parseInt(score)
    };

    await addPlayer(player);

    setName("");
    setScore("");

    loadLeaderboard();
  };

  return (
    <div>
      <h2>Leaderboard</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Player Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />

        <button type="submit">Add Player</button>
      </form>

      <ul>
        {players.map((p, index) => (
          <li key={index}>
            {p.name} - {p.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;