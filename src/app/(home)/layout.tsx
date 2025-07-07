import { Navbar } from "./navbar"

interface Props{
    children:React.ReactNode
}

export default function Layout({children}:Props){
    return(
        <div className="relative min-h-screen bg-background">
            <Navbar />
            <main className="relative">
                {children}
            </main>
        </div>
    )
}