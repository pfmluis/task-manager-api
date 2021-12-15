export const tokenManagerStub = {
  generateToken: () => 'eyasdasd.asdasdasd.asdasdas',
  verify: () => true,
  getAuthResponse: () => ({
    expires_in: 3600,
    token_type: 'Bearer',
    access_token: 'eyasdasd.asdasdasd.asdasdas'
  })
}