import { ProjectViews } from "@/modules/projects/ui/views/project-views"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react"

interface Props{
    params: Promise<{projectID:string}>
}

const page = async ({params}:Props) => {
    const {projectID} = await params
    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(trpc.messages.getMany.queryOptions({
        projectId:projectID,
    }))
    void queryClient.prefetchQuery(trpc.projects.getOne.queryOptions({
        id:projectID,
    }))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading...</div>}>
      <ProjectViews projectID={projectID} />
      </Suspense>
    </HydrationBoundary>
  )
}

export default page