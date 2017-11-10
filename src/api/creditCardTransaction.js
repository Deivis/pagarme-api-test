import { formatTransactionData } from './utils'

import Transactions from './transactions'

async function creditCardTransaction(cardData, amount, installments, postbackUrl) {
  return Transactions
    .create(formatTransactionData(cardData, amount, installments, postbackUrl))
}

export default creditCardTransaction
