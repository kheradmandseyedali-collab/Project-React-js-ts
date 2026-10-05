import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  House,
  ShoppingBag,
  CircleHelp,
  LogOut,
  ChevronDown,
  ChevronUp,
  X,
  Menu,
  StickyNote,
  FolderCheck,
  User
} from "lucide-react";
import Ds_Button from "../desing_system/DsButton";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenProducts, setIsOpenProducts] = useState(false);
  const [isOpenSettings, setIsOpenSettings] = useState(false);

  const navigate = useNavigate () ;

  const afterLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const handelOpen = () => {
    setIsOpen(true);
  };

  const handelHide = () => {
    setIsOpen(false);
  };

  const handelOpenProducts = () => {
    setIsOpenProducts((prev) => !prev);
    setIsOpenSettings(false);
  };

  const handelOpenSettings = () => {
    setIsOpenSettings((prev) => !prev);
    setIsOpenProducts(false);
  };


  const logout = () => {
    if (!confirm("Are you sure to want to logout?")) {
      return;
    }
    afterLogout();
  };

  return (
    <>
      {!isOpen && (
        <Ds_Button
          onClick={handelOpen}
          className="absolute top-0 right-0 z-50 rounded-md p-1.5 flex justify-center items-center"
          startIcon={<Menu size={23} />}
          color="success"
          size="medium"
          type="Button"
          variant="contained"
        ></Ds_Button>
      )}
      <aside
        className={`fixed top-0 right-0 z-100 flex h-full w-73 flex-col rounded-l-2xl bg-[#001f3f] p-4 text-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/20 pb-3">
          <span className="text-lg font-bold">پنل مدیریتی</span>
          <Ds_Button
            onClick={handelHide}
            variant="contained"
            className="rounded-full text-white w-10 h-10 hover:bg-white/20 flex justify-center items-center"
            startIcon={<X size={20} />}
            color="error"
            size="medium"
          />
        </div>
        <ul className="mt-4 flex flex-1 flex-col gap-3">
          <li onClick={handelHide}>
            <Link
              to="/app/home"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-white p-2.5 transition hover:bg-white/10"
            >
              <House size={20} />
              <span>HOME</span>
            </Link>
          </li>

          <li onClick={handelHide}>
            <Link
              to="/app/about-us"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-white p-2.5 transition hover:bg-white/10"
            >
              <CircleHelp size={20} />
              <span>ABOUT US</span>
            </Link>
          </li>

          <li>
            <div
              onClick={handelOpenProducts}
              className="relative flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-white p-2.5 transition hover:bg-white/10"
            >
              <ShoppingBag size={20} />
              <span>PRODUCTS</span>
              <span className="absolute left-3">
                {isOpenProducts ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </span>
            </div>

            <ul
              className={`space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                isOpenProducts
                  ? "mt-2 max-h-60 opacity-100"
                  : "mt-0 max-h-0 opacity-0"
              }`}
            >
              <li onClick={handelHide}>
                <Link
                  to="/app/shop"
                  className="flex w-full items-center justify-center rounded-md border border-white/40 py-1.5 text-sm transition hover:bg-white/15 mb-2"
                >
                  Product ALL
                </Link>
              </li>
              <li onClick={handelHide}>
                <Link
                  to="/app/product"
                  className="flex w-full items-center justify-center rounded-md border border-white/40 py-1.5 text-sm transition hover:bg-white/15"
                >
                  Product 1
                </Link>
              </li>
              <li onClick={handelHide}>
                <Link
                  to="/app/product"
                  className="flex w-full items-center justify-center rounded-md border border-white/40 py-1.5 text-sm transition hover:bg-white/15"
                >
                  Product 2
                </Link>
              </li>
              <li onClick={handelHide}>
                <Link
                  to="/app/product"
                  className="flex w-full items-center justify-center rounded-md border border-white/40 py-1.5 text-sm transition hover:bg-white/15"
                >
                  Product 3
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <div
              onClick={handelOpenSettings}
              className="relative flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-white p-2.5 transition hover:bg-white/10"
            >
              <User size={20} />
              <span>PROFILE</span>
              <span className="absolute left-3">
                {isOpenSettings ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </span>
            </div>

            <ul
              className={`space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                isOpenSettings
                  ? "mt-2 max-h-60 opacity-100"
                  : "mt-0 max-h-0 opacity-0"
              }`}
            >
              <li onClick={handelHide}>
                <Link
                  to="/app/profile"
                  className="flex w-full items-center justify-center rounded-md border border-white/40 py-1.5 text-sm transition hover:bg-white/15"
                >
                  حساب کاربری 
                </Link>
              </li>
              <li onClick={handelHide}>
                <Link
                  to="/app/profile"
                  className="flex w-full items-center justify-center rounded-md border border-white/40 py-1.5 text-sm transition hover:bg-white/15"
                >
                  سفارش ها 
                </Link>
              </li>
              <li onClick={handelHide}>
                <Link
                  to="/app/profile"
                  className="flex w-full items-center justify-center rounded-md border border-white/40 py-1.5 text-sm transition hover:bg-white/15"
                >
                  علاقه مندی ها
                </Link>
              </li>
            </ul>
          </li>

          <li onClick={handelHide}>
            <Link
              to="/app/todo-list"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-white p-2.5 transition hover:bg-white/10"
            >
              <FolderCheck size={20} />
              <span>todos</span>
            </Link>
          </li>

          <li onClick={handelHide}>
            <Link
              to="/app/posts"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-white p-2.5 transition hover:bg-white/10"
            >
              <StickyNote size={20} />
              <span>posts</span>
            </Link>
          </li>

          {/* خروج */}
          <li className="mt-auto" onClick={logout}>
            <Link
              to="/login"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-red-400  text-red-300 transition hover:bg-red-500/20 h-12.5"
            >
              <Ds_Button color="error" variant="outlined" className="w-100 h-full">
                <LogOut size={20} />
                <span>LOGOUT</span>
              </Ds_Button>
            </Link>
          </li>
        </ul>
      </aside>

      {isOpen && (
        <div
          onClick={handelHide}
          className="fixed inset-0 z-0 blur-2xl bg-black/40 backdrop-blur-md transition-opacity"
        />
      )}
    </>
  );
};

export default Sidebar;
