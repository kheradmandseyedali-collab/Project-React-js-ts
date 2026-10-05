import { useEffect, useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../../components/global/PageHeader";
import PagesLayout from "../../layout/PagesLayout";
import { DUMMY_BASE_URL } from "../../constants";
import { Eye, EyeOff, User } from "lucide-react";
import Ds_Button from "../../components/desing_system/DsButton";
import { toast } from "react-toastify";

export type LoginFormData = {
  username: string;
  password: string;
};

const initalData: LoginFormData = {
  username: "",
  password: "",
};

const Login = () => {
  const [formData , setFormData] = useState<LoginFormData>(initalData);
  const [loading , setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const loginApi = async () => {
    const res = await fetch(`${DUMMY_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      toast.error(data.message);
    }
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const data = await loginApi();
    sessionStorage.setItem("token", data.accessToken);
    toast.success("You Logined In Successfully :)");
    navigate("/app/home");
    setLoading(false);
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      navigate("/app/home");
    }
  }, []);

  const handelShowPassword = () => {

    setShowPassword(!showPassword)

    setTimeout (() => {
        setShowPassword (false)
    } , 3000)
  } 

  return (

    <PagesLayout>
      <PageHeader text="Login Page" />

      <form
        className="bg-slate-800 p-8 rounded-lg mx-auto w-1/3 "
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="mb-4">
          <label className="text-lg mb-1">Username</label>
          <div className="flex items-center justify-center relative">
            <input
              type="text"
              placeholder="Enter Todo Username"
              className="w-full border border-gray-400 bg-gray-800 px-3 py-2 text-lg rounded-md"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
            <span className="absolute top-2.5 right-1.5 text-lg text-black">
              <User />
            </span>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-lg mb-1">Password</label>
          <div className="flex justify-center relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Passweord"
              className="w-full border border-gray-400 bg-gray-800 px-3 py-2 text-lg rounded-md"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <span
              onClick={handelShowPassword}
              className="absolute top-2.5 right-1.5 text-black cursor-pointer"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </span>
          </div>
        </div>
        <div className="flex gap-6 mt-6 justify-between items-center">
          <Ds_Button
            type="submit"
            color="success"
            size="large"
            loading={loading}
            disabled={loading}
            className="flex justify-center items-center gap-2"
          >
            Login To App
          </Ds_Button>
          <Link to="/recover-password">
            <Ds_Button color="info" size="large" variant="text">
              Recover Password
            </Ds_Button>
          </Link>
        </div>
      </form>
    </PagesLayout>
  );
};

export default Login ;