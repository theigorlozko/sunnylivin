'use client'

import {SidebarProvider } from '@/components/ui/sidebar'
import { NAVBAR_HEIGHT } from '@/lib/constants'
import React, { useEffect, useState } from 'react'
import Sidebar from '@/components/AppSidebar'
import { useGetAuthUserQuery } from '@/state/api'
import { usePathname, useRouter } from 'next/navigation'
import Navabar from '@/components/Navbar'

const DashboardLayout = ({children } : {children: React.ReactNode}) => {

    const {data: authUser, isLoading: authLoading} = useGetAuthUserQuery();
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);

    //checks if the user or vendor on on the wrong paths and corrects them
    useEffect(() => {
        if (!authUser) return;
      
        const userRole = authUser.userInfo.role.toLowerCase();
      
        const isVendorOnWrongPage = userRole === "vendor" && pathname.startsWith("/users");
        const isBuyerOnWrongPage = userRole === "buyer" && pathname.startsWith("/vendors");
        const isVendorBase = pathname === "/vendor";
      
        if (isVendorOnWrongPage || isBuyerOnWrongPage) {
          router.push(`/${userRole}`, { scroll: false });
        } else if (isVendorBase) {
          router.push("/users/favorites", { scroll: false });
        } else {
          setIsLoading(false);
        }
      }, [authUser, pathname, router]);

    if (authLoading || isLoading) return <>Loading...</>;

    if(!authUser.userInfo.role) return null;

  return (
    <SidebarProvider>
        <div className='minh-screen w-full bg-primary-100'>
            <Navabar />
            <div style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}>
                <main className='flex'>
                    {["vendor", "buyer", "user"].includes(authUser.userInfo.role.toLocaleLowerCase() || "") && (
                        <Sidebar userType={authUser.userInfo.role.toLocaleLowerCase() as "vendor" | "buyer" } />
                    )}
                    <div className='flex-grow transition-all duration-300'>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    </SidebarProvider>
    
  )
}

export default DashboardLayout