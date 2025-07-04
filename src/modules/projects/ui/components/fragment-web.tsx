import { Fragment } from "@/generated/prisma"
import {useState} from "react"
import {ExternalLinkIcon,RefreshCcwIcon, CheckIcon, CopyIcon} from "lucide-react"
import {Button} from "@/components/ui/button"
import { Hint } from "./hint"

interface Props{
    data:Fragment
}

export const FragmentWeb = ({data}:Props) => {
    const [fragmentKey,setFragmentKey] = useState(0)
    const [copied,setCopied] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    
    const onRefresh = () => {
        setIsRefreshing(true)
        setFragmentKey(prev => prev + 1)
        setTimeout(() => setIsRefreshing(false), 1000)
    }
    
    const handleCopy = () => {
        if(!data.sandboxUrl) return;
        navigator.clipboard.writeText(data.sandboxUrl)
        setCopied(true)
        setTimeout(()=>{
            setCopied(false)
        },2000)
    }
    
    return(
        <div className="flex flex-col w-full h-full relative">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/10 via-purple-50/5 to-pink-50/10 dark:from-blue-950/5 dark:via-purple-950/3 dark:to-pink-950/5" />
            
            {/* Enhanced Header */}
            <div className="relative p-3 border-b border-border/50 bg-card/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-transparent" />
                
                <div className="relative flex items-center gap-x-3">
                    {/* Refresh Button */}
                    <Hint text="Refresh the fragment" side="bottom">
                        <Button 
                            variant="outline" 
                            size="icon" 
                            className={`
                                relative group border-border/50 bg-card/80 backdrop-blur-sm 
                                hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10
                                hover:border-blue-500/30 transition-all duration-300 hover:scale-105
                                ${isRefreshing ? 'animate-pulse' : ''}
                            `}
                            onClick={onRefresh}
                            disabled={isRefreshing}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-md transition-all duration-300" />
                            <RefreshCcwIcon className={`w-4 h-4 transition-transform duration-300 ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'}`} />
                        </Button>
                    </Hint>
                    
                    {/* URL Display Button */}
                    <Hint text={copied ? "Copied!" : "Copy the fragment URL"} side="bottom">
                        <Button 
                            variant="outline" 
                            className={`
                                relative group flex-1 justify-start px-3 py-2 h-9 border-border/50 bg-card/80 backdrop-blur-sm
                                hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-teal-500/10
                                hover:border-emerald-500/30 transition-all duration-300
                                ${copied ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/50' : ''}
                            `}
                            disabled={!data.sandboxUrl} 
                            onClick={handleCopy}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 rounded-md transition-all duration-300" />
                            
                            <div className="flex items-center gap-2 min-w-0 relative z-10">
                                {copied ? (
                                    <CheckIcon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                ) : (
                                    <CopyIcon className="w-4 h-4 text-muted-foreground group-hover:text-emerald-600 flex-shrink-0 transition-colors" />
                                )}
                                <span className={`
                                    text-xs font-mono truncate transition-colors
                                    ${copied ? 'text-emerald-600' : 'text-muted-foreground group-hover:text-foreground'}
                                `}>
                                    {data.sandboxUrl || 'No URL available'}
                                </span>
                            </div>
                        </Button>
                    </Hint>

                    {/* External Link Button */}
                    <Hint text="Open the fragment in a new tab" side="bottom">
                        <Button 
                            variant="outline" 
                            size="icon" 
                            className="
                                relative group border-border/50 bg-card/80 backdrop-blur-sm
                                hover:bg-gradient-to-r hover:from-violet-500/10 hover:to-purple-500/10
                                hover:border-violet-500/30 transition-all duration-300 hover:scale-105
                                disabled:opacity-50 disabled:cursor-not-allowed
                            "
                            onClick={()=>{
                                if(!data.sandboxUrl) return;
                                window.open(data.sandboxUrl, "_blank")
                            }} 
                            disabled={!data.sandboxUrl}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 to-purple-500/0 group-hover:from-violet-500/5 group-hover:to-purple-500/5 rounded-md transition-all duration-300" />
                            <ExternalLinkIcon className="w-4 h-4 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                        </Button>
                    </Hint>
                </div>
            </div>
            
            {/* Enhanced iframe container */}
            <div className="flex-1 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50/20 via-transparent to-gray-50/20 dark:from-slate-950/10 dark:to-gray-950/10" />
                
                {data.sandboxUrl ? (
                    <div className="relative h-full">
                        {/* Loading overlay */}
                        {isRefreshing && (
                            <div className="absolute inset-0 bg-card/80 backdrop-blur-sm z-10 flex items-center justify-center">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-lg blur animate-pulse" />
                                    <div className="relative bg-card border border-border/50 rounded-lg px-6 py-4">
                                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce" />
                                            Refreshing preview...
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <iframe 
                            key={fragmentKey} 
                            src={data.sandboxUrl} 
                            className="w-full h-full border-0 rounded-none relative z-0" 
                            sandbox="allow-forms allow-scripts allow-same-origin" 
                            loading="lazy"
                        />
                    </div>
                ) : (
                    <div className="flex flex-col h-full items-center justify-center p-8">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-amber-500/20 rounded-full blur-xl animate-pulse" />
                            <div className="relative w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mb-4">
                                <ExternalLinkIcon className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">
                            No Preview URL
                        </h3>
                        <p className="text-sm text-muted-foreground text-center max-w-sm">
                            This fragment doesn&apos;t have a sandbox URL available for preview.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}   