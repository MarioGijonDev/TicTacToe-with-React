
export const saveGameToStorage = ({board, turn})=>{

    // Guardamos el board en el local storage
    window.localStorage.setItem('board', JSON.stringify(board));

    // Guardamos el turno en el local storage
    window.localStorage.setItem('turn', turn);

}

export const resetGameStorage = ()=>{

    // Eliminamos el board guardado
    window.localStorage.removeItem('board');

    // Eliminamos el turno guardado
    window.localStorage.removeItem('turn');

}