export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      <h2>GAME OVER !</h2>
      <p>{winner ? `won!` : `Its a Draw!`}</p>
      <p>
        <button onClick={onRestart}>Restart</button>
      </p>
    </div>
  );
}
