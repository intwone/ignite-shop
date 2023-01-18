export const envs = {
  stripe: {
    publicKey: process.env.STRIPE_PUBLIC_KEY as string,
    secretKey: process.env.STRIPE_SECRET_KEY as string
  },
  app: {
    nextUrl: process.env.NEXT_URL as string
  }
}