import { envs } from "@/src/configs/envs";
import { stripe } from "@/src/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {priceId} = req.body

  if(req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' }) 
  }
  
  if(!priceId) {
    res.status(400).json({ message: 'Price not found' })
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: `${envs.app.nextUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${envs.app.nextUrl}/`,
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ]
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url
  })
}