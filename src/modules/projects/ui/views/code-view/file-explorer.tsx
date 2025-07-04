import {CopyIcon} from "lucide-react"
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
    const treeData = useMemo(()=>{
        return convertFilesToTreeItems(files)
    },[files])

    const handleFileSelect = useCallback((filePath:string)=>{
        if(files[filePath]){
            setSelectedFiles(filePath)
        }
    },[files])

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
    <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={30} minSize={30} className="bg-sidebar">
            
            <TreeView value={selectedFiles} data={treeData} onSelect={handleFileSelect} />
        </ResizablePanel>
        <ResizableHandle withHandle className="hover:bg-primary transition-colors"/>
        <ResizablePanel defaultSize={70} minSize={50} className="bg-sidebar">
            {selectedFiles && files[selectedFiles] ? (
            <div className="flex flex-col w-full h-full">
                <div className="border-b bg-sidebar px-4 py-2 flex justify-between items-center gap-x-2">
                    <Breadcrumb className="flex-1">
                        <BreadcrumbList>
                            {getBreadcrumbItems(selectedFiles).map((item) => (
                                <Fragment key={item.path}>
                                    <BreadcrumbItem>
                                        {item.isLast ? (
                                            <span className="text-sm font-medium">{item.name}</span>
                                        ) : (
                                            <BreadcrumbLink 
                                                className="text-sm text-muted-foreground hover:text-foreground cursor-pointer"
                                                onClick={() => handleFileSelect(item.path)}
                                            >
                                                {item.name}
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                    {!item.isLast && <BreadcrumbSeparator />}
                                </Fragment>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                    <Hint text="Copy to Clipboard" side="bottom">
                        <Button variant="outline" size="icon" onClick={()=>{}} disabled={false}>
                            <CopyIcon className="w-4 h-4" />
                        </Button>
                    </Hint>
                </div>
                <div className="flex-1 overflow-auto">
                    <CodeView code={files[selectedFiles]} language={getLanguageExtension(selectedFiles)} />
                </div>
            </div>
            ) : (
                <div className="flex flex-col h-full items-center justify-center">
                    <p className="text-sm text-muted-foreground">No file selected</p>
                </div>
            )}
        </ResizablePanel>
    </ResizablePanelGroup>
   )
}