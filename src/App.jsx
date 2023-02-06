
// IMPORTS
import { useState } from 'react'
import confetti from 'canvas-confetti'
import './App.css'
import { Square } from './components/Square.jsx'
import { TURNS } from './constants.js'
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'
import { saveGameToStorage, resetGameStorage } from './logic/storage'

// Componente App que almacenaŕa las 9 casillas del juego
function App() {
  
  // Estado que determinará la actualización del board
  const [board, setBoard] = useState(()=>{

    // Obtenemos board del local storage
    const boardFromStorgate = window.localStorage.getItem('board');

    // Y si existe, devolvemos el board almacenado, y si no, devolvemos un array vacío de 9 posiciones
    return boardFromStorgate ? JSON.parse(boardFromStorgate) : Array(9).fill(null)

  });

  // Estado que determinará el turno
  const [turn, setTurn] = useState(()=>{

    // Obtenemos el turno del local storage
    const turn = window.localStorage.getItem('turn');

    // Si existe, devolvemos el turno almacenado, y si no, devolvemos el turno X (por defecto al empezar la partida)
    return turn ?? TURNS.X;

  });

  // Estado que determinará si hay un ganador o es empate
  // Se genera enviando inicialmente valor null en winner y una función para actualizarlo 
  const [winner, setWinner] = useState(null);

  // Función para resetear el juego y volver a los valores por defecto
  const resetGame = ()=>{

    // Inicializamos el board con un array vacío de 9 posiciones
    setBoard(Array(9).fill(null));

    // Asignamos el turno por defecto
    setTurn(TURNS.X);

    // Ponemos el estado del ganador a null, para que no haya ganador
    setWinner(null);

    // Eliminamos la partida guardada en el local storage
    resetGameStorage();

    // Eliminamos el board guardado
    window.localStorage.removeItem('board');

    // Eliminamos el turno guardado
    window.localStorage.removeItem('turn');

  }

  // Función para actualizar el board, le enviamos el index de la casilla
  const updateBoard = index =>{ 

    // Si la posición contiene un valor, no actualizamos la casilla
    if(board[index] || winner)  return;

    // Creamos una copia superficial del board
    const newBoard = [...board];

    // Agregamos el valor de la casilla con el valor de turn, que será entre x/o
    newBoard[index] = turn;

    // Actualizamos el board con el valor de la copia para no modificar el componente, si no crear uno nuevo
    setBoard(newBoard);

    // Obtenemos el nuevo turno, si fue "x" será "o" y viceversa
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;

    // Actualizamos el turno
    setTurn(newTurn);

    // Guardamos la partida en el local storage
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    });
    

    // Comprobamos si hay un ganador, y si lo hay ejecutamos el estado del ganador con el valor x/o
    // Le enviamos como parametro el nuevo board, para asegurarnos de que comprobará el actual, (ES ASÍNCRONO )
    const newWinner = checkWinnerFrom(newBoard);

    // Si hay un ganador, actualizamos el estado con el valor del ganador
    if(newWinner){
      confetti();
      setWinner(newWinner);
      // Borramos la partida guardada
      resetGameStorage(); 
    }else{
      // Si no lo hay, comprobamos que no haya ninguna posición con valor null
      if(checkEndGame(newBoard)){
        // Si no hay ningun valor null, implica que ya se han jugado todas las casillas pero ningún ganador, es decir, empate
        setWinner(false);
        // Borramos la partida guardada
        resetGameStorage();
      }
    }

  }

  return (

    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {
          // Iteramos los valores de board, obteniendo cada casilla con su valor
          board.map((squareValue, index)=>{
            return(
              <Square key={index} index={index} updateBoard={updateBoard} checkWinner={checkWinnerFrom}>
                {squareValue}
              </Square>
            )
          })
        }
      </section>
      {/* Mostrará el turno que cambiará dependiendo del valor de turn*/}
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame}/>
    </main>
  )
}

export default App;
