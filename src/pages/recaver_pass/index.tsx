import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Ds_Button from "../../components/desing_system/DsButton";
import { Lock , LockKeyholeOpen , MoveLeft , RefreshCcw } from "lucide-react";

const RecoverPassword = () => {

  const [captchaText, setCaptchaText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isRefresh, setIsRefresh] = useState(false);
  const [isTest, setIsTest] = useState(false);
  const navigate = useNavigate() ;

  const generateCaptcha = () => {
    setIsRefresh (true)
    const randomStr = Math.random().toString(36).substring(2 , 7)
    setCaptchaText(randomStr) ;
    setTimeout (() => {
        setIsRefresh (false) ;
    } , 300)
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleVerify = () => {
  if (/\s/.test(inputValue)) {
    toast.info(" ! بدون فاصله وارد کنید ", {
      position: "top-right",
      autoClose: 3500,
      theme: "light",
    });
    return;
  }

  if (inputValue.trim() === "") {
    toast.warn(" ای بابا ! کپچا را که خالی گذاشتی ، اول پرش کن ", {
      position: "top-right",
      autoClose: 3500,
      theme: "light",
    });
    return;
  }

  else if (inputValue === captchaText) {
    toast.success("آفرین رمز کپچا را درست زدی", {
      position: "top-right",
      autoClose: 3500,
      theme: "light",
    });
    setIsTest (true)
    setTimeout(() => {
      navigate("/recover-password/recover");
      
    }, 1200);
  } 
  else {
    toast.error("ای بابا! رمز کپچا را اشتباه زدی", {
      position: "top-right",
      autoClose: 3500,
      theme: "light",
    });
    generateCaptcha();
    setInputValue(""); 
  }
};

  return (
    <>
        <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-800 p-8 shadow-2xl border border-slate-700">
        <h2 className="mb-6 text-center text-2xl font-bold text-white">
          بازیابی رمز عبور
        </h2>
        <div className="mb-6 flex items-center justify-between rounded-xl bg-slate-950 p-4 border border-slate-700">
          <span className="font-mono text-2xl font-black tracking-widest text-emerald-400 select-none">
            {captchaText}
          </span>
          <Ds_Button
            type="button"
            onClick={generateCaptcha}
            className="flex justify-center items-center gap-2 rounded-lg bg-slate-800 px-3 py-1.5 text-lg text-slate-300 hover:bg-slate-700 transition-colors"
            startIcon={<RefreshCcw size={16.5} className={isRefresh ? "animate-spin" : ""} />}
            size="large"
            color="primary"
            variant="outlined"
          >
             تغییر کد
          </Ds_Button>
        </div>

        {/* فرم ورود اطلاعات */}
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="mb-2 block text-sm font-medium text-slate-300">
              کد کپچا را وارد کنید : 
            </label>
            <p className="text-gray-400 text-sm">! بدون فاصله وارد کنید</p>
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="مثلاً : A4B9X"
              required
              className="w-full rounded-xl border border-slate-600 bg-slate-900 p-3 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-center tracking-widest font-mono"
            />
            
          </div>

          <Ds_Button
            // type="button"
            className="w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-500 active:scale-[0.98] transition-all flex justify-center items-center gap-x-2"
            onClick={() => handleVerify()}
            color="success"
            size="large"
            variant="contained"
            startIcon={isTest ? <LockKeyholeOpen size={19} /> : <Lock size={19} />}
          >
            تایید و بازیابی
          </Ds_Button>
        </form>

        <div className="mt-6 text-center">
          <Ds_Button
            type="button"
            onClick={() => navigate("/login")}
            className="flex justify-center items-center gap-x-1.5 text-sm text-slate-400 hover:text-white transition-colors"
            color="inherit"
            size="large"
            startIcon={<MoveLeft size={20} />}
            variant="contained"
          >
            بازگشت به صفحه ورود
          </Ds_Button>
        </div>
      </div>
    </div>
    </>
  );
}

export default RecoverPassword ;