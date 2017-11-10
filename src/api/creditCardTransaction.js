import { merge, pipe } from 'ramda'

import Transactions from './transactions'

let connect
let formatCardData

const mutiplyBy100 = value => value * 100

const formatTransactionData = (cardData, amount, installments, postbackUrl) => {
  if (cardData && amount) {
    const amountInCents = pipe(parseFloat, mutiplyBy100)(amount)
    // eslint-disable-next-line
    if (installments && !isNaN(installments)) {
      return merge(formatCardData(cardData), {
        amount: amountInCents,
        installments,
        postback_url: postbackUrl,
      })
    }
    return merge(formatCardData(cardData), { amount: amountInCents, postback_url: postbackUrl })
  }
  throw new Error('CardData or ammount are missing')
}

async function creditCardTransaction(cardData, amount, installments, postbackUrl) {
  const { create } = Transactions(connect)
  return create(formatTransactionData(cardData, amount, installments, postbackUrl))
}

export default (mainConnect, mainFormatCardData) => {
  connect = mainConnect
  formatCardData = mainFormatCardData
  return creditCardTransaction
}
