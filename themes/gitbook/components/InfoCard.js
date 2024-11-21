/* eslint-disable no-unused-vars */
import { BLOG } from '@/blog.config'
import LazyImage from '@/components/LazyImage'
import Router from 'next/router'
import React from 'react'
import SocialButton from './SocialButton'

const InfoCard = props => {
  const { siteInfo } = props
  return (
    <div id="info-card" className="py-4">
      <div className="items-center justify-center flex flex-col">
        <div
          className="hover:scale-105 transform duration-200 cursor-pointer flex justify-center"
          onClick={() => {
            Router.push('/ryoon')
          }}
        >
          <LazyImage
            src={'/images/24.06.Ryoon.png'}
            className="rounded-full dark:border dark:border-neutral-300"
            width={120}
            alt={BLOG.AUTHOR}
          />
        </div>
        <div className="text-xl my-2 hover:scale-105 dark:hover:text-neutral-900  hover:bg-amber-300 px-2 hover:rounded-lg hover:h-4/5 transform duration-200 flex justify-center dark:text-neutral-300">
          {BLOG.AUTHOR}
        </div>
        <div
          className="font-light w-3/6 text-neutral-600 mb-8
        hover:scale-105 transform duration-200
        flex justify-center text-center
         dark:text-neutral-400"
        >
          {BLOG.BIO}
        </div>
        <SocialButton />
      </div>
    </div>
  )
}

export default InfoCard
