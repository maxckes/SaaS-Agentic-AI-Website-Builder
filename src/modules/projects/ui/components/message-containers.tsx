import { useEffect } from "react";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { MessageCard } from "./messade-card";
import { MessageForm } from "./message-form";
import { useRef } from "react";
import { Fragment } from "@/generated/prisma";
import { MessageLoading } from "./message-loading";

interface Props {
  projectID: string;
  activeFragment: Fragment | null;
  setActiveFragment: (fragment: Fragment | null) => void;
}
const MessageContainers = ({
  projectID,
  activeFragment,
  setActiveFragment,
}: Props) => {
  const trpc = useTRPC();
  const bottomRef = useRef<HTMLDivElement>(null);
  const lastAssistantMessageRef = useRef<string | null>(null);
  const { data: messages } = useSuspenseQuery(
    trpc.messages.getMany.queryOptions({
      projectId: projectID,
    },{refetchInterval:5000})
  );
  useEffect(() => {
    const lastAssignedMessageWithFragments = messages.findLast(
      (message) => message.role === "ASSISTANT"
    );

    if(lastAssignedMessageWithFragments?.fragments && lastAssignedMessageWithFragments.fragments.id !== lastAssistantMessageRef.current){
        setActiveFragment(lastAssignedMessageWithFragments.fragments)
        lastAssistantMessageRef.current = lastAssignedMessageWithFragments.fragments.id
    }
  }, [messages, setActiveFragment]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]);
  const lastMessage = messages[messages.length - 1];
  const lastUserMessage = lastMessage.role === "USER";
  return (
    <>
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 bg-background dark:bg-[radial-gradient(#393439_1px,transparent_1px)] bg-[radial-gradient(#dadde2_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
      
      {/* Messages container */}
      <div className="flex flex-col flex-1 min-h-0 relative">
        <div className="flex flex-col overflow-y-auto min-h-0 custom-scrollbar">
          <div className="pt-6 pr-1 pb-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center space-y-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                    <span className="text-4xl">💬</span>
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-2xl blur animate-pulse"></div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Start Your Conversation
                  </h3>
                  <p className="text-muted-foreground max-w-md">
                    Send your first message to begin building your AI-powered website. 
                    Describe what you want to create!
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={message.id} className="relative">
                    {/* Message connector line */}
                    {index < messages.length - 1 && (
                      <div className="absolute left-6 top-16 w-0.5 h-8 bg-gradient-to-b from-border to-transparent"></div>
                    )}
                    
                    <div className="relative">
                      {/* Glow effect for active fragments */}
                      {activeFragment?.id === message.fragments?.id && (
                        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur"></div>
                      )}
                      
                      <MessageCard
                        key={message.id}
                        content={message.content}
                        fragments={message.fragments}
                        role={message.role}
                        createdAt={message.createdAt}
                        isActive={activeFragment?.id === message.fragments?.id}
                        onFragmentClick={() => setActiveFragment(message.fragments)}
                        type={message.type}
                      />
                    </div>
                  </div>
                ))}
                
                {/* Loading message with enhanced styling */}
                {lastUserMessage && (
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl blur animate-pulse"></div>
                    <MessageLoading />
                  </div>
                )}
                
                <div ref={bottomRef}></div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Enhanced message form container */}
      <div className="relative p-4 pt-2">
        {/* Enhanced gradient overlay */}
        <div className="absolute -top-8 left-0 right-0 h-8 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none"></div>
        
        {/* Glassmorphism container for form */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur"></div>
          <div className="relative bg-card/80 border border-border/50 rounded-xl p-4 shadow-lg backdrop-blur-sm">
            <MessageForm projectId={projectID} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageContainers;
