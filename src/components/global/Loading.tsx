const Loading = ({ text = '' }: { text ?: string }) => {
    return (
        <div className="flex gap-2.5 items-center bg-blue-300/30 border border-blue-400 text-blue-500 p-4 rounded-lg text-lg font-bold">
            <span className="border-4 border-t-cyan-300 border-b-cyan-300 border-r-black border-l-black animate-spin w-4.5 h-4.5 rounded-full"></span>
            {text ? text : 'Loading .....'}
        </div>
    )
}

export default Loading ;