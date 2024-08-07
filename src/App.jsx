import confetti from 'canvas-confetti'
import React, { Children, useState } from 'react'
import { Square } from './components/Square'
import { TURNS, WINNER_COMBOS } from './constants'
import { WinnerModal } from './components/WinnerModal'

export default function App() {

  //Inicializo mi tablero
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)
  //Null = default
  //false = empate

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {

      const [a, b, c] = combo

      if (
        boardToCheck[a] && //0
        boardToCheck[a] === boardToCheck[b] && //0 = 1
        boardToCheck[a] === boardToCheck[c] // 0 = 1 = 2 
      ) {
        return boardToCheck[a]
      }

    }
  }


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {

    return newBoard.every((square) => square !== null)

  }

  const updateBoard = (index) => {
    //Evitar actualizar la posicion
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X

    setTurn(newTurn)

    //Revisar si hay un ganador
    const newWinner = checkWinner(newBoard)

    if (newWinner) {

      //Actualización del estado ASINCRONO!
      confetti()
      setWinner(newWinner)

    } else if (checkEndGame(newBoard)) {

      setWinner(false)


    }


  }

  return (


    <main className='board'>

      <h1>El gato 🐈</h1>

      <button onClick={resetGame}>Reiniciar Juego</button>

      <section className='game'>
        {
          board.map((_, index) => {

            return (

              <Square

                key={index}
                index={index}
                updateBoard={updateBoard}

              >

                {board[index]}

              </Square>

            )
          })
        }

      </section>
      <section className='turn'>

        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>


      </section>

      <WinnerModal

        resetGame={resetGame}
        winner={winner}

      />

    </main>


  )

}



