import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { Board } from './Board'
import { BaseButton } from './BaseButton'
import { AttackButton } from './AttackButton'

const CpuComponents = ({
  cpuGame, basesSetup, restartGame, CPU_BOARD, updateTotalBases,
  maxBasesReached,
  decreaseBases,
  soloGame
}) => {
  return (
    <div className='flex flex-col gap-8'>
            <h1>TABLERO 2 (CPU)</h1>
            <Suspense fallback={<p>Cargando mapa</p>} >
            {
              cpuGame &&
                <Board restartGame={restartGame}>
                <p>tablero 2</p>
                  {
                    CPU_BOARD.map((item, index) =>
                      <BaseButton
                        key={item.id}
                        item={item}
                        index={index}
                        updateTotalBases={updateTotalBases}
                        maxBases={maxBasesReached}
                        decreaseBases={decreaseBases}
                      />)
                  }
                </Board>
            }
          </Suspense>
            <Suspense fallback={<h1>Cargando mapa</h1>}>
            {
              cpuGame && basesSetup && <>
                <p>tablero 2</p>
                  <Board restartGame={restartGame}>
                    {
                      CPU_BOARD.map((item, index) =>
                        <AttackButton
                          key={item.id}
                          item={item}
                          index={index}
                        />)
                    }
                  </Board>
                </>
            }
            {
              !cpuGame && <button className='p-2 rounded-md bg-slate-300 hover:bg-slate-600' onClick={soloGame}>1 vs CPU</button>
            }
          </Suspense>
          </div>
  )
}

CpuComponents.propTypes = {
  cpuGame: PropTypes.bool,
  basesSetup: PropTypes.bool,
  restartGame: PropTypes.func,
  CPU_BOARD: PropTypes.array,
  updateTotalBases: PropTypes.func,
  maxBasesReached: PropTypes.func,
  decreaseBases: PropTypes.func,
  soloGame: PropTypes.func
}

export { CpuComponents }
