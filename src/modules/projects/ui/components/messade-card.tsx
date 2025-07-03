import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Fragment, MessageRole, MessageType } from "@/generated/prisma"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Code2Icon, ChevronRightIcon } from "lucide-react"
import Image from "next/image"
interface MessageCardProps{
    content:string
    fragments:Fragment | null
    role:MessageRole
    createdAt:Date
    isActive:boolean
    onFragmentClick:(fragment:Fragment)=>void
    type:MessageType
}
interface UserMessageCardProps{
    content:string
}
const UserMessageCard = ({content}:UserMessageCardProps) => {
    return (
        <div className="flex justify-end pb-4 pr-2 pl-10">
            <div className="flex items-start gap-3 max-w-[80%]">
                <Card className="rounded-lg bg-muted p-3 shadow-none border-none break-words">
                    <p className="text-sm text-muted-foreground font-mono">{content}</p>
                </Card>
                <div className="relative flex-shrink-0">
                    <Image 
                        src="https://github.com/shadcn.png" 
                        alt="User" 
                        width={32} 
                        height={32} 
                        className="rounded-full ring-2 ring-background shadow-sm" 
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-background"></div>
                </div>
            </div>
        </div>
    )
}
interface AssistantMessageCardProps{
    content:string
    fragments:Fragment | null
    createdAt:Date
    isActive:boolean
    onFragmentClick:(fragment:Fragment)=>void
    type:MessageType
}
interface FragmentCardProps{
    fragments:Fragment
    onFragmentClick:(fragment:Fragment)=>void
    isActive:boolean
}
const FragmentCard = ({fragments,onFragmentClick,isActive}:FragmentCardProps) => {
    return (
        <Button 
            variant="outline"
            className={cn(
                "flex items-start gap-3 border rounded-lg bg-background w-fit p-4 hover:bg-accent transition-all duration-200 shadow-sm hover:shadow-md",
                "min-h-[4rem] max-w-[400px]",
                isActive && "bg-primary/10 border-primary text-primary hover:bg-primary/15"
            )} 
            onClick={() => onFragmentClick(fragments)}
        >
            <div className={cn(
                "p-2 rounded-md bg-muted flex-shrink-0",
                isActive && "bg-primary/20"
            )}>
                <Code2Icon className="size-4" />
            </div>
            <div className="flex flex-col flex-1 text-left space-y-1">
                <span className="text-sm font-medium line-clamp-2 leading-tight">
                    {fragments.title}
                </span>
                <span className="text-xs text-muted-foreground">
                    Click to preview
                </span>
            </div>
            <ChevronRightIcon className="size-4 text-muted-foreground flex-shrink-0 mt-1" />
        </Button>
    )
}   
const AssistantMessageCard = ({content,fragments,createdAt,isActive,onFragmentClick,type}:AssistantMessageCardProps) => {
    return (
        <div className={cn(
            "flex flex-col px-3 pb-6 group",
            type === "ERROR" && "text-red-700 dark:text-red-400"
        )}>
            {/* Header with avatar and metadata */}
            <div className="flex items-center gap-3 mb-3">
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
                    <span className="text-sm font-semibold text-foreground">MaxC</span>
                    <span className="text-xs text-muted-foreground">
                        {format(createdAt, "h:mm a, MMM d, yyyy")}
                    </span>
                </div>
            </div>
            
            {/* Content area */}
            <div className="ml-11 flex flex-col gap-4">
                <div className={cn(
                    "prose prose-sm max-w-none",
                    type === "ERROR" && "text-red-700 dark:text-red-400"
                )}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap font-mono bg-muted/30 rounded-md p-4 border border-border/50">
                        {content}
                    </p>
                </div>
                
                {/* Fragment card */}
                {fragments && type === "RESULT" && (
                    <div className="mt-2">
                        <FragmentCard 
                            fragments={fragments} 
                            onFragmentClick={onFragmentClick} 
                            isActive={isActive} 
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
export const MessageCard = ({content,fragments,role,createdAt,isActive,onFragmentClick,type}:MessageCardProps) => {
    if(role==="ASSISTANT"){
        return (
           <AssistantMessageCard content={content} fragments={fragments} createdAt={createdAt} isActive={isActive} onFragmentClick={onFragmentClick} type={type}/>
        )

    }
    return (
        <UserMessageCard content={content} />
    )
}


