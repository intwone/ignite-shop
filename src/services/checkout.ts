import { api } from "../lib/api"

export async function createCheckout(priceId: string) {
  const response = await api.post('api/checkout', {
    priceId
  })
  return response
}