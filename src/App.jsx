import { useState } from "react";
import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";
import Log from "./Components/Log";
import GameOver from "./Components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinnation";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "0";
  }
  return currentPlayer;
}

function derviveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function derviveWinner(gameBoard,players){
  let winner;
  for (const combinnation of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combinnation[0].row][combinnation[0].column];
    const secondSquareSymbol =
      gameBoard[combinnation[1].row][combinnation[1].column];
    const thirdSquareSymbol =
      gameBoard[combinnation[2].row][combinnation[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner
}

function App() {
  const [players,setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = derviveGameBoard(gameTurns);
  const winner = derviveWinner(gameBoard,players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handelSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }
  function handelRestart() {
    setGameTurns([]);
  }
  function handelPlayerNameChange(symbol,newName){
    setPlayers(prevPlayers=>{
      return{
        ...prevPlayers,
        [symbol]:newName
      }
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handelPlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handelPlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handelRestart} />
        )}
        <GameBoard onSelectSquare={handelSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
