import { useEffect, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";

const ShimmerMessages = () => {
  const messages = [
    "THinking....",
    "Loading....",
    "Generating....",
    "Analyzing your request....",
    "Building your website....",
    "Crafting Components....",
    "Optimizing Layouts....",
    "Adding Final Touches....",
    "Almost Ready....",
  ];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [messages.length]);
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground animate-pulse">
        {messages[currentMessageIndex]}
      </span>
    </div>
  );
};

export const MessageLoading = () => {
  return (
    <div className="flex flex-col group px-2 pb-4 font-mono">
      <div className="flex items-center gap-2 pl-2 mb-2">
        <div className="relative">
          <Image
            src="https://avatars.githubusercontent.com/u/143759943?v=4"
            alt="MaxC"
            width={32}
            height={32}
            className="shrink-0 rounded-full"
          />
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
        </div>

        <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">MaxC</span>
                    <span className="text-xs text-muted-foreground">
                        {format(new Date(), "h:mm a, MMM d, yyyy")}
                    </span>
                </div>
      </div>
      <div className="pl-8.5 flex flex-col gap-y-4">
        <ShimmerMessages />
      </div>
    </div>
  );
};
