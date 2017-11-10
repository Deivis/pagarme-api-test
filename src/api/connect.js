import pagarme from 'pagarme'

let client

export default async function connect() {
  if (client) {
    return Promise.resolve(client)
  }
  return pagarme.client
    .connect({
      encryption_key: process.env.API_TEST_ENCRIPT_KEY,
      api_key: process.env.API_TEST_KEY,
    })
    .then((clientResponse) => {
      client = clientResponse
      return client
    })
    .catch((error) => {
      console.error(error)
    })
}
