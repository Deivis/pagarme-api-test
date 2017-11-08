let client
let connect

async function getAll() {
  client = await connect()
  return client.transactions.all()
}

async function create(transactionParams) {
  client = await connect()
  return client.transactions.create(transactionParams)
}

async function capture(transactionId) {
  client = await connect()
  return client.transactions.capture({
    id: transactionId,
  })
}

export default (mainConnect) => {
  connect = mainConnect
  return {
    getAll,
    create,
    capture,
  }
}
