import { useEffect, useState } from "react"

interface ContainerProps {
    children: React.ReactNode
}

const Container = ({children}: ContainerProps) => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    }, [])

    if(!isMounted){
        return null
    }
    return (
        <div className="mx-auto">
            {children}
        </div>
    )
}

export default Container;