import { useNavigate } from "react-router"
import DsButton from "../../components/desing_system/DsButten"
import PageHeader from "../../components/global/PageHeader"
import PagesLayout from "../../components/global/PagesLayout"

const RecoverPass = () => {

    const navigate = useNavigate();
    return (
        <PagesLayout>
            <PageHeader text="Recover Your Password" />
            <DsButton color="blue" size="lg" text="Back" onClick={() => navigate('/login')} />
        </PagesLayout>
    )
}

export default RecoverPass