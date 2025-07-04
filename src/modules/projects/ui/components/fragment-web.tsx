import { Fragment } from "@/generated/prisma"
import {useState} from "react"
import {ExternalLinkIcon,RefreshCcwIcon} from "lucide-react"
interface Props{
    data:Fragment
}
import {Button} from "@/components/ui/button"
import { Hint } from "./hint"

export const FragmentWeb = ({data}:Props) => {
    const [fragmentKey,setFragmentKey] = useState(0)
    const [copied,setCopied] = useState(false)
    const onRefresh = () => {
        setFragmentKey(prev => prev + 1)
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
        <div className="flex flex-col w-full h-full">

            <div className="p-2 border-b bg-sidebar flex items-center gap-x-2">
                <Hint text="Refresh the fragment">
                    <Button variant="outline" size="icon" className="hover:bg-accent/60 transition-all duration-200" onClick={onRefresh}>
                        <RefreshCcwIcon className="w-4 h-4" />
                    </Button>
                </Hint>
                <Hint text="Copy the fragment URL">
                    <Button variant="outline" size="icon" className="flex-1 justify-start p-2 text-start" disabled={!data.sandboxUrl || copied} onClick={handleCopy}>
                        <span className="text-xs text-muted-foreground">{data.sandboxUrl}</span>
                    </Button>
                </Hint>

                <Hint text="Open the fragment in a new tab">
                    <Button variant="outline" size="icon" className="hover:bg-accent/60 transition-all duration-200" onClick={()=>{
                        if(!data.sandboxUrl) return;
                        window.open(data.sandboxUrl, "_blank")
                    }} disabled={!data.sandboxUrl}>
                        <ExternalLinkIcon className="w-4 h-4" />
                    </Button>
                </Hint>
            </div>
            
            <iframe key={fragmentKey} src={data.sandboxUrl} className="w-full h-full" sandbox="allow-forms allow-scripts allow-same-origin" loading="lazy"/>
        </div>
    )
}   