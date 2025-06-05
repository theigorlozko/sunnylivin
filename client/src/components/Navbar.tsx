'use client'

import { NAVBAR_HEIGHT } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { useGetAuthUserQuery } from '@/state/api'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'aws-amplify/auth'
import { Plus, Search } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { SidebarTrigger } from './ui/sidebar'


const Navabar = () => {
    const {data: authUser} = useGetAuthUserQuery();
    const router = useRouter();
    const pathname = usePathname();

    const isDashboardPage = pathname.includes("/users");

    const handleSignOut = async () => {
        await signOut();
        localStorage.clear(); // Clear any local storage data
        sessionStorage.clear(); // Clear any session storage data
        window.location.href = "/landing";
    };

  return (
    <div
      className="fixed top-0 left-0 w-full z-50 shadow-md "
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
        <div className="flex items-center justify-between w-full py-3 px-8 bg-white text-white">
            {/* LEFT: Logo and sidebar trigger */}
            <div className="flex items-center gap-4 md:gap-6">
                {isDashboardPage && (
                <div className="md:hidden">
                    <SidebarTrigger className="bg-white text-black hover:bg-gray-300" />
                </div>
                )}
                <Link
                href="/"
                className="cursor-pointer hover:!text-primary-300"
                scroll={false}
                >
                <div className="flex items-center gap-3">
                    <div className="text-green-500 text-xl font-bold">
                    GO
                    <span className="text-primary-600 font-semibold hover:!text-primary-300">
                        LOCAL
                    </span>
                    </div>
                </div>
                </Link>
            </div>

            {/* RIGHT: User Avatar + Dropdown */}
            <div className="flex items-center gap-5">
                {authUser ? (
                <>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center gap-5 cursor-pointer focus:outline-none">
                        <p className="text-primary-600 hidden md:block">
                            {authUser.userInfo?.email || "Signed In"}
                        </p>
                        <Avatar>
                            <AvatarImage
                            src={authUser.userInfo?.image || "/defaultProfilePic.png"}
                            onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                "/defaultProfilePic.png"
                            }}
                            alt="User avatar"
                            />
                            <AvatarFallback className="bg-primary-600">
                            {authUser.userInfo?.name?.[0]?.toUpperCase() || "U"}
                            </AvatarFallback>
                        </Avatar>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white shadow-lg rounded-lg border border-gray-200 w-48 text-sm">
                        <DropdownMenuItem
                            className="px-4 py-2 text-gray-800 hover:bg-primary-600 hover:text-white font-medium transition-colors cursor-pointer"
                            onClick={() =>
                            router.push(
                                authUser.userRole?.toLowerCase() === "buyer" || "vendor"
                                ? "/users/favorites"
                                : "/users/settings",
                                { scroll: false }
                            )
                            }
                        >
                            Dashboard
                        </DropdownMenuItem>

                        <DropdownMenuSeparator className="my-1 h-px bg-gray-100" />

                        <DropdownMenuItem
                            className="px-4 py-2 text-gray-800 hover:bg-red-500 hover:text-white transition-colors cursor-pointer font-semibold"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </>
                ) : (
                <>
                    <Link href="/signin">
                    <Button
                        variant="outline"
                        className="text-green-600 border-green-500 bg-transparent border-2 hover:bg-green-500 hover:text-white rounded-lg"
                    >
                        Sign In
                    </Button>
                    </Link>
                    <Link href="/signup">
                    <Button
                        variant="secondary"
                        className="text-white bg-green-500 hover:bg-green-600 hover:text-white rounded-lg"
                    >
                        Sign Up
                    </Button>
                    </Link>
                </>
                )}
            </div>
            </div>
    </div>
  )
}

export default Navabar