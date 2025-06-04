'use client'
import Navabar from '@/components/Navbar'
import { NAVBAR_HEIGHT } from '@/lib/constants'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full w-full'>
        <Navabar /> 
        <main className={`h-full flex w-full flex-col`}
            style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}
        >
            {children}
        </main>
    </div>
  )
}

export default Layout