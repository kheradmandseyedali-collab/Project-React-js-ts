import { Outlet } from "react-router-dom";
import Header from "../components/global/Header";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 dark:bg-slate-900 dark:text-gray-200 transition-colors duration-200">
      <Header />
      <main className="p-8 pt-20">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout ;