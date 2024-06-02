import React from 'react'
import PropTypes from 'prop-types'

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

export { Board }
