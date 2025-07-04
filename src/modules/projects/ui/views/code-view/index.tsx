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
        <div className="code-view h-full flex flex-col">
            <pre className="p-0 bg-transparent border-none rounded-none m-0 text-xs flex flex-1 min-h-0">
                {/* Line numbers column */}
                <div className="flex flex-col bg-muted/30 text-muted-foreground select-none border-r border-border/50 min-w-[3rem] text-right pr-3 pl-2 py-2">
                    {lines.map((_, index) => (
                        <span key={index} className="leading-5 font-mono">
                            {index + 1}
                        </span>
                    ))}
                </div>
                {/* Code content */}
                <div className="flex-1 ">
                    <code ref={codeRef} className={`language-${language} block p-2 leading-5`}>
                        {code}
                    </code>
                </div>
            </pre>
        </div>
    )
}
