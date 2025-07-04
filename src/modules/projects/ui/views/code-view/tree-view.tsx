import { TreeItem } from "@/lib/types";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ChevronRightIcon, FolderIcon, FolderOpenIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  VscFile, 
  VscFileCode, 
  VscJson, 
  VscMarkdown, 
  VscFilePdf,
  VscFileMedia,
  VscDatabase,
  VscSettingsGear,
  VscSourceControl,
  VscTerminalBash,
  VscSymbolColor
} from "react-icons/vsc";
import { useState } from "react";

interface TreeViewProps {
  value: string | null;
  data: TreeItem[];
  onSelect: (value: string) => void;
}

// Enhanced file icon function with VS Code icons
const getFileIcon = (filename: string) => {
  const extension = filename.split('.').pop()?.toLowerCase();
  const iconClass = "w-4 h-4 flex-shrink-0";
  
  switch (extension) {
    case 'tsx':
    case 'jsx':
      return <VscFileCode className={`${iconClass} text-blue-500`} />;
    case 'ts':
    case 'js':
      return <VscFileCode className={`${iconClass} text-yellow-500`} />;
    case 'json':
      return <VscJson className={`${iconClass} text-green-500`} />;
    case 'md':
    case 'mdx':
      return <VscMarkdown className={`${iconClass} text-purple-500`} />;
    case 'css':
    case 'scss':
    case 'less':
      return <VscSymbolColor className={`${iconClass} text-pink-500`} />;
    case 'html':
    case 'htm':
      return <VscFileCode className={`${iconClass} text-orange-500`} />;
    case 'pdf':
      return <VscFilePdf className={`${iconClass} text-red-500`} />;
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'svg':
    case 'webp':
      return <VscFileMedia className={`${iconClass} text-cyan-500`} />;
    case 'sql':
    case 'db':
    case 'sqlite':
      return <VscDatabase className={`${iconClass} text-indigo-500`} />;
    case 'config':
    case 'conf':
    case 'env':
    case 'ini':
    case 'toml':
    case 'yaml':
    case 'yml':
      return <VscSettingsGear className={`${iconClass} text-gray-500`} />;
    case 'gitignore':
    case 'gitattributes':
      return <VscSourceControl className={`${iconClass} text-orange-400`} />;
    case 'sh':
    case 'bash':
    case 'zsh':
    case 'fish':
      return <VscTerminalBash className={`${iconClass} text-green-400`} />;
    default:
      if (filename.startsWith('.')) {
        return <VscSettingsGear className={`${iconClass} text-gray-400`} />;
      }
      return <VscFile className={`${iconClass} text-gray-400`} />;
  }
};

export const TreeView = ({ value, data, onSelect }: TreeViewProps) => {
  return (
    <div className="h-full relative">
      {/* Background enhancements */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 via-transparent to-purple-50/20 dark:from-blue-950/10 dark:to-purple-950/10" />
      
      <div className="relative h-full">
        <SidebarProvider>
          <Sidebar collapsible="none" className="w-full border-0 bg-transparent">
            <SidebarContent className="bg-transparent">
              <SidebarGroup className="p-2">
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-1">
                    {data.map((item,index)=>(
                        <TreeViewItem key={index} item={item} seletecValue={value} onSelect={onSelect} parentPath="" />
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarRail className="bg-transparent" />
          </Sidebar>
        </SidebarProvider>
      </div>
    </div>
  );
};

interface TreeViewItemProps {
  item: TreeItem;
  seletecValue: string | null;
  onSelect: (value: string) => void;
  parentPath?: string;
}

const TreeViewItem = ({
  item,
  seletecValue,
  onSelect,
  parentPath,
}: TreeViewItemProps) => {
  const [name, ...items] = Array.isArray(item) ? item : [item];
  const currentPath = parentPath ? `${parentPath}/${name}` : name;
  const [isOpen, setIsOpen] = useState(true);
  
  if (!items.length) {
    const isSelected = seletecValue === currentPath;
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          isActive={isSelected}
          className={`
            relative group transition-all duration-200 rounded-md h-8
            hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10
            data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-500/20 data-[active=true]:to-purple-500/20
            data-[active=true]:border-blue-500/30 data-[active=true]:shadow-sm
            border border-transparent hover:border-blue-500/20
          `}
          onClick={() => onSelect(currentPath)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-md transition-all duration-200" />
          
          <div className="flex items-center gap-2 relative z-10 min-w-0">
            {getFileIcon(name)}
            <span className={`
              truncate text-sm transition-colors
              ${isSelected ? 'text-blue-700 dark:text-blue-300 font-medium' : 'text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400'}
            `}>
              {name}
            </span>
          </div>
          
          {isSelected && (
            <div className="absolute right-1 top-1/2 -translate-y-1/2 w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }
  
  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            className={`
              relative group transition-all duration-200 rounded-md h-8
              hover:bg-gradient-to-r hover:from-amber-500/10 hover:to-orange-500/10
              border border-transparent hover:border-amber-500/20
            `}
            onClick={() => onSelect(currentPath)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 to-orange-500/0 group-hover:from-amber-500/5 group-hover:to-orange-500/5 rounded-md transition-all duration-200" />
            
            <div className="flex items-center gap-2 relative z-10 min-w-0">
              <ChevronRightIcon className={`
                w-4 h-4 flex-shrink-0 transition-transform duration-200 text-muted-foreground group-hover:text-amber-600
                ${isOpen ? 'rotate-90' : ''}
              `} />
              {isOpen ? (
                <FolderOpenIcon className="w-4 h-4 flex-shrink-0 text-amber-500" />
              ) : (
                <FolderIcon className="w-4 h-4 flex-shrink-0 text-amber-600" />
              )}
              <span className="truncate text-sm text-foreground group-hover:text-amber-600 transition-colors">
                {name}
              </span>
            </div>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="transition-all duration-200">
          <SidebarMenuSub className="ml-2 border-l border-border/30 pl-2 space-y-1">
            {items.map((item,index)=>(
                <TreeViewItem key={index} item={item} seletecValue={seletecValue} onSelect={onSelect} parentPath={currentPath} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
};
