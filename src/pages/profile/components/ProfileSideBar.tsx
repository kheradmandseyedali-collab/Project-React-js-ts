import { User , ShoppingBag , Heart , LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProfileStore } from "../../../stores/sidebarProfile.store";
import Button from "../../../components/desing_system/button";

type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  gender: string;
  image: string;
};

type ProfileSideBarProps = {
  user: UserType | null;
};

const ProfileSideBar = ({ user }: ProfileSideBarProps) => {
  const { activeTab, setActiveTab } = useProfileStore();
  const navigate = useNavigate();

  const afterLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const logout = () => {
    const isConfirmed = confirm("آیا از خروج از حساب کاربری اطمینان دارید؟");
    if (isConfirmed) {
      afterLogout();
    }
  };

  return (
    <aside className="w-full md:w-80 bg-slate-800/80 rounded-3xl p-6 text-white border border-slate-700/50 shadow-xl flex flex-col gap-6">
      <div className="flex items-center gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-700/30">
        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-700 flex items-center justify-center border-2 border-indigo-500/30 shrink-0">
          {user?.image ? (
            <img
              src={user.image}
              alt={user.firstName}
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={28} className="text-slate-400" />
          )}
        </div>
        <div className="overflow-hidden">
          <h2 className="font-bold text-lg text-slate-100 truncate">
            {user ? `${user.firstName} ${user.lastName}` : "کاربر مهمان"}
          </h2>
          <p className="text-xs text-slate-400 truncate mt-0.5">
            {user?.email || "در حال بارگذاری..."}
          </p>
        </div>
      </div>
      <nav className="flex flex-col gap-2.5">
          <Button
            color={activeTab === "info" ? "indigo" : "slate"}
            size="md"
            icon={<User size={20} />}
            onClick={() => setActiveTab("info")}
            type="button"
            text="اطلاعات حساب کاربری"
            className="w-full flex items-center justify-start gap-1 rounded-lg px-3.5 py-2.5"
          />
          <Button
            color={activeTab === "orders" ? "indigo" : "slate"}
            size="md"
            icon={<ShoppingBag size={20} />}
            onClick={() => setActiveTab("orders")}
            text="سفارش‌ها"
            type="button"
            className="w-full flex items-center justify-start gap-1 rounded-lg px-3.5 py-2.5"
          />
          <Button
            color={activeTab === "favorites" ? "indigo" : "slate"}
            size="md"
            icon={<Heart size={20} />}
            onClick={() => setActiveTab("favorites")}
            text="علاقه‌مندی‌ها"
            type="button"
            className="w-full flex items-center justify-start gap-1 rounded-lg px-3.5 py-2.5"
          />
        <hr className="border-slate-700/50 my-2" />
        <Button
          color="red_2"
          size="md"
          icon={<LogOut size={20} />}
          onClick={logout}
          text="خروج از حساب"
          type="button"
          className="w-full flex items-center justify-start gap-1 rounded-lg px-3.5 py-2.5 text-md"
        />
      </nav>
    </aside>
  );
};

export default ProfileSideBar;
