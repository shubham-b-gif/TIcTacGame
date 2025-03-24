import { useState } from "react";
export default function Player({ initialName, symbol, isActive, onChangeName }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  function editName() {
    setIsEditing((editing) => !editing);
    if(isEditing){

      onChangeName(symbol,playerName)
    }
  }
  function handelChange(event) {
    // console.log("event", event.target.value);
    setPlayerName(event.target.value);
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {!isEditing ? (
          <span className="player-name">{playerName}</span>
        ) : (
          <input
            type="text"
            required
            value={playerName}
            onChange={handelChange}
          />
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={editName}>{!isEditing ? "Edit" : "Save"}</button>
    </li>
  );
}
