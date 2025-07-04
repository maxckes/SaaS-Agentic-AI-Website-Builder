import Link from "next/link"
import Image from "next/image"
import {useTheme} from "next-themes"
import { useSuspenseQuery } from "@tanstack/react-query"

import {useTRPC} from "@/trpc/client"
import {Button} from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDownIcon, SunIcon, MoonIcon, MonitorIcon, SettingsIcon, HomeIcon, FolderIcon } from "lucide-react"

interface Props{
    projectID:string
}

export const ProjectHeader = ({projectID}:Props) => {
    const {theme,setTheme} = useTheme()
    const trpc = useTRPC()
    const {data:project} = useSuspenseQuery(trpc.projects.getOne.queryOptions({
        id:projectID,
    }))
    
    const getThemeIcon = (currentTheme: string) => {
        switch (currentTheme) {
            case 'light':
                return <SunIcon className="w-4 h-4" />
            case 'dark':
                return <MoonIcon className="w-4 h-4" />
            default:
                return <MonitorIcon className="w-4 h-4" />
        }
    }
    
    return(
        <header className="px-4 py-3 flex justify-between items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center gap-3">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button 
                            variant="ghost" 
                            className="focus-visible:ring-0 hover:bg-accent/60 transition-all duration-200 pl-2 pr-3 h-auto gap-3 group"
                        >
                            <div className="relative">
                                <Image 
                                    src="https://avatars.githubusercontent.com/u/143759943?v=4" 
                                    alt="MaxC" 
                                    width={28} 
                                    height={28} 
                                    className="rounded-full ring-2 ring-background shadow-sm group-hover:ring-primary/20 transition-all duration-200" 
                                />
                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background shadow-sm"></div>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-sm font-semibold text-foreground font-mono leading-tight">
                                    {project.name}
                                </span>
                            </div>
                            <ChevronDownIcon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                        side="bottom" 
                        align="start" 
                        className="w-64 p-2"
                        sideOffset={8}
                    >
                        {/* Project Info Header */}
                        <div className="px-2 py-3 border-b mb-2">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Image 
                                        src="https://avatars.githubusercontent.com/u/143759943?v=4" 
                                        alt="MaxC" 
                                        width={32} 
                                        height={32} 
                                        className="rounded-full ring-2 ring-background shadow-sm" 
                                    />
                                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold font-mono">{project.name}</span>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <DropdownMenuItem asChild>
                            <Link href="/" className="flex items-center gap-3 px-2 py-2 cursor-pointer">
                                <HomeIcon className="w-4 h-4 text-muted-foreground" /> 
                                <span>Go toDashboard</span>
                            </Link>
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem className="flex items-center gap-3 px-2 py-2 cursor-pointer">
                            <FolderIcon className="w-4 h-4 text-muted-foreground" />
                            <span>Project Settings</span>
                        </DropdownMenuItem>
                        
                        <DropdownMenuSeparator className="my-2" />
                        
                        {/* Appearance Settings */}
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="cursor-pointer gap-3 px-2 py-2">
                                {getThemeIcon(theme || 'system')}
                                <span>Appearance</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent className="p-2" sideOffset={8}>
                                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                                    <DropdownMenuRadioItem 
                                        value="light" 
                                        className="cursor-pointer gap-3 px-2 py-2"
                                    >
                                        <SunIcon className="w-4 h-4 text-muted-foreground" />
                                        <span>Light</span>
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem 
                                        value="dark" 
                                        className="cursor-pointer gap-3 px-2 py-2"
                                    >
                                        <MoonIcon className="w-4 h-4 text-muted-foreground" />
                                        <span>Dark</span>
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem 
                                        value="system" 
                                        className="cursor-pointer gap-3 px-2 py-2"
                                    >
                                        <MonitorIcon className="w-4 h-4 text-muted-foreground" />
                                        <span>System</span>
                                    </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        
                        <DropdownMenuSeparator className="my-2" />
                        
                        <DropdownMenuItem className="flex items-center gap-3 px-2 py-2 cursor-pointer">
                            <SettingsIcon className="w-4 h-4 text-muted-foreground" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            
            {/* Right side - could add additional controls */}
            <div className="flex items-center gap-2">
                {/* You can add additional header controls here */}
            </div>
        </header>
    )
}