import Image from "next/image";
import { GetStaticProps } from "next";
import { useKeenSlider } from 'keen-slider/react'
import { HomeContainerStyles, ProductStyles } from "@/src/styles/pages/home";
import 'keen-slider/keen-slider.min.css'
import { stripe } from "@/src/lib/stripe";
import Stripe from "stripe";
import { priceFormatter } from "@/src/utils/formatter";
import Link from "next/link";
import Head from "@/src/components/Head";

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}

export default function Home({products}: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })

  return (
    <>
      <Head pageName="Home"/>

      <HomeContainerStyles ref={sliderRef} className="keen-slider">
        {products.map(product => (
          <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
            <ProductStyles className="keen-slider__slide">
              <Image src={product.imageUrl} width={520} height="480" alt=""/>

              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </ProductStyles>
          </Link>
        ))}
      </HomeContainerStyles>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: priceFormatter().format(Number(price.unit_amount) / 100)
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 hours
  }
}