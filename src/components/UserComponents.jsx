import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { Board } from './Board'
import { AttackButton } from './AttackButton'
import { BaseButton } from './BaseButton'

const UserComponents = ({
  cpuGame, basesSetup, restartGame, USER_BOARD, updateTotalBases,
  maxBasesReached,
  decreaseBases,
  soloGame
}) => {
  return (
    <div className='flex flex-col gap-8'>
          <h1>TABLERO 1 (USUARIO)</h1>
            <Suspense fallback={<h1>Cargando mapa</h1>}>
            {
              cpuGame && basesSetup && <>
                <p>tablero 1</p>
                  <Board restartGame={restartGame}>
                    {
                      USER_BOARD.map((item, index) =>
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
          <Suspense fallback={<p>Cargando mapa</p>} >
            {
              cpuGame &&
                <Board restartGame={restartGame}>
                <p>tablero 1</p>
                  {
                    USER_BOARD.map((item, index) =>
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
        </div>
  )
}

UserComponents.propTypes = {
  cpuGame: PropTypes.bool,
  basesSetup: PropTypes.bool,
  restartGame: PropTypes.func,
  USER_BOARD: PropTypes.array,
  updateTotalBases: PropTypes.func,
  maxBasesReached: PropTypes.func,
  decreaseBases: PropTypes.func,
  soloGame: PropTypes.func
}

export { UserComponents }
