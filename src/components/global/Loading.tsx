import { Loader2 } from "lucide-react"

const Loading = ({ text = '' }: { text?: string }) => {
    return (
        <div className="flex gap-1 items-center bg-blue-300/30 border border-blue-400 text-blue-500 p-4 rounded-lg text-lg font-bold">
            <Loader2 className="animate-spin" />
            {text ? text : 'Loading...'}
        </div>
    )
}

export default Loading