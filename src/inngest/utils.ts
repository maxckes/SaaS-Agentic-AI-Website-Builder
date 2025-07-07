import { Sandbox } from "@e2b/code-interpreter";
import { AgentResult, TextMessage } from "@inngest/agent-kit";

export async function getSandboxUrl(sandboxId:string){
    const sandbox = await Sandbox.connect(sandboxId)
    await sandbox.setTimeout(Number(process.env.SANDBOX_TIMEOUT) || 60000 * 10)
    return sandbox
}

export async function lastAssistantMessageContent(result:AgentResult){
    const lastAssistantMessageIndex = result.output.findLastIndex((message)=>message.role === "assistant")
    const message = result.output[lastAssistantMessageIndex] as TextMessage | undefined
    return message?.content ? typeof message.content === "string" ? message.content : message.content.map((item)=>item.text).join("") : undefined
}