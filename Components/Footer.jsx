import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className='flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-[#f95959] py-5 items-center'>
      <Image src={assets.logo1} className='bg-white rounded-full'  alt='' width={120} />
      <p className='text-sm text-white'>All rights reserved. Copyright @V-blogger.com</p>
      <div className='flex' >
        <Image src={assets.facebook_icon} alt='' width={40} />
        <Image src={assets.twitter_icon} alt='' width={40} />
        <Image src={assets.googleplus_icon} alt='' width={40} />
      </div>
    </div>
  )
}

export default Footer
