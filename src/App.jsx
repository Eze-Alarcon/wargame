import React, { useState, useEffect } from 'react'
import { Board } from './components/Board.jsx'
import { BaseButton } from './components/BaseButton.jsx'
import { AttackButton } from './components/AttackButton.jsx'
import { innitGame } from './utils/utils.js'
import { deleteTable } from './api/delete.js'
import { useBases } from './hooks/useBases.jsx'

function App () {
  const [cpuGame, setCpuGame] = useState(true)
  const { updateTotalBases, maxBasesReached, resetBases, decreaseBases } = useBases()
  function soloGame () {
    setCpuGame(true)
  }

  const [gameMap, setGameMap] = useState([])

  async function generateMap () {
    const newGameMap = await innitGame()
    setGameMap(newGameMap)
  }

  async function restartGame (e) {
    e.preventDefault()
    await deleteTable()
    setGameMap([])
    resetBases()
  }

  useEffect(() => {
    if (gameMap.length === 0) generateMap()
  }, [gameMap])
  return (
    <main className='p-3 '>
      <section className="flex gap-8">
        {
          cpuGame
            ? <>
              <Board restartGame={restartGame}>
                {
                  gameMap.map((item, index) =>
                    <AttackButton
                      key={item.id}
                      item={item}
                      index={index}
                    />)
                }
              </Board>
            </>
            : <button className='p-2 rounded-md bg-slate-300 hover:bg-slate-600' onClick={soloGame}>1 vs CPU</button>
        }

        {
          cpuGame &&
            <Board restartGame={restartGame}>
              {
                gameMap.map((item, index) =>
                  <BaseButton
                    key={item.id}
                    id={item.id}
                    coordinate={item.coordinate}
                    index={index}
                    updateTotalBases={updateTotalBases}
                    maxBases={maxBasesReached}
                    decreaseBases={decreaseBases}
                  />)
              }
            </Board>
        }
      </section>
      {
        cpuGame &&
        <button
          type='button'
          className='mt-3 p-2 rounded-md border-2 bg-slate-300 hover:bg-slate-600'
          onClick={restartGame}>
          Restart
        </button>
      }
    </main>
  )
}

export default App
