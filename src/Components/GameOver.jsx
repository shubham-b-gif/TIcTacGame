export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      <h2>GAME OVER !</h2>
      {winner && <p>{winner} won!</p>}
      {!winner && <p>It's a draw!</p>}
      
      <p>
        <button onClick={onRestart}>Restart</button>
      </p>
    </div>
  );
}
