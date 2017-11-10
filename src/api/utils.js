import { merge, pipe } from 'ramda'

const mutiplyBy100 = value => value * 100

export const formatCardData = ({
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

export const formatTransactionData = (cardData, amount, installments, postbackUrl) => {
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


export default {
  formatCardData,
  formatTransactionData,
}
