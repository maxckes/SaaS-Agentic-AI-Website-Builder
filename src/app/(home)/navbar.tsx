"use client"

import Image from "next/image"
import Link from "next/link"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"


export const Navbar = () => {
    return (
        <nav className="p-4 bg-transparent fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b border-transparent">
            <div className="max-w-5xl mx-auto w-full flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2">
                    <Image src={process.env.NEXT_PUBLIC_AVATAR_URL || ""} alt="logo" width={32} height={32}  className="rounded-md"/>
                    <span className="font-semibold text-lg">Maxc</span>
                </Link>
                <SignedOut>
                    <div className="flex gap-2">
                            <SignUpButton>
                                <Button variant="outline" size="sm">
                                    Sign Up
                                </Button>
                            </SignUpButton>
                            <SignInButton>
                                <Button size="sm">
                                    Sign In
                                </Button>
                            </SignInButton>
                            <ThemeToggle variant="dropdown" size="sm"/>

                    </div>
                </SignedOut>
                <SignedIn>
                    <UserButton showName={true} appearance={{
                        elements: {
                            userButtonBox:"rounded-md!",
                            userButtonAvatarBox:"rounded-md! size-8!",
                            userButtonTrigger: "rounded-md!",
                        }
                    }} />
                </SignedIn>
            </div>
        </nav>
    )
}