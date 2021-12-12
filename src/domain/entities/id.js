import uuid from 'uuid'

export default function buildIdMaker() {
  return () => {

    return Object.freeze({
      generate: uuid.v4,
      validate: uuid.validate 
    })
  }
}