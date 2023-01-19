import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "@/src/lib/stripe";
import { ImageContainerStyle, SuccessContainerStyle } from "@/src/styles/pages/success";
import Head from "@/src/components/Head";

interface Product {
  name: string,
  imageUrl: string
}

interface SuccessProps {
  customerName: string,
  product: Product
}

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <>
      <Head pageName="Compra efetuada">
        <meta name="robots" content="noindex"/>
      </Head>

      <SuccessContainerStyle>
        <h1>Compra efetuada!</h1>

        <ImageContainerStyle>
          <Image src={product.imageUrl} width={120} height={110} alt="" />
        </ImageContainerStyle>

        <p>Uhuuul <strong>{customerName}</strong>, sua <strong>{product.name}</strong> já está a caminho da sua casa.</p>

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainerStyle>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if(!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const sessionId = String(query.session_id)


  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details.name
  const product = session.line_items.data[0].price.product as Stripe.Product

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0]
      }
    }
  }
}