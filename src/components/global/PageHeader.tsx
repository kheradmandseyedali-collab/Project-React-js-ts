import { LucideArrowLeft } from "lucide-react"
import type { FC } from "react"
import { useNavigate } from "react-router-dom"
import DsTypography from "../desing_system/DsTypography"
import Ds_Button from "../desing_system/DsButton"

type PropTypes = {
    text : string
    element ?: HTMLElement
    backRoute ?: string
    showBack ?: boolean
}

const PageHeader: FC<PropTypes> = ({ text , element , backRoute , showBack = false }) => {

    const navigate = useNavigate();

    const back = () => {
        if (backRoute) {
            navigate(backRoute)
        } else {
            navigate(-1)
        }
    }

    return (
        <div className="flex justify-between items-center">
            <DsTypography element={element ? element : 'h1'} className="text-3xl font-bold mb-4">{text}</DsTypography>
            {
                showBack &&
                <Ds_Button color="primary" startIcon={<LucideArrowLeft />} size="large" onClick={back}>Back</Ds_Button>
            }
        </div>
    )
}

export default PageHeader ;