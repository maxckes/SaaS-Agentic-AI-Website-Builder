import { inngest } from "./client";
import { createAgent,createNetwork,createTool,gemini, Tool } from "@inngest/agent-kit";
import {Sandbox} from "@e2b/code-interpreter";
import { getSandboxUrl, lastAssistantMessageContent } from "./utils";
import { z } from "zod";
import { PROMPT } from "@/prompt";
import { prisma } from "@/lib/db";

interface AgentState{
  summary:string
  files: {[path:string]:string}
}

export const codeAgent = inngest.createFunction(
  { id: "code-agent" },
  { event: "code-agent/run" },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox-id",async()=>{
      const sandbox = await Sandbox.create('ai-saas-website-builderx')
      return sandbox.sandboxId
    })
     const summaryAgent = createAgent<AgentState>({
        name: "summary-agent",
        description: "An expert coding agent",
        system: PROMPT,
        model: gemini({ 
          model: "gemini-2.5-flash",
        }),
        tools: [
          createTool({
            name:"terminal",
            description:"Use the terminal to run commands",
            parameters:z.object({
              command:z.string()
            }),
            handler:async({command},{step})=>{
              return await step?.run("terminal",async()=>{
                const buffers = {stdout:"",stderr:""}
                try{
                  const sandbox = await getSandboxUrl(sandboxId)
                  const result = await sandbox.commands.run(command,{
                    onStdout(data:string) {
                      buffers.stdout += data
                    },
                    onStderr(data:string) {
                      buffers.stderr += data
                    },
                    
                  })
                  return result.stdout
                }
                catch(e){
                  console.error(`Command failed: ${e} \n stderr: ${buffers.stderr} \n stdout: ${buffers.stdout}`)
                  return `Command failed: ${e} \n stderr: ${buffers.stderr} \n stdout: ${buffers.stdout}`
                }
              })
            }
          }),
          createTool({
            name:"createOrUpdateFiles",
            description:"Create or update a file in the sandbox",
            parameters:z.object({
              files:z.array(z.object({
                path:z.string(),
                content:z.string(),
              })),
            }),
            handler:async({files},{step, network}:Tool.Options<AgentState>)=>{
              const newFiles = await step?.run("createOrUpdateFiles",async()=>{
                try{
                  const updatedFiles = await network.state.data.files || {}
                  const sandbox = await getSandboxUrl(sandboxId)
                  for(const file of files){
                    await sandbox.files.write(file.path,file.content)
                    updatedFiles[file.path] = file.content
                  }
                  return updatedFiles
                }
                catch(e){
                  console.error(`Failed to create or update files: ${e}`)
                  return `Failed to create or update files: ${e}`
                }
              })
              if(typeof newFiles === "object"){
                network.state.data.files = newFiles
              }
            },
          }),
          createTool({
            name:"readFiles",
            description:"Reads files from the sandbox",
            parameters:z.object({
              files:z.array(z.string()),
            }),
            handler:async({files},{step})=>{
              return await step?.run("readFiles",async()=>{
                try{
                  const sandbox = await getSandboxUrl(sandboxId)
                  const contents = []
                  for(const file of files){
                    const content = await sandbox.files.read(file)
                    contents.push({
                      path:file,content
                    })
                  }
                  return JSON.stringify(contents)
                }
                catch(e){
                  console.error(`Failed to read file: ${e}`)
                  return `Failed to read file: ${e}`
                }
              })
            }
            
          })


        ],
        lifecycle: {
          onResponse: async({result,network})=>{
            try {
              const lastAssistantMessage = await lastAssistantMessageContent(result)
              if(lastAssistantMessage && network){
                if(lastAssistantMessage.includes("<task_summary>")){
                  network.state.data.summary = lastAssistantMessage
                }
              }
              return result
            } catch (error) {
              console.warn("Error processing response:", error)
              return result
            }
          },
        }
      });
      const network = createNetwork<AgentState>({
         name:"website-builder-network",
         agents:[summaryAgent],
         maxIter:15,
         router: async({network})=>{
          const summary = network.state.data.summary
          if(summary){
            return;
          }
          return summaryAgent
         }
      })
      const result = await network.run(event.data.value)
      const isError = !result.state.data.summary || Object.keys(result.state.data.files).length === 0
      const sandboxUrl = await step.run("get-sandbox-url",async()=>{
        const sandbox = await getSandboxUrl(sandboxId)
        const host =  sandbox.getHost(3000)
        return `https://${host}`
      })
      await step.run("save-result",async()=>{
        if(isError){
          return await prisma.message.create({
            data:{
              content:"Something went wrong Try again",
              role:"ASSISTANT",
              type:"ERROR",
            }
          })
        }
        return await prisma.message.create({
          data:{
            content:result.state.data.summary,
            role:"ASSISTANT",
            type:"RESULT",
            fragments:{
              create:{
                title:"Fragment",
                files:result.state.data.files,
                sandboxUrl:sandboxUrl,
              }
            }
          }
        })
      })
      return { url:sandboxUrl, files:result.state.data.files ,summary:network.state.data.summary};
  },
);
