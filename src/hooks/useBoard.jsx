import { useState, useEffect } from 'react'
import { newGame } from '../api/get'

function useBoard ({ id }) {
  const [board, setBoard] = useState([])
  const [loading, setLoading] = useState(false)

  async function generateBoard () {
    const newBoard = await newGame({ id })
    setBoard(newBoard)
    setLoading(false)
  }

  useEffect(() => {
    if (board.length === 0 && !loading) {
      setLoading(true)
      generateBoard()
    }
  }, [loading])

  return board
}

export { useBoard }
