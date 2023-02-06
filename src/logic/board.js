
// IMPORTS
import { WINNER_COMBOS } from "../constants";

// Comprobar si hay ganador, enviamos el board que vamos a comprobar
export const checkWinnerFrom = (boardToCheck) => {

    // Iteramos cada uno de los posibles combos ganadores
    for(const combo of WINNER_COMBOS){
      // Obtenemos el combio
      const [a, b, c] = combo;
      // Comprobamos que exista un valor en la posición a, que sea el mismo valor que en b y en c
      if(boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c])
        // En ese caso, devolvemos el valor de a (es igual que b y c) que nos indicará si ha ganado x/o
        return boardToCheck[a];
    }
}

// Si ninguna casilla tiene valor null, ha finalizado el juego
export const checkEndGame = newBoard =>{
    return newBoard.every((square) => square !== null);
}