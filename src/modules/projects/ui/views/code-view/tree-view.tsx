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
import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface TreeViewProps {
  value: string | null;
  data: TreeItem[];
  onSelect: (value: string) => void;
}

export const TreeView = ({ value, data, onSelect }: TreeViewProps) => {
  return (
    <SidebarProvider>
      <Sidebar collapsible="none" className="w-full">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {data.map((item,index)=>(
                    <TreeViewItem key={index} item={item} seletecValue={value} onSelect={onSelect} parentPath="" />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
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
  if (!items.length) {
    const isSelected = seletecValue === currentPath;
    return (
      <SidebarMenuButton
        isActive={isSelected}
        className="data-[active=true]:bg-sidebar-transparent"
        onClick={() => onSelect(currentPath)}
      >
        <FileIcon className="w-4 h-4 mr-2" />
        <span className="truncate">{name}</span>
      </SidebarMenuButton>
    );
  }
  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            isActive={seletecValue === currentPath}
            className="data-[active=true]:bg-sidebar-transparent"
            onClick={() => onSelect(currentPath)}
          >
            <ChevronRightIcon className="transition-transform" />
            <FolderIcon className="w-4 h-4 mr-2" />
            <span className="truncate">{name}</span>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
        <SidebarMenuSub>
            {items.map((item,index)=>(
                <TreeViewItem key={index} item={item} seletecValue={seletecValue} onSelect={onSelect} parentPath={currentPath} />
            ))}
        </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
};
