import { useEffect, useState } from "react";
import PageHeader from "../../components/global/PageHeader";
import { DUMMY_BASE_URL } from "../../constants";
import type { User } from "../../types/user";
import { useProfileStore } from "../../stores/sidebarProfile.store";
import ProfileSidebar from "./components/ProfileSideBar";
import UserInfoTab from "./components/UserInfoTab";
import ShowProducts from "./products";
import LoveProducts from "./LoveProducts";

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const activeTab = useProfileStore((state) => state.activeTab);

  const getMeApi = async () => {
    try {
      const res = await fetch(`${DUMMY_BASE_URL}/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token") || ""}`,
        },
      });
      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getMeApi();
  }, []);

  return (
    <div className="p-4 md:p-6" dir="rtl">
      <PageHeader text="پروفایل کاربری" />

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <ProfileSidebar user={user} />

        {/* <main className="flex-1 bg-slate-800 rounded-xl p-6 text-white min-h-[300px]">
          {activeTab === "info" && <UserInfoTab user={user} />}
          {activeTab === "orders" && <ShowProducts />}
          {activeTab === "favorites" && <LoveProducts />}
        </main> */}
        <main className="flex-1 bg-white dark:bg-slate-800 rounded-xl p-6 text-gray-800 dark:text-white min-h-[300px]">
          {activeTab === "info" && <UserInfoTab user={user} />}
          {activeTab === "orders" && <ShowProducts />}
          {activeTab === "favorites" && <LoveProducts />}
        </main>
      </div>
    </div>
  );
};

export default Profile;
