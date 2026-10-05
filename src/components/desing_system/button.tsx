import { LoaderCircle } from "lucide-react"
import type { ReactElement } from "react";

type PropTypes = {
    type ?: "button" | "submit" | "reset" ,
    text ?: string ,
    color ?: "red" | "blue" | "green" | "gray" | "gray_2" | "blue_2" | "red_2" | "green_2" | "indigo" | "slate" ,
    size ?: "xxl" | "xl" | "lg" | "md" | "sm" ,
    icon ?: ReactElement ,
    className ?: string ,
    tooltip ?: string ,
    isLoading ?: boolean ,
    isDisabled ?: boolean ,
    justIcon ?: boolean ,
    onClick ?: () => void
}

const Button = ({ type , text , color = "gray" , size = "md" , icon , isLoading = false , isDisabled = false , justIcon = false , className = "" , onClick } : PropTypes) => {

    let colorClass = "" ;
    let sizeClass = "" ;

    switch (color) {
        case "red" : colorClass = "bg-red-600 text-white rounded-md cusor-pointer hover:bg-red-500 text-bold font-semibold " ;
            break 
        case "green" : colorClass = "bg-green-600 text-white rounded-md cusor-pointer hover:bg-green-500 text-bold font-semibold " ;
            break 
        case "blue" : colorClass = "bg-blue-600 text-white rounded-md cusor-pointer hover:bg-blue-500 text-bold font-semibold " ; 
            break
        case "gray" : colorClass = "bg-gray-600 text-white rounded-md cusor-pointer hover:bg-gray-500 text-bold font-semibold " ;
            break 
        case "gray_2" : colorClass = "text-white shadow-xl hover:bg-slate-800 font-semibold font-bold bg-slate-700" ;
            break 
        case "blue_2" : colorClass = "bg-blue-500/10 hover:bg-blue-500 hover:text-white text-blue-400 transition-all" ;
            break 
        case "red_2" : colorClass = "text-red-600 transition-all  bg-red-600/10 hover:bg-red-600 hover:text-white" ;
            break 
        case "green_2" : colorClass = "text-green-600 transition-all  bg-green-600/10 hover:bg-green-600 hover:text-white" ;
            break 
        case "indigo" : colorClass = "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" ;
            break 
        case "slate" : colorClass = "text-slate-300 hover:bg-slate-700/60 hover:text-white" ;
            break 
    }
    switch (size) {
        case "xxl" : sizeClass = `p-1.5 rounded-lg text-sm` ;
            break 
        case "xl" : sizeClass = `text-xl px-5 py-2.5 ${justIcon ? "h-10 w-10 p-0" : ""}` ;
            break 
        case "lg" : sizeClass = `text-lg px-3 py-2 ${justIcon ? "h-10 w-10 p-0" : ""}` ;
            break 
        case "md" : sizeClass = `text-md px-2 py-1  ${justIcon ? "h-10 w-10 p-0" : ""}` ; 
            break
        case "sm" : sizeClass = `text-sm px-1.5 py-0.5  ${justIcon ? "h-10 w-10 p-0" : ""}` ;
            break 
    }

    return (
        <>
            <button 
            type={type}
            className={`cursor-pointer transition-all flex justify-between items-center ${colorClass} ${sizeClass} ${className} disabled: ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={onClick}
            disabled = {isLoading || isDisabled ? isDisabled : false}
            >
                {icon && icon}
                { isLoading ? <LoaderCircle size={18.5} className="animate-spin"/> : undefined }
                {text}
            </button>
        </>
    )
}

export default Button ;