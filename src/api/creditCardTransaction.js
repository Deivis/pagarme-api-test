import { merge, pipe } from 'ramda'

import Transactions from './transactions'

let connect
let formatCardData

const mutiplyBy100 = value => value * 100

const formatTransactionData = (cardData, amount, installments) => {
  if (cardData && amount) {
    const amountInCents = pipe(parseFloat, mutiplyBy100)(amount)
    // eslint-disable-next-line
    if (installments && !isNaN(installments)) {
      return merge(formatCardData(cardData), { amount: amountInCents, installments })
    }
    return merge(formatCardData(cardData), { amount: amountInCents })
  }
  throw new Error('CardData or ammount are missing')
}

async function creditCardTransaction(cardData, amount, installments) {
  const { create } = Transactions(connect)
  return create(formatTransactionData(cardData, amount, installments))
}

export default (mainConnect, mainFormatCardData) => {
  connect = mainConnect
  formatCardData = mainFormatCardData
  return creditCardTransaction
}
