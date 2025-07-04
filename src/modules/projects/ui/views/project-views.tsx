"use client"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
// import { useTRPC } from "@/trpc/client"
import { Suspense, useState } from "react"
import MessageContainers from "../components/message-containers"
import { Fragment } from "@/generated/prisma"        
import { ProjectHeader } from "../components/project-header"
import { FragmentWeb } from "../components/fragment-web"
import {Tabs,TabsContent,TabsList,TabsTrigger} from "@/components/ui/tabs"
import { CodeIcon, CrownIcon, EyeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileExplorer } from "./code-view/file-explorer"

type FileCollection = {[path:string]:string}

interface Props{
    projectID:string
}
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
    <div className="h-screen">
    <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={35} minSize={25} className="flex flex-col min-h-0">
            <Suspense fallback={<div>Loading Project...</div>}>
                <ProjectHeader projectID={projectID} />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
                <MessageContainers projectID={projectID} activeFragment={activeFragment} setActiveFragment={setActiveFragment} />
            </Suspense>
        </ResizablePanel>
        <ResizableHandle withHandle/>
        <ResizablePanel defaultSize={65} minSize={50} className="flex flex-col min-h-0">
            <Tabs className="h-full gap-y-0" defaultValue="preview" value={activeTab} onValueChange={(value)=>setActiveTab(value as "preview" | "code")}>
            <div className="w-full flex items-center p-2 border-b gap-x-2">
                <TabsList className="h-8 p-0 border rounded-md">
                    <TabsTrigger value="preview" className="rounded-md"><EyeIcon /><span className="text-xs">Preview</span></TabsTrigger>
                    <TabsTrigger value="code" className="rounded-md"><CodeIcon /><span className="text-xs">Code</span></TabsTrigger>

                </TabsList>
                <div className="ml-auto flex items-center gap-x-2">
                    <Button asChild size="sm" variant="default">
                        <Link href={"/pricing"}><CrownIcon /> Upgrade</Link>

                    </Button>
                </div>
            </div>
            <TabsContent value="preview">
                {!!activeFragment && <FragmentWeb data={activeFragment} />}
            </TabsContent>
            <TabsContent value="code" className="min-h-0">
                {!!activeFragment && <FileExplorer files={activeFragment.files as FileCollection} />}
            </TabsContent>

            </Tabs>
        </ResizablePanel>
    </ResizablePanelGroup>
    </div>
        )
}