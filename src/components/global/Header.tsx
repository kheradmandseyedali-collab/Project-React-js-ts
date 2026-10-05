import {
  LoaderCircle,
  LucideLogOut,
  LucideMoon,
  LucideSun,
  ShoppingCart,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { DUMMY_BASE_URL } from "../../constants";
import { useAuthStore } from "../../stores/auth.store";
import Sidebarme from "./sidebarme";
import { useCartStore } from "../../stores/useCartStore";
import { toast } from "react-toastify";
import { useGlobalStore } from "../../stores/global.store";

const Header = () => {
  const navigate = useNavigate();
  const [mainLoading, setMainLoading] = useState(true);
  const theme = useGlobalStore((state) => state.theme);
  const toggleTheme = useGlobalStore((state) => state.toggleTheme);

  const { user, setUser } = useAuthStore();
  const { cartItems } = useCartStore();
  const afterLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const links = [
    { title: "Home", link: "/app/home" },
    { title: "About Us", link: "/app/about-us" },
    { title: "Contact Us", link: "/app/contact-us" },
    { title: "Todo List", link: "/app/todo-list" },
    { title: "Posts", link: "/app/posts" },
    { title: "Shop", link: "/app/shop" },
  ];

  const getMeApi = async () => {
    const res = await fetch(`${DUMMY_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Pass JWT via Authorization header
      },
    });

    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      toast.error(data.message);
      afterLogout();
    }
  };

  const getMeData = async () => {
    const data = await getMeApi();
    setUser(data);
    setMainLoading(false);
  };

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/login");
    } else {
      getMeData();
    }
  }, []);
  // !confirm()
  const logout = () => {
    if (!confirm(" Are you sure to want to logout ? ")) {
      return;
    }
    afterLogout();
  };

  return (
    <>
      <header className="bg-slate-800 p-4 fixed top-0 right-0 left-0 h-18">
        <nav className="flex justify-between px-4">
          <ul className="flex justify-center gap-12">
            {links.map((item, index) => {
              return (
                <li key={index}>
                  <NavLink
                    to={item.link}
                    className={({ isActive }) =>
                      `text-xl text-gray-400 hover:text-gray-300 ${isActive ? "text-blue-500!" : ""}`
                    }
                  >
                    {item.title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <div className="flex justify-center items-center text-white">
            <Link to="/app/cart">
              <div>
                {cartItems.length === 0 ? (
                  <span>
                    <ShoppingCart size={26} />
                  </span>
                ) : (
                  <div className="relative">
                    <ShoppingCart size={27} />
                    <span className="absolute -top-3.5 -right-5 bg-red-600 rounded-full w-5.5 h-5.5 flex justify-center items-center ">
                      {cartItems.length}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          </div>
          <div className="flex gap-2 items-center text-white">
            {
              <span onClick={toggleTheme} className="cursor-pointer">
                {theme === "light" ? <LucideMoon /> : <LucideSun />}
              </span>
            }

            <Link to="/app/profile" className="flex items-center gap-1 text-lg">
              <img
                src={user?.image}
                alt={user?.firstName + " " + user?.lastName}
                className="w-12 h-12 p-1 bg-slate-600 rounded-full"
              />
              {user?.firstName + " " + user?.lastName}
            </Link>
            <LucideLogOut
              className="text-red-500 cursor-pointer"
              size={22}
              onClick={logout}
            />
            <Sidebarme />
          </div>
        </nav>
      </header>

      {mainLoading && (
        <div className="w-screen h-screen fixed top-0 right-0 bg-slate-700 text-white text-3xl flex gap-3 flex-col justify-center items-center">
          <LoaderCircle size={50} className="animate-spin" />
          Please Wait A Moment ...
        </div>
      )}
    </>
  );
};

export default Header ;