function mapApiArr (data) {
  const newData = data.map((item) => {
    return {
      coordinate: item.position,
      base: item.haveBase,
      attacked: item.hasAttacked,
      id: item._id
    }
  })
  return newData
}

function mapApiElement (data) {
  return {
    coordinate: data.position,
    base: data.haveBase,
    attacked: data.hasAttacked,
    id: data._id
  }
}

function loadBases () {
  const bases = []
  const letters = ['A', 'B', 'C', 'D', 'E', 'F']

  for (let i = 0; i < 3; i++) {
    const randomLetterIndex = Math.floor(Math.random() * letters.length)
    const randomLetter = letters[randomLetterIndex]
    const randomNumber = Math.floor(Math.random() * 6) + 1

    bases.push(randomLetter + randomNumber)
  }

  return bases
}

export { mapApiArr, mapApiElement, loadBases }
