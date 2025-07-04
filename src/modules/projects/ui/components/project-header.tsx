import Link from "next/link"
import Image from "next/image"
import { useSuspenseQuery } from "@tanstack/react-query"

import {useTRPC} from "@/trpc/client"
import {Button} from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDownIcon, SettingsIcon, HomeIcon, FolderIcon } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"

interface Props{
    projectID:string
}

export const ProjectHeader = ({projectID}:Props) => {
    const trpc = useTRPC()
    const {data:project} = useSuspenseQuery(trpc.projects.getOne.queryOptions({
        id:projectID,
    }))
    
    
    return(
        <header className="px-4 py-3 flex justify-between items-center border-b bg-card/80 backdrop-blur-md supports-[backdrop-filter]:bg-card/60 shadow-sm">
            <div className="flex items-center gap-3">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="relative group">
                            {/* Background glow */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            <Button 
                                variant="ghost" 
                                className="relative focus-visible:ring-0 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-950/30 dark:hover:to-purple-950/30 transition-all duration-300 pl-3 pr-4 h-auto gap-4 group border border-transparent hover:border-border/50 rounded-xl backdrop-blur-sm"
                            >
                                <div className="relative">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                                    <Image 
                                        src="https://avatars.githubusercontent.com/u/143759943?v=4" 
                                        alt="MaxC" 
                                        width={32} 
                                        height={32} 
                                        className="relative rounded-full ring-2 ring-white/50 dark:ring-black/50 shadow-lg group-hover:scale-105 transition-transform duration-200" 
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full border-2 border-background shadow-sm">
                                        <div className="w-full h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                                        {project.name}
                                    </span>
                                    <span className="text-xs text-muted-foreground font-medium">
                                        Active Project
                                    </span>
                                </div>
                                <ChevronDownIcon className="w-4 h-4 text-muted-foreground group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-all duration-200 group-hover:rotate-180" />
                            </Button>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                        side="bottom" 
                        align="start" 
                        className="w-72 p-3 bg-card/95 backdrop-blur-md border-border/50 shadow-xl rounded-xl"
                        sideOffset={12}
                    >
                        {/* Project Info Header */}
                        <div className="px-3 py-4 border-b border-border/50 mb-3 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-lg">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-full blur opacity-40"></div>
                                    <Image 
                                        src="https://avatars.githubusercontent.com/u/143759943?v=4" 
                                        alt="MaxC" 
                                        width={36} 
                                        height={36} 
                                        className="relative rounded-full ring-2 ring-white/50 dark:ring-black/50 shadow-lg" 
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full border-2 border-background shadow-sm">
                                        <div className="w-full h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{project.name}</span>
                                    <span className="text-xs text-muted-foreground font-medium">AI Website Builder Project</span>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <DropdownMenuItem asChild>
                            <Link href="/" className="flex items-center gap-3 px-3 py-3 cursor-pointer rounded-lg hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-950/30 dark:hover:to-purple-950/30 transition-all duration-200 group">
                                <div className="p-1.5 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 rounded-md group-hover:scale-110 transition-transform">
                                    <HomeIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <span className="font-medium">Go to Dashboard</span>
                            </Link>
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem className="flex items-center gap-3 px-3 py-3 cursor-pointer rounded-lg hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50 dark:hover:from-purple-950/30 dark:hover:to-pink-950/30 transition-all duration-200 group">
                            <div className="p-1.5 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50 rounded-md group-hover:scale-110 transition-transform">
                                <FolderIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            <span className="font-medium">Project Settings</span>
                        </DropdownMenuItem>
                        
                        <DropdownMenuSeparator className="my-3 bg-border/50" />
                        
                        <DropdownMenuItem className="flex items-center gap-3 px-3 py-3 cursor-pointer rounded-lg hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-teal-50/50 dark:hover:from-emerald-950/30 dark:hover:to-teal-950/30 transition-all duration-200 group">
                            <div className="p-1.5 bg-gradient-to-r from-emerald-100 to-teal-200 dark:from-emerald-900/50 dark:to-teal-800/50 rounded-md group-hover:scale-110 transition-transform">
                                <SettingsIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <span className="font-medium">Settings</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            
            {/* Right side - Theme toggle and additional controls */}
            <div className="flex items-center gap-3">
                <ThemeToggle variant="dropdown" />
            </div>
        </header>
    )
}