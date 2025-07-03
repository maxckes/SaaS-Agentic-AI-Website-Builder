import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import  TextareaAutosize  from "react-textarea-autosize"
import {z} from "zod"
import {useState} from "react"
import {toast} from "sonner"
import { ArrowUpIcon,Loader2Icon } from "lucide-react"
import {useMutation,useQueryClient} from "@tanstack/react-query"
import {cn} from "@/lib/utils"
import {useTRPC} from "@/trpc/client"
import {Button} from "@/components/ui/button"
import { Form,FormField } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


interface MessageFormProps{
    projectId:string
}
const formSchema = z.object({
    value:z.string().min(1,{message:"value is required"}).max(10000,{message:"value must be less than 10000 characters"}),
})

export const MessageForm = ({projectId}:MessageFormProps) => {
    const[isFocused,setIsFocused] = useState(false)
    const showUsage = false;
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            value:"",
        },
    })
    const trpc = useTRPC()
    const queryClient = useQueryClient()
    const createMessage = useMutation(trpc.messages.create.mutationOptions({
        onSuccess:()=>{
            form.reset()
            queryClient.invalidateQueries(trpc.messages.getMany.queryOptions({projectId}))
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    }))
    const isPending = createMessage.isPending
    const isDisabled = isPending || !form.formState.isValid
    const onSubmit = async (values:z.infer<typeof formSchema>)=>{
        await createMessage.mutateAsync({
            value:values.value,
            projectId,
        })
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn("relative border p-4 pt-1 rounded-xl bg-sidebar dark:bg-sidebar transition-all",isFocused&&"shadow-xs",showUsage&&"rounded-t-none" )}>
                <FormField control={form.control} name="value" render={({field})=>(
                    <TextareaAutosize
                    className="pt-4 resize-none backgroung-transparent border-none outline-none w-full text-sm font-mono"
                    {...field}
                    disabled={isPending}
                    onFocus={()=>setIsFocused(true)}
                    onBlur={()=>setIsFocused(false)}
                    minRows={2}
                    maxRows={8}
                    placeholder="How can I help you today?"
                    onKeyDown={(e)=>{
                        if(e.key==="Enter"&&(e.ctrlKey || e.metaKey)){
                            e.preventDefault()
                            form.handleSubmit(onSubmit)(e)
                        }
                    }}
                    />
                )}
                />
                <div className="flex gap-x-2 items-end justify-between pt-2">
                    <div className="flex items-center gap-2">
                        <div className="text-[10px] text-muted-foreground font-mono">
                            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                                <span className="text-xs">&#8984;</span>
                                <span className="">Enter</span>
                            </kbd>
                            &nbsp;to Submit
                        </div>
                        <Select  defaultValue="gemini-2.5-flash">
                            <SelectTrigger className="h-5 w-auto bg-transparent border-none shadow-none outline-none text-muted-foreground text-[10px] border-muted-foreground/20 font-mono">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="max-h-60 overflow-y-auto">
                                {/* Gemini Models - Available */}
                                <SelectItem value="gemini-2.5-flash">
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">Gemini 2.5 Flash</span>
                                        <span className="text-[8px] text-green-500">✓</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="gemini-1.5-flash" disabled>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">Gemini 1.5 Flash</span>
                                        <span className="text-[8px] text-muted-foreground">🔒</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="gemini-1.5-flash-8b" disabled>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">Gemini 1.5 Flash 8B</span>
                                        <span className="text-[8px] text-muted-foreground">🔒</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="gemini-1.5-pro" disabled>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">Gemini 1.5 Pro</span>
                                        <span className="text-[8px] text-muted-foreground">🔒</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="gemini-1.0-pro" disabled>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">Gemini 1.0 Pro</span>
                                        <span className="text-[8px] text-muted-foreground">🔒</span>
                                    </div>
                                </SelectItem>
                                
                                

                                {/* OpenAI Models - Locked */}
                                <SelectItem value="gpt-4.5-preview" disabled>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">GPT-4.5 Preview</span>
                                        <span className="text-[8px] text-muted-foreground">🔒</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="gpt-4o" disabled>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">GPT-4o</span>
                                        <span className="text-[8px] text-muted-foreground">🔒</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="chatgpt-4o-latest" disabled>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">ChatGPT-4o Latest</span>
                                        <span className="text-[8px] text-muted-foreground">🔒</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="gpt-4o-mini" disabled>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">GPT-4o Mini</span>
                                        <span className="text-[8px] text-muted-foreground">🔒</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="gpt-4" disabled>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">GPT-4</span>
                                        <span className="text-[8px] text-muted-foreground">🔒</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="o1" disabled>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">o1</span>
                                        <span className="text-[8px] text-muted-foreground">🔒</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="o1-preview" disabled>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">o1 Preview</span>
                                        <span className="text-[8px] text-muted-foreground">🔒</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="o1-mini" disabled>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">o1 Mini</span>
                                        <span className="text-[8px] text-muted-foreground">🔒</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="o3-mini" disabled>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">o3 Mini</span>
                                        <span className="text-[8px] text-muted-foreground">🔒</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="gpt-4-turbo" disabled>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">GPT-4 Turbo</span>
                                        <span className="text-[8px] text-muted-foreground">🔒</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="gpt-3.5-turbo" disabled>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">GPT-3.5 Turbo</span>
                                        <span className="text-[8px] text-muted-foreground">🔒</span>
                                    </div>
                                </SelectItem>

                                {/* Grok Models - Locked */}
                                <SelectItem value="grok-2-1212" disabled>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">Grok-2-1212</span>
                                        <span className="text-[8px] text-muted-foreground">🔒</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="grok-2" disabled>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">Grok-2</span>
                                        <span className="text-[8px] text-muted-foreground">🔒</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="grok-2-latest" disabled>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">Grok-2 Latest</span>
                                        <span className="text-[8px] text-muted-foreground">🔒</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="grok-3" disabled>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">Grok-3</span>
                                        <span className="text-[8px] text-muted-foreground">🔒</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="grok-3-latest" disabled>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">Grok-3 Latest</span>
                                        <span className="text-[8px] text-muted-foreground">🔒</span>
                                    </div>
                                </SelectItem>

                                {/* Claude Models - Locked */}
                                <SelectItem value="claude-3-5-haiku-latest" disabled>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">Claude 3.5 Haiku Latest</span>
                                        <span className="text-[8px] text-muted-foreground">🔒</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="claude-3-5-haiku-20241022" disabled>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">Claude 3.5 Haiku</span>
                                        <span className="text-[8px] text-muted-foreground">🔒</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="claude-3-5-sonnet-latest" disabled>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">Claude 3.5 Sonnet Latest</span>
                                        <span className="text-[8px] text-muted-foreground">🔒</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="claude-3-5-sonnet-20241022" disabled>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">Claude 3.5 Sonnet</span>
                                        <span className="text-[8px] text-muted-foreground">🔒</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="claude-3-5-sonnet-20240620" disabled>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">Claude 3.5 Sonnet (June)</span>
                                        <span className="text-[8px] text-muted-foreground">🔒</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="claude-3-opus-latest" disabled>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">Claude 3 Opus Latest</span>
                                        <span className="text-[8px] text-muted-foreground">🔒</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="claude-3-opus-20240229" disabled>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">Claude 3 Opus</span>
                                        <span className="text-[8px] text-muted-foreground">🔒</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="claude-3-sonnet-20240229" disabled>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">Claude 3 Sonnet</span>
                                        <span className="text-[8px] text-muted-foreground">🔒</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="claude-3-haiku-20240307" disabled>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">Claude 3 Haiku</span>
                                        <span className="text-[8px] text-muted-foreground">🔒</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="claude-2.1" disabled>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">Claude 2.1</span>
                                        <span className="text-[8px] text-muted-foreground">🔒</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="claude-2.0" disabled>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">Claude 2.0</span>
                                        <span className="text-[8px] text-muted-foreground">🔒</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="claude-instant-1.2" disabled>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px]">Claude Instant 1.2</span>
                                        <span className="text-[8px] text-muted-foreground">🔒</span>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" size="icon" className="size-8" disabled={isDisabled}>
                        {isPending ? <Loader2Icon className="size-4 animate-spin" /> : <ArrowUpIcon className="size-4" />}
                    </Button>
                </div>
                
                
            </form>
        </Form>
    )
}