'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

const HeroSection = () => {
  return (
    <div className='relative h-[70vh]'
    >
        <Image
            src="/landingpage-hero.jpg"
            alt="Landing Image"
            fill
            className="object-cover object-center"
            priority
        />
        <div className='absolute inset-0 bg-black bg-opacity-40'></div>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute top-1/3 transform -translate-x-1/2 -translate-y-1/2 text-center w-full"
        >
            <div className="max-w-4xl mx-auto px-16 sm:px-12">
                <h1 className="text-5xl font-bold text-white mb-4">
                    Discover Ireland’s homegrown heroes.
                </h1>
                <p className='text-xl text-white mb-8'>
                    Explore local fresh Irish food near you. Browse through our selection to find the best local produce and support your community.
                </p>
                <div className='flex justify-center'>
                    <Input
                        type="text"
                        value="search query"
                        onChange={() => {}}
                        placeholder="Search for local produce"
                        className='w-full max-w-lg rounded-none rounded-l-xl border-none bg-white h-12'
                    />
                    <Button
                        onClick={() => {}}
                        className="bg-green-500 text-white rounded-none rounded-r-xl border-none hover:bg-green-600 h-12"
                    >Search</Button>
                </div>
            </div>
        </motion.div>
    </div>
  )
}

export default HeroSection