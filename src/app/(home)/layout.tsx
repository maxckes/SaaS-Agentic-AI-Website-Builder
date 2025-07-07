import { Navbar } from "./navbar"

interface Props{
    children:React.ReactNode
}

export default function Layout({children}:Props){
    return(
        <main className="relative min-h-screen bg-background dark:bg-[radial-gradient(#393439_1px,transparent_1px)] bg-[radial-gradient(#dadde2_1px,transparent_1px)] [background-size:16px_16px]">
            <Navbar />
            <div className="flex flex-col px-4 pb-4">
                {children}
            </div>
        </main>
    )
}