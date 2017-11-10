let client
let connect

async function getAll() {
  client = await connect()
  return client.transactions.all({
    date_created: `>=${new Date('2017-11-06').getTime()}`,
    count: 0,
  })
}

async function create(transactionParams) {
  client = await connect()
  return client.transactions.create(transactionParams)
}

async function capture(transactionId, amount) {
  client = await connect()
  return client.transactions.capture({
    id: transactionId,
    amount,
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
