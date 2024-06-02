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

export { mapApiArr, mapApiElement }
