import NextHead from "next/head";
import { ReactNode } from "react";

interface HeadProps {
  pageName: string
  children?: ReactNode
}


export default function Head({ children, pageName }: HeadProps) {
  return (
    <NextHead>
      <title>{pageName} | Ignite shop</title>
      {children}
    </NextHead>
  )
}


