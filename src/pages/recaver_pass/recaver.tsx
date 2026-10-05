import { useState } from "react";
import Ds_Button from "../../components/desing_system/DsButton";
import { Eye, EyeClosed, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Recaver = () => {

  const [istoggel, setIsToggel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate () ;

  const handelToggel = () => {
    setIsToggel((e) => !e);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 150);
  };

  const handelBack = () => {
    navigate (-1)
  }
  
  const handelLogin = () => {
    navigate ("/login")
  }

  return (
    <>
    <main className="bg-slate-900 min-h-screen relative">
      <div>
    <Ds_Button
    color="warning"
    size="large"
    onClick={handelBack}
    className="absolute top-3.5 left-3"
    variant="outlined"
    >BACK</Ds_Button>
    <Ds_Button
    color="secondary"
    size="large"
    onClick={handelLogin}
    className="absolute top-3.5 left-7"
    variant="contained"
    >PAGE LOGIN</Ds_Button></div>
      <div className="flex flex-col gap-3 justify-center items-center h-160">
        <Ds_Button
          onClick={handelToggel}
          variant="contained"
          color={istoggel ? "success" : "error"}
          size="large"
          startIcon={istoggel ? <Eye /> : <EyeOff />}
          loading={isLoading}
        ></Ds_Button>
        <h1 className="text-2xl text-white"> : رمز شما</h1>
        {istoggel ? (
          <h2 className="text-4xl text-cyan-500 flex justify-center items-center gap-3">
            emilyspass
            <p className="text-white"><Eye className="mt-2.5" /></p>
          </h2>
        ) : (
          <EyeClosed className="text-2xl text-white" />
        )}
      </div>
      </main>
    </>
  );
};

export default Recaver ;