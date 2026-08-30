import { useEffect, useState, type SubmitEvent } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router"
import DsButton from "../../components/desing_system/DsButten"
import PageHeader from "../../components/global/PageHeader"
import PagesLayout from "../../components/global/PagesLayout"
import { DUMMY_BASE_URL } from "../../constants"
import { Eye, EyeOff } from "lucide-react"

type FormData = {
    username: string
    password: string
}

const initalData: FormData = {
    username: '',
    password: ''
}

const Login = () => {

    const [formData, setFormData] = useState<FormData>(initalData);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const loginApi = async () => {
        const res = await fetch(`${DUMMY_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await res.json()
        if (res.ok) {
            return data
        } else {
            toast.error(data.message)
        }
    }

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        const data = await loginApi();
        sessionStorage.setItem('token', data.accessToken);
        toast.success('You Logined In Successfuly :)')
        navigate('/app/home');
        setLoading(false);
    }

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            navigate('/app/home')
        }
    }, [])

    return (
        <PagesLayout>
            <PageHeader text="Login Page" />

            <form className="bg-slate-800 p-8 rounded-lg mx-auto w-1/3" onSubmit={(e) => handleSubmit(e)}>
                <div className='mb-4'>
                    <label className='text-lg mb-1'>Username</label>
                    <input
                        type="text"
                        placeholder='Enter Todo Username'
                        className='w-full border border-gray-400 bg-gray-800 px-3 py-2 text-lg rounded-md'
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label className='text-lg mb-1'>Passweord</label>
                    <div className="flex justify-center relative">
                        <input
                        type={showPassword ? "text" : "password"}
                        placeholder='Enter Passweord'
                        className='w-full border border-gray-400 bg-gray-800 px-3 py-2 text-lg rounded-md'
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                    <span onClick={() => setShowPassword (!showPassword)} className="absolute top-2.5 right-1.5 text-black cursor-pointer">
                        {showPassword ? <EyeOff /> : <Eye />}
                    </span>
                    </div>
                </div>

                <div className="flex gap-4 mt-6">
                    <DsButton type="submit" color="blue" size="lg" text="Login To App" isLoading={loading} />
                    <Link to="/recover-password">
                        <DsButton color="gray" size="lg" text="Recover Pasword" isDisabled={loading} />
                    </Link>
                </div>


            </form>


        </PagesLayout>
    )
}

export default Login ;