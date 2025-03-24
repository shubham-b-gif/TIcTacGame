import { useState } from "react";
export default function Player({ initialName, symbol, isActive }) {
  const [playerNAME, setPlayerNAME] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  function editName() {
    setIsEditing((editing) => !editing);
  }
  function handelChange(event) {
    // console.log("event", event.target.value);
    setPlayerNAME(event.target.value);
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {!isEditing ? (
          <span className="player-name">{playerNAME}</span>
        ) : (
          <input
            type="text"
            required
            value={playerNAME}
            onChange={handelChange}
          />
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={editName}>{!isEditing ? "Edit" : "Save"}</button>
    </li>
  );
}
