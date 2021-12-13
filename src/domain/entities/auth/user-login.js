export default function buildMakeUserLogin({ validator }) {
  return ({
    email,
    password,
  }) => {
    const { isValid, error } = validator({ email, password })
    if (!isValid) throw new Error(error)

    return Object.freeze({
      getEmail: () => email,
      getPassword: () => password,
    })
  }
}