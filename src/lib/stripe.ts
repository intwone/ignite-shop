import Stripe from 'stripe'
import { envs } from '@/src/configs/envs'

export const stripe = new Stripe(envs.stripe.secretKey, {
  apiVersion: '2022-08-01',
  appInfo: {
    name: 'Ignite Shop'
  }
})