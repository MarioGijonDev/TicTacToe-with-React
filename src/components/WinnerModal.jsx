
// IMPORTS
import { Square } from "./Square.jsx";

export function WinnerModal({winner, resetGame}) {

    // Si no hay ganador, retornamos null para parar la ejecución de la función
    if(winner === null) return null;

    // Si es falso, significa que es empate, si no, es que hay un ganador
    const winnerText = winner === false ? 'Empate' : 'Ganó:';

    return (
        <section className="winner">
            <div className="text">
                <h2>{winnerText}</h2>
                <header className='win'>
                    {/* Muestra el ganador */}
                    {winner && <Square>{winner}</Square>}
                </header>
                <footer>
                    <button onClick={resetGame}>Empezar de nuevo</button>
                </footer>
            </div>
        </section>
    )

}
