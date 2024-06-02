import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { GAME_CONFIG } from '../test/inputs.js'
import { innitGame } from './utils/utils.js'
import { updatePosition } from './api/put.js'
import { deleteTable } from './api/delete.js'
import { useBases } from './hooks/useBases.jsx'

BaseButton.propTypes = {
  id: PropTypes.string,
  coordinate: PropTypes.string,
  index: PropTypes.number,
  updateTotalBases: PropTypes.func,
  maxBases: PropTypes.func,
  decreaseBases: PropTypes.func
}

function BaseButton ({ id, coordinate, index, updateTotalBases, maxBases, decreaseBases }) {
  const [base, setBase] = useState(false)

  const nextRow = index !== 0 && index % GAME_CONFIG.BOARD_SIZE === 0

  async function placeBase (e) {
    e.preventDefault()

    if (base) {
      setBase(false)
      decreaseBases()
      return
    }

    if (maxBases()) { return }

    setBase(true)
    updateTotalBases()
  }

  return (
    <>
        { nextRow && <br/> }
        <button
          className={`h-10 w-10 p-1 border-2 ${!base ? 'hover:bg-green-300 bg-none' : 'bg-green-500'}`}
          onClick={placeBase}
          id={id}
        >
          <p>{coordinate}</p>
        </button>
    </>
  )
}

AttackButton.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number
}

function AttackButton ({ item, index }) {
  const {
    id,
    base,
    attacked,
    coordinate
  } = item

  const nextRow = index !== 0 && index % GAME_CONFIG.BOARD_SIZE === 0

  const [active, setActive] = useState(attacked)

  async function attackPosition (e) {
    e.preventDefault()

    if (e.currentTarget.diabled) { return }
    e.currentTarget.diabled = true
    setActive(true)

    // actualizar esto
    await updatePosition({ id: e.currentTarget.id, idTablero: 1 })
  }

  return (
    <>
        { nextRow && <br/> }
        <button
          className={`h-10 w-10 p-1 border-2 hover:bg-gray-200 disabled:bg-red-300 ${base && 'bg-green-300'}`}
          disabled={active}
          onClick={attackPosition}
          id={id}
        >
          <p>{coordinate}</p>
        </button>
    </>
  )
}

Board.propTypes = {
  children: PropTypes.array
}

function Board ({ children }) {
  return (
    <>
      <article>
        { children }
      </article>
    </>
  )
}

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
