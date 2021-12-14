export default function makeExpressAdapter(controller) {
  return (request, response) => {
    const httpRequest = {
      headers: request.headers,
      params: request.params,
      body: request.body,
      user: request.user
    }

    controller(httpRequest)
      .then((httpResponse) => {
        const status = httpResponse.statusCode
        const body = httpResponse.body
        response.status(status).json(body)
      })
      .catch((error) => {
        const status = error.statusCode || 500
        const message = error.message || 'Something went wrong, please try again'
        response.status(status).json({ status, message })
      })
  }
}