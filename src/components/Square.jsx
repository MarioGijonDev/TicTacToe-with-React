

// Componente de cada casilla
export const Square = ({children, isSelected, updateBoard, index})=>{

    // Nombre de la clase (puede ser is-selected, o estár vacío, si está vacío implica que no está seleccionado)
    const className = `square ${isSelected ? 'is-selected' : ''}`;
  
    // Función que será ejecutada al hacer click en el componente
    const handleClick = ()=>{
      // Actualiza el board, es decir, las 9 casillas
      updateBoard(index);
    }
  
    // El componente devuelve un div con el valor de la casilla
    return(
      <div className={className} onClick={handleClick}>
        {children}
      </div>
    )
}
