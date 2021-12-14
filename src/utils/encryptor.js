import crypto from 'crypto'

const algorithm = process.env.ENCRYPTOR_ALGORITHM
const secret = process.env.ENCRYPTOR_SECRET;

function encrypt(string) {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(algorithm, secret, iv)
  const encrypted = Buffer.concat([cipher.update(string), cipher.final()])

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex')
};;
}

function decrypt(hash) {
  const decipher = crypto.createDecipheriv(algorithm, secret, Buffer.from(hash.iv, 'hex'));
  const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    return decrpyted.toString()
}

export default Object.freeze({
  encrypt,
  decrypt
})