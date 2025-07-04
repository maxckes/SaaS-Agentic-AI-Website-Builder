import { useEffect, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";

const ShimmerMessages = () => {
  const messages = [
    { text: "🤔 Thinking deeply...", color: "from-blue-500 to-cyan-500" },
    { text: "⚡ Processing request...", color: "from-purple-500 to-pink-500" },
    { text: "🎨 Generating design...", color: "from-green-500 to-teal-500" },
    { text: "🔍 Analyzing requirements...", color: "from-orange-500 to-red-500" },
    { text: "🏗️ Building your website...", color: "from-indigo-500 to-purple-500" },
    { text: "⚙️ Crafting components...", color: "from-cyan-500 to-blue-500" },
    { text: "✨ Optimizing layouts...", color: "from-pink-500 to-rose-500" },
    { text: "🎯 Adding final touches...", color: "from-emerald-500 to-green-500" },
    { text: "🚀 Almost ready...", color: "from-violet-500 to-purple-500" },
  ];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [messages.length]);
  
  const currentMessage = messages[currentMessageIndex];
  
  return (
    <div className="relative">
      {/* Background glow */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${currentMessage.color} opacity-20 rounded-xl blur transition-all duration-500`}></div>
      
      <div className="relative bg-card/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-border/50">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 bg-gradient-to-r ${currentMessage.color} rounded-full animate-pulse`}></div>
          <span className="text-sm font-medium bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            {currentMessage.text}
          </span>
          <div className="flex gap-1">
            <div className={`w-1 h-1 bg-gradient-to-r ${currentMessage.color} rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
            <div className={`w-1 h-1 bg-gradient-to-r ${currentMessage.color} rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
            <div className={`w-1 h-1 bg-gradient-to-r ${currentMessage.color} rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MessageLoading = () => {
  return (
    <div className="flex flex-col group px-3 pb-8">
      {/* Header with avatar and metadata */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-full blur opacity-40 animate-pulse"></div>
          <Image
            src="https://avatars.githubusercontent.com/u/143759943?v=4"
            alt="MaxC AI Assistant"
            width={36}
            height={36}
            className="relative rounded-full ring-2 ring-white/50 dark:ring-black/50 shadow-lg"
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
            <div className="px-2 py-0.5 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full border border-green-200/50 dark:border-green-800/50 animate-pulse">
              Thinking
            </div>
          </div>
          <span className="text-xs text-muted-foreground">
            {format(new Date(), "h:mm a, MMM d, yyyy")}
          </span>
        </div>
      </div>
      
      {/* Content area */}
      <div className="ml-12 flex flex-col gap-4">
        <ShimmerMessages />
      </div>
    </div>
  );
};
