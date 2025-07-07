"use client";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import TextareaAutosize from "react-textarea-autosize";
import { GithubIcon } from "lucide-react";
import { Hint } from "@/modules/projects/ui/components/hint";
import { useClerk, useUser } from "@clerk/nextjs";

export default function Home() {
  const router = useRouter();
  const trpc = useTRPC();
  const [value, setValue] = useState("");
  const { user } = useUser();
  const clerk = useClerk();
  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onError: (error) => {
        console.log(error);
        toast.error(error.message);
      },
      onSuccess: (data) => {
        router.push(`/projects/${data.id}`);
      },
    })
  );
  
  const listProjects = useQuery(trpc.projects.getMany.queryOptions())
  return (
    <div className="flex flex-col max-w-4xl mx-auto w-full px-4">
      
      <section className="space-y-8 py-[8vh] 2xl:py-24">
        <div className="flex flex-col items-center gap-y-8 text-center">
          <div className="relative group">
            <Hint text="View on Github" side="bottom" align="center">
              <Link href="https://github.com/maxckes" target="_blank" className="block relative transition-transform hover:scale-105">
                <Image
                  src={process.env.NEXT_PUBLIC_AVATAR_URL || ""}
                  alt="KOTIKALAPOODI EKARSHA SUMAJ - GitHub Profile"
                  width={120}
                  height={120}
                  className="rounded-2xl shadow-lg border-2 border-white/10 transition-all duration-300 group-hover:border-white/30"
                />
                
                {/* GitHub icon overlay */}
                <div className="absolute -bottom-2 -right-2 bg-black dark:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                  <GithubIcon className="w-4 h-4 text-white dark:text-black" />
                </div>
              </Link>
            </Hint>
            
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 animate-pulse group-hover:opacity-40 transition-opacity -z-10"></div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Agentic AI
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              SaaS Website Builder
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
              Transform your ideas into stunning SaaS websites with the power of AI. 
              Just describe what you want, and watch it come to life.
            </p>
          </div>

          <div className="w-full max-w-2xl space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur"></div>
              <div className="relative bg-card border border-border/50 rounded-xl p-6 shadow-lg backdrop-blur-sm">
                <TextareaAutosize
                  className="w-full resize-none bg-transparent border-none outline-none text-sm md:text-base placeholder:text-muted-foreground/70"
                  value={value}
                  onChange={(e)=>setValue(e.target.value)}
                  disabled={createProject.isPending}
                  minRows={3}
                  maxRows={8}
                  placeholder="Describe the SaaS website you want to create...&#10;&#10;Example: 'A task management app with user authentication, dashboard, and team collaboration features'"
                  onKeyDown={(e)=>{
                    if(e.key==="Enter"&&(e.ctrlKey || e.metaKey)){
                      if(!user) return clerk.openSignIn()
                      e.preventDefault()
                      createProject.mutate({ value: value })
                    }
                    
                  }}

                />
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-border/30">
                  <p className="text-xs text-muted-foreground">
                    Press <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded border">Ctrl/Cmd + Enter</kbd> to submit
                  </p>
                  <Button
                    disabled={createProject.isPending || !value.trim()}
                    onClick={() => {
                      if(!user) return clerk.openSignIn()
                      createProject.mutate({ value: value })
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                  >
                    {createProject.isPending ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Creating...
                      </div>
                    ) : (
                      "Create Website"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl mt-12">
            <div className="flex flex-col items-center gap-3 p-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="font-semibold">AI-Powered</h3>
              <p className="text-sm text-muted-foreground text-center">
                Advanced AI understands your vision and creates exactly what you need
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 p-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground text-center">
                From concept to working website in minutes, not weeks
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 p-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-semibold">Beautiful Design</h3>
              <p className="text-sm text-muted-foreground text-center">
                Modern, responsive designs that look great on all devices
              </p>
            </div>
          </div>
        </div>
      </section>
             {listProjects.data && listProjects.data.length > 0 && (
         <section className="space-y-8 py-12">
           <div className="flex flex-col items-center gap-y-8 text-center">
             <h2 className="text-3xl font-bold">
               {user?.fullName}&apos;s Recent Projects
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
               {listProjects.data.map((project: { id: string; name: string }) => (
                 <Link 
                   key={project.id} 
                   href={`/projects/${project.id}`}
                   className="flex flex-col items-center gap-3 p-6 bg-card border border-border/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                 >
                   <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                     <span className="text-2xl">🚀</span>
                   </div>
                   <h3 className="font-semibold text-lg">{project.name}</h3>
                   <p className="text-sm text-muted-foreground">Click to view project</p>
                 </Link>
               ))}
             </div>
           </div>
         </section>
       )}
    </div>
  );
}
