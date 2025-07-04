import {CopyIcon, CheckIcon, FileIcon} from "lucide-react"
import {useState,useMemo,useCallback,Fragment} from "react"

import {Button} from "@/components/ui/button"
import { Hint } from "../../components/hint"

import {ResizablePanel,ResizablePanelGroup,ResizableHandle} from "@/components/ui/resizable"
import {Breadcrumb,BreadcrumbItem,BreadcrumbLink,BreadcrumbList,BreadcrumbSeparator} from "@/components/ui/breadcrumb"
import {CodeView} from "./index"
import { convertFilesToTreeItems } from "@/lib/utils"
import { TreeView } from "./tree-view"

type FileCollection = {[path:string]:string}

function getLanguageExtension(filename:string){
    const extension = filename.split(".").pop()?.toLowerCase()
    return extension || "text"
}

interface FileExplorerProps{
    files:FileCollection,
}

export const FileExplorer = ({files}:FileExplorerProps) => {
    const [selectedFiles,setSelectedFiles] = useState<string | null>(()=>{
        const fileKeys = Object.keys(files)
        return fileKeys.length > 0 ? fileKeys[0] : null
    })
    const [copied, setCopied] = useState(false)
    
    const treeData = useMemo(()=>{
        return convertFilesToTreeItems(files)
    },[files])

    const handleFileSelect = useCallback((filePath:string)=>{
        if(files[filePath]){
            setSelectedFiles(filePath)
        }
    },[files])

    const handleCopyCode = useCallback(() => {
        if (!selectedFiles || !files[selectedFiles]) return
        navigator.clipboard.writeText(files[selectedFiles])
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }, [selectedFiles, files])

    // Create breadcrumb items from file path
    const getBreadcrumbItems = useCallback((filePath: string) => {
        const parts = filePath.split('/').filter(Boolean)
        return parts.map((part, index) => {
            const isLast = index === parts.length - 1
            return {
                name: part,
                path: parts.slice(0, index + 1).join('/'),
                isLast
            }
        })
    }, [])

   return(
    <div className="h-full relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/20 via-gray-50/10 to-zinc-50/20 dark:from-slate-950/10 dark:via-gray-950/5 dark:to-zinc-950/10" />
        
        <div className="relative h-full">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={30} minSize={30} className="relative">
                    {/* Tree view background */}
                    <div className="absolute inset-0 bg-card/50 backdrop-blur-sm border-r border-border/50" />
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-purple-500/5" />
                    
                    <div className="relative h-full">
                        <TreeView value={selectedFiles} data={treeData} onSelect={handleFileSelect} />
                    </div>
                </ResizablePanel>
                
                <ResizableHandle 
                    withHandle 
                    className="relative group hover:bg-gradient-to-b hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300"
                />
                
                <ResizablePanel defaultSize={70} minSize={50} className="relative">
                    {/* Code view background */}
                    <div className="absolute inset-0 bg-card/30 backdrop-blur-sm" />
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 via-transparent to-gray-500/5" />
                    
                    {selectedFiles && files[selectedFiles] ? (
                        <div className="flex flex-col w-full h-full relative">
                            {/* Enhanced Header */}
                            <div className="relative border-b border-border/50 bg-card/50 backdrop-blur-sm px-4 py-3 flex justify-between items-center gap-x-3">
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-500/5 via-gray-500/5 to-transparent" />
                                
                                <div className="relative flex-1 min-w-0">
                                    <Breadcrumb>
                                        <BreadcrumbList>
                                            {getBreadcrumbItems(selectedFiles).map((item) => (
                                                <Fragment key={item.path}>
                                                    <BreadcrumbItem>
                                                        {item.isLast ? (
                                                            <div className="flex items-center gap-2">
                                                                <FileIcon className="w-4 h-4 text-blue-500" />
                                                                <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                                                    {item.name}
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <BreadcrumbLink 
                                                                className="text-sm text-muted-foreground hover:text-blue-600 cursor-pointer transition-colors duration-200 flex items-center gap-1"
                                                                onClick={() => handleFileSelect(item.path)}
                                                            >
                                                                {item.name}
                                                            </BreadcrumbLink>
                                                        )}
                                                    </BreadcrumbItem>
                                                    {!item.isLast && <BreadcrumbSeparator className="text-muted-foreground/50" />}
                                                </Fragment>
                                            ))}
                                        </BreadcrumbList>
                                    </Breadcrumb>
                                </div>
                                
                                <div className="relative">
                                    <Hint text={copied ? "Copied!" : "Copy code to clipboard"} side="bottom">
                                        <Button 
                                            variant="outline" 
                                            size="icon" 
                                            className={`
                                                relative group border-border/50 bg-card/80 backdrop-blur-sm
                                                hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-teal-500/10
                                                hover:border-emerald-500/30 transition-all duration-300 hover:scale-105
                                                ${copied ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/50' : ''}
                                            `}
                                            onClick={handleCopyCode} 
                                            disabled={false}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 rounded-md transition-all duration-300" />
                                            {copied ? (
                                                <CheckIcon className="w-4 h-4 text-emerald-600" />
                                            ) : (
                                                <CopyIcon className="w-4 h-4 transition-colors group-hover:text-emerald-600" />
                                            )}
                                        </Button>
                                    </Hint>
                                </div>
                            </div>
                            
                            {/* Enhanced code view container */}
                            <div className="flex-1 overflow-auto relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-50/10 via-transparent to-gray-50/10 dark:from-slate-950/5 dark:to-gray-950/5" />
                                <div className="relative">
                                    <CodeView code={files[selectedFiles]} language={getLanguageExtension(selectedFiles)} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col h-full items-center justify-center p-8 relative">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-500/20 via-gray-500/20 to-zinc-500/20 rounded-full blur-xl animate-pulse" />
                                <div className="relative w-16 h-16 bg-gradient-to-r from-slate-600 to-gray-600 rounded-full flex items-center justify-center mb-4">
                                    <FileIcon className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent mb-2">
                                No File Selected
                            </h3>
                            <p className="text-sm text-muted-foreground text-center max-w-sm">
                                Choose a file from the tree view to see its contents here.
                            </p>
                        </div>
                    )}
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    </div>
   )
}