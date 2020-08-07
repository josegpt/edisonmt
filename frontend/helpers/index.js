import constants from "./constants.json"

function createC(constants) {
  if (constants === undefined) {
    return {}
  }

  return (key) => constants[key]
}

export default createC(constants)
