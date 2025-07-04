"use client"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
// import { useTRPC } from "@/trpc/client"
import { Suspense, useState } from "react"
import MessageContainers from "../components/message-containers"
import { Fragment } from "@/generated/prisma"        
import { ProjectHeader } from "../components/project-header"
import { FragmentWeb } from "../components/fragment-web"
import {Tabs,TabsContent,TabsList,TabsTrigger} from "@/components/ui/tabs"
import { CodeIcon,  EyeIcon } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"
import { FileExplorer } from "./code-view/file-explorer"

type FileCollection = {[path:string]:string}

interface Props{
    projectID:string
}

// Loading component with gradient styling
const LoadingCard = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center justify-center p-8">
        <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-lg blur animate-pulse" />
            <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg px-6 py-4">
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                    {children}
                </div>
            </div>
        </div>
    </div>
)

export const ProjectViews = ({projectID}:Props) => {
    // const trpc = useTRPC()
    // const {data:project} = useSuspenseQuery(trpc.projects.getOne.queryOptions({
    //     id:projectID,
    // }))
    // const {data:messages} = useSuspenseQuery(trpc.messages.getMany.queryOptions({
    //     projectId:projectID,
    // }))
    const [activeFragment,setActiveFragment] = useState<Fragment | null>(null)
    const [activeTab,setActiveTab] = useState<"preview" | "code">("preview")
    
    return( 
        <div className="h-screen relative">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_70%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_70%)]" />
            
            <div className="relative h-full">
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel defaultSize={35} minSize={25} className="flex flex-col min-h-0">
                        <Suspense fallback={<LoadingCard>Loading Project...</LoadingCard>}>
                            <ProjectHeader projectID={projectID} />
                        </Suspense>
                        <Suspense fallback={<LoadingCard>Loading Messages...</LoadingCard>}>
                            <MessageContainers projectID={projectID} activeFragment={activeFragment} setActiveFragment={setActiveFragment} />
                        </Suspense>
                    </ResizablePanel>
                    
                    <ResizableHandle 
                        withHandle
                        className="relative group hover:bg-gradient-to-b hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300"
                    />
                    
                    <ResizablePanel defaultSize={65} minSize={50} className="flex flex-col min-h-0">
                        <Tabs className="h-full gap-y-0 flex flex-col" defaultValue="preview" value={activeTab} onValueChange={(value)=>setActiveTab(value as "preview" | "code")}>
                            {/* Enhanced Tab Header */}
                            <div className="relative w-full flex items-center p-3 border-b border-border/50 gap-x-3 bg-card/50 backdrop-blur-sm">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />
                                
                                <div className="relative z-10">
                                    <TabsList className="h-9 p-1 bg-card/80 backdrop-blur-sm border border-border/50 shadow-sm">
                                        <TabsTrigger 
                                            value="preview" 
                                            className="relative group rounded-md transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
                                        >
                                            <EyeIcon className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                                            <span className="text-sm font-medium">Preview</span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 rounded-md transition-all duration-300" />
                                        </TabsTrigger>
                                        <TabsTrigger 
                                            value="code" 
                                            className="relative group rounded-md transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
                                        >
                                            <CodeIcon className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                                            <span className="text-sm font-medium">Code</span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 rounded-md transition-all duration-300" />
                                        </TabsTrigger>
                                    </TabsList>
                                </div>
                                
                                {/* <div className="ml-auto flex items-center gap-x-2 relative z-10">
                                    <Button asChild size="sm" className="relative group bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                        <Link href={"/pricing"} className="flex items-center gap-2">
                                            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-md blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <CrownIcon className="w-4 h-4 transition-transform group-hover:rotate-12" />
                                            <span className="font-medium">Upgrade</span>
                                        </Link>
                                    </Button>
                                </div> */}
                            </div>
                            
                            {/* Tab Content with enhanced styling */}
                            <TabsContent value="preview" className="flex-1 m-0 relative">
                                {!!activeFragment ? (
                                    <div className="h-full relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 dark:from-blue-950/10 dark:to-purple-950/10" />
                                        <div className="relative h-full">
                                            <FragmentWeb data={activeFragment} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col h-full items-center justify-center p-8">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse" />
                                            <div className="relative w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                                                <EyeIcon className="w-8 h-8 text-white" />
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                            No Preview Available
                                        </h3>
                                        <p className="text-sm text-muted-foreground text-center max-w-sm">
                                            Select a fragment from the conversation to see its live preview here.
                                        </p>
                                    </div>
                                )}
                            </TabsContent>
                            
                            <TabsContent value="code" className="flex-1 m-0 min-h-0 relative">
                                {!!activeFragment ? (
                                    <div className="h-full relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/20 via-transparent to-gray-50/20 dark:from-slate-950/10 dark:to-gray-950/10" />
                                        <div className="relative h-full">
                                            <FileExplorer files={activeFragment.files as FileCollection} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col h-full items-center justify-center p-8">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-r from-slate-500/20 via-gray-500/20 to-zinc-500/20 rounded-full blur-xl animate-pulse" />
                                            <div className="relative w-16 h-16 bg-gradient-to-r from-slate-600 to-gray-600 rounded-full flex items-center justify-center mb-4">
                                                <CodeIcon className="w-8 h-8 text-white" />
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-semibold bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent mb-2">
                                            No Code Available
                                        </h3>
                                        <p className="text-sm text-muted-foreground text-center max-w-sm">
                                            Select a fragment from the conversation to explore its code structure.
                                        </p>
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    )
}