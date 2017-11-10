import connect from './connect'

async function getAll() {
  const client = await connect()
  return client.transactions.all({
    date_created: `>=${new Date('2017-11-06').getTime()}`,
    count: 0,
  })
}

async function create(transactionParams) {
  const client = await connect()
  return client.transactions.create(transactionParams)
}

async function capture(transactionId, amount) {
  const client = await connect()
  return client.transactions.capture({
    id: transactionId,
    amount,
  })
}

export default {
  getAll,
  create,
  capture,
}

