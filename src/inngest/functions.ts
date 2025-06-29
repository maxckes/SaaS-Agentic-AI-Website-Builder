import { inngest } from "./client";
import { createAgent,gemini } from "@inngest/agent-kit";
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "3s");
     const summaryAgent = createAgent({
        name: "summary-agent",
        system: "You are an expert react js and next js developer.  You write readable, concise, maintainable code. you write code in a way that is easy to understand and easy to maintain. write snippet of code that is easy to understand and easy to maintain.",
        model: gemini({ model: "gemini-2.0-flash" }),
      });
      const {output} = await summaryAgent.run(`write following snippet: ${event.data.value}`);
      console.log(output);
    return { output };
  },
);
