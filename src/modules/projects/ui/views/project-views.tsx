"use client"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
// import { useTRPC } from "@/trpc/client"
import { Suspense, useState } from "react"
import MessageContainers from "../components/message-containers"
import { Fragment } from "@/generated/prisma"        
import { ProjectHeader } from "../components/project-header"

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
           TODO: Preview
        </ResizablePanel>
    </ResizablePanelGroup>
    </div>
        )
}