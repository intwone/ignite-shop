import Head from '@/src/components/Head'
import { stripe } from '@/src/lib/stripe'
import { createCheckout } from '@/src/services/checkout'
import { ImageContainerStyles, ProductContainerStyles, ProductDetailsStyles } from '@/src/styles/pages/products'
import { priceFormatter } from '@/src/utils/formatter'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import Stripe from 'stripe'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  async function handleByProduct() {
    try {
      setIsCreatingCheckoutSession(true)
      const response = await createCheckout(product.defaultPriceId)
      const { checkoutUrl } = response.data
      window.location.href = checkoutUrl
    } catch (error) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout')
    }
  }

  return (
    <>
      <Head pageName={product.name}/>

      <ProductContainerStyles>
        <ImageContainerStyles>
          <Image src={product?.imageUrl} width={520} height={480} alt="" />
        </ImageContainerStyles>

        <ProductDetailsStyles>
          <h1>{product?.name}</h1>
          <span>{product?.price}</span>

          <p>{product?.description}</p>

          <button disabled={isCreatingCheckoutSession} onClick={handleByProduct}>
            Comprar
          </button>
        </ProductDetailsStyles>
      </ProductContainerStyles>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_NCIpOuKhYgCTK8' } }
    ],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: priceFormatter().format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1 // 1 hours
  }
}