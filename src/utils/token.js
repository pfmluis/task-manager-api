import jwt from 'jsonwebtoken'

function generateToken(data) {
  const secret = process.env.JWT_SECRET
  const expiresIn = process.env.JWT_EXPIRES_IN

  return new Promise((resolve, reject) => {
    jwt.sign(data, secret, { expiresIn }, (error, encoded) => {
      if (error) reject(error)

      resolve(encoded)
    })
  })
}

function verify(token) {
  const secret = process.env.JWT_SECRET

  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) reject(error)

      resolve(decoded)
    })
  })
}

async function getAuthResponse(user) {
  const expires_in = process.env.JWT_EXPIRES_IN / 1000
  const token_type = process.env.JWT_TOKEN_TYPE
  const userData = {
    sid: user.getSid(),
    role: user.getRole(),
    permissions: user.getPermissions()
  }
  const access_token = await generateToken(userData)

  return {
    expires_in,
    token_type,
    access_token
  }

}

const tokenManager = Object({ generateToken, getAuthResponse, verify })
export default tokenManager
