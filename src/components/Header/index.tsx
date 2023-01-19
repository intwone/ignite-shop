import Image from 'next/image'
import logoImg from '@/src/assets/logo.svg'
import {HeaderStyles} from '@/src/styles/components/Header/header'

export default function Header() {
  return (
    <HeaderStyles>
      <Image src={logoImg} alt="" />
    </HeaderStyles>
  )
}