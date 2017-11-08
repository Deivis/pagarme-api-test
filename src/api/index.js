import pagarme from 'pagarme'

import CreditCardTransaction from './creditCardTransaction'
import Transactions from './transactions'

let client

export function connect() {
  if (!client) {
    return pagarme.client
      .connect({
        encryption_key: process.env.API_TEST_ENCRIPT_KEY,
      })
      .then((clientResponse) => {
        client = clientResponse
        return client
      })
      .catch((error) => {
        console.error(error)
      })
  }
  return Promise.resolve(client)
}

const formatCardData = ({
  cardNumber,
  cardHolderName,
  cardExpirationDate,
  cardCvv,
}) =>
  ({
    card_number: cardNumber,
    card_holder_name: cardHolderName,
    card_expiration_date: cardExpirationDate,
    card_cvv: `${cardCvv}`,
  })

export default {
  creditCardTransaction: CreditCardTransaction(connect, formatCardData),
  transactions: Transactions(connect),
}
