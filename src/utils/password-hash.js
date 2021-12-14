import bcrypt from 'bcrypt'

function encrypt(string) {
  const saltRounds = +process.env.SALT_ROUNDS

  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) reject(err)

      bcrypt.hash(string, salt, (err, hash) => {
        if (err) reject(err)

        resolve(hash)
      })
    })
  })
}

function compare(decryptedString, encryptedString) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(decryptedString, encryptedString, (err, isSame) => {
      if (err) reject(err)

      resolve(isSame)
    })
  })
}

export default Object({
  encrypt,
  compare
})
