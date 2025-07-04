import Prism from "prismjs"
import {useEffect, useRef} from "react"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-css"
// import "prismjs/components/prism-css"
// import "prismjs/components/prism-scss"
// import "prismjs/components/prism-html"
// import "prismjs/components/prism-json"
// import "prismjs/components/prism-markdown"
// import "prismjs/components/prism-bash"
// import "prismjs/components/prism-python"
// import "prismjs/components/prism-java"
// import "prismjs/components/prism-c"
// import "prismjs/components/prism-cpp"
// import "prismjs/components/prism-csharp"
// import "prismjs/components/prism-php"
// import "prismjs/components/prism-ruby"
// import "prismjs/components/prism-swift"
// import "prismjs/components/prism-sql"
// import "prismjs/components/prism-xml"
// import "prismjs/components/prism-yaml"
// import "prismjs/components/prism-toml"
// import "prismjs/components/prism-ini"
// import "prismjs/components/prism-docker"
// import "prismjs/components/prism-git"
// import "prismjs/components/prism-powershell"
// import "prismjs/components/prism-yaml"
import "./code-theme.css"

interface Props{
    code:string,
    language:string,
}

export const CodeView = ({code,language}:Props) => {
    const codeRef = useRef<HTMLElement>(null);
    
    useEffect(()=>{
        if (codeRef.current) {
            Prism.highlightElement(codeRef.current);
        }
    },[code, language])
    
    const lines = code.split('\n');
    
    return(
        <div className="code-view h-full flex flex-col relative">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 via-gray-50/20 to-zinc-50/30 dark:from-slate-950/20 dark:via-gray-950/10 dark:to-zinc-950/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.05),transparent_70%)] dark:bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.02),transparent_70%)]" />
            
            <div className="relative flex-1 min-h-0">
                <pre className="h-full m-0 bg-transparent border-0 rounded-none text-sm flex">
                    {/* Enhanced Line numbers column */}
                    <div className="flex flex-col bg-card/30 backdrop-blur-sm text-muted-foreground select-none border-r border-border/30 min-w-[3.5rem] text-right px-3 py-4 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-500/5 to-transparent" />
                        <div className="relative">
                            {lines.map((_, index) => (
                                <div 
                                    key={index} 
                                    className="leading-6 font-mono text-xs transition-colors hover:text-blue-500 hover:bg-blue-500/5 px-1 rounded-sm"
                                >
                                    {index + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Enhanced Code content */}
                    <div className="flex-1 relative">
                        <div className="absolute inset-0 bg-card/20 backdrop-blur-sm" />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 via-transparent to-purple-500/3" />
                        
                        <div className="relative overflow-auto h-full">
                            <code 
                                ref={codeRef} 
                                className={`language-${language} block p-4 leading-6 font-mono text-sm whitespace-pre`}
                                style={{
                                    background: 'transparent',
                                    minHeight: '100%'
                                }}
                            >
                                {code}
                            </code>
                        </div>
                    </div>
                </pre>
            </div>
        </div>
    )
}
