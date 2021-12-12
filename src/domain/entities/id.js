import uuid from 'uuid'

export default function buildMakeId() {
  return () => {
    return Object.freeze({
      generate: uuid.v4,
      validate: uuid.validate
    })
  }
}