import Image from 'next/image'
import logoImg from '../../assets/logo.svg'
import {HeaderStyles} from '../../styles/components/Header/header'

export default function Header() {
  return (
    <HeaderStyles>
      <Image src={logoImg} alt="" />
    </HeaderStyles>
  )
}