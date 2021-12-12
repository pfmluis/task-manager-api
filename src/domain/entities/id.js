import { v4, validate } from 'uuid'

export default function makeId() {
  return Object.freeze({
    generate: v4,
    validate
  })
}