import { useState } from "react";
import { Outlet } from "react-router";
import { GlobalContext } from "../../contexts/GlobalContext";
import type { theme } from "../../types/general";
import Header from "./Header";

const AppLayout = () => {
  const [theme, setTheme] = useState<theme>("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <GlobalContext.Provider value={{ theme, toggleTheme }}>
      <Header />
      <main
        className= {
          theme === "dark"
            ? "bg-slate-900 text-gray-200 min-h-screen p-8 pt-20"
            : "bg-white text-gray-800 min-h-screen p-8 pt-20"
        }
      >
        <Outlet />
      </main>
    </GlobalContext.Provider>
  );
};

export default AppLayout;
