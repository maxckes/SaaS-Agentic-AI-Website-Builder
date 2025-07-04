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
        <div className="flex justify-end pb-6 pr-2 pl-10 group">
            <div className="flex items-start gap-4 max-w-[80%]">
                <div className="relative">
                    {/* Background glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Message bubble */}
                    <Card className="relative rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-4 shadow-lg border border-blue-200/50 dark:border-blue-800/50 break-words backdrop-blur-sm">
                        <p className="text-sm text-foreground font-medium leading-relaxed whitespace-pre-wrap">
                            {content}
                        </p>
                    </Card>
                </div>
                
                <div className="relative flex-shrink-0 group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                    <Image 
                        src="https://github.com/shadcn.png" 
                        alt="User" 
                        width={36} 
                        height={36} 
                        className="relative rounded-full ring-2 ring-white/50 dark:ring-black/50 shadow-lg transition-transform group-hover:scale-105" 
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full border-2 border-background shadow-sm"></div>
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
        <div className="relative group">
            {/* Background glow */}
            <div className={cn(
                "absolute -inset-1 rounded-xl blur transition-opacity duration-300",
                isActive 
                    ? "bg-gradient-to-r from-blue-500/30 to-purple-500/30 opacity-100" 
                    : "bg-gradient-to-r from-slate-500/20 to-gray-500/20 opacity-0 group-hover:opacity-100"
            )}></div>
            
            <Button 
                variant="outline"
                className={cn(
                    "relative flex items-start gap-4 border rounded-xl w-fit p-4 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm",
                    "min-h-[5rem] max-w-[450px] hover:scale-[1.02]",
                    isActive 
                        ? "bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-950/50 dark:to-purple-950/50 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300" 
                        : "bg-card/80 hover:bg-accent/80 border-border/50"
                )} 
                onClick={() => onFragmentClick(fragments)}
            >
                <div className={cn(
                    "p-3 rounded-lg flex-shrink-0 transition-all duration-300",
                    isActive 
                        ? "bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-600 dark:text-blue-400" 
                        : "bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-800 dark:to-gray-800 text-slate-600 dark:text-slate-400"
                )}>
                    <Code2Icon className="size-5" />
                </div>
                <div className="flex flex-col flex-1 text-left space-y-2">
                    <span className="text-sm font-semibold line-clamp-2 leading-tight">
                        {fragments.title}
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                            Click to preview
                        </span>
                        {/* <div className={cn(
                            "px-2 py-0.5 text-xs font-medium rounded-full border transition-colors",
                            isActive 
                                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800" 
                                : "bg-muted text-muted-foreground border-border"
                        )}>
                            {isActive ? "Active" : "Preview"}
                        </div> */}
                    </div>
                </div>
                <ChevronRightIcon className={cn(
                    "size-5 flex-shrink-0 mt-2 transition-all duration-300",
                    isActive 
                        ? "text-blue-500 dark:text-blue-400 translate-x-1" 
                        : "text-muted-foreground group-hover:translate-x-1"
                )} />
            </Button>
        </div>
    )
}   
const AssistantMessageCard = ({content,fragments,createdAt,isActive,onFragmentClick,type}:AssistantMessageCardProps) => {
    return (
        <div className={cn(
            "flex flex-col px-3 pb-8 group",
            type === "ERROR" && "text-red-700 dark:text-red-400"
        )}>
            {/* Header with avatar and metadata */}
            <div className="flex items-center gap-4 mb-4">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                    <Image 
                        src="https://avatars.githubusercontent.com/u/143759943?v=4" 
                        alt="MaxC AI Assistant" 
                        width={36} 
                        height={36} 
                        className="relative rounded-full ring-2 ring-white/50 dark:ring-black/50 shadow-lg transition-transform group-hover:scale-105" 
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full border-2 border-background shadow-sm">
                        <div className="w-full h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            MaxC AI Assistant
                        </span>
                        <div className="px-2 py-0.5 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full border border-green-200/50 dark:border-green-800/50">
                            AI
                        </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                        {format(createdAt, "h:mm a, MMM d, yyyy")}
                    </span>
                </div>
            </div>
            
            {/* Content area */}
            <div className="ml-12 flex flex-col gap-4">
                <div className="relative">
                    {/* Background glow for content */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-slate-500/10 to-gray-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className={cn(
                        "relative prose prose-sm max-w-none",
                        type === "ERROR" && "text-red-700 dark:text-red-400"
                    )}>
                        <div className="relative bg-card/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-border/50">
                            <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium text-foreground m-0">
                                {content.replace("<task_summary>","").replace("</task_summary>","")}
                            </p>
                        </div>
                    </div>
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


