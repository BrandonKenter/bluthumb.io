import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const RootLayout = ({
  currentList,
  setCurrentList,
  setListLoading,
  user,
  darkMode,
  setDarkMode,
}) => {
  return (
    <div>
      <Navbar
        currentList={currentList}
        setCurrentList={setCurrentList}
        setListLoading={setListLoading}
        user={user}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
