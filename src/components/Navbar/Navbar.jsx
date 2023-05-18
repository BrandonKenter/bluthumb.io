import "../../tailwind.css";
import SignIn from "./Sign In/SignIn";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Profile from "./Profile";
import { NavLink } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = ({
  currentList,
  setCurrentList,
  setListLoading,
  user,
  darkMode,
  setDarkMode,
}) => {
  return (
    <nav className="flex justify-between align-middle select-none whitespace-nowrap m-auto max-w-9xl bg-gray-50 dark:text-slate-200 dark:bg-slate-800 shadow-md">
      <div className="flex p-2 pl-6">
        <div className="flex mr-3 items-center bg-gradient-to-br bg-sky-500 dark:bg-sky-600 rounded-3xl">
          <div className="bg-slate-200 dark:bg-slate-300  ml-3 pr-2 pl-2 rounded-3xl">
            <FontAwesomeIcon
              className="text-sky-400 dark:text-sky-500"
              icon={faThumbsUp}
              color="rgb(56 189 248)"
            />
          </div>
          <h1 className="pr-4 pl-2 ml-1 font-bold text-white dark:text-slate-200">
            BluThumb.io
          </h1>
        </div>

        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            !isActive
              ? "p-2 m-1 flex justify-center align-middle rounded-lg text-black dark:text-slate-200 transition ease-in-out duration-200 font-semibold hover:text-sky-600 dark:hover:text-sky-500 dark:hover:decoration-sky-500"
              : isActive
              ? "m-1 p-2 flex justify-center align-middle rounded-lg underline text-sky-500 dark:text-sky-500 dark:decoration-sky-500 decoration-sky-500 dark:hover:text-sky-500 dark:hover:decoration-sky-500 decoration-2 underline-offset-8 transition ease-in-out duration-200 font-semibold hover:text-sky-500"
              : ""
          }
        >
          Home
        </NavLink>

        <NavLink
          to="about"
          className={({ isActive, isPending }) =>
            !isActive
              ? "p-2 m-1 flex justify-center align-middle rounded-lg text-black dark:text-slate-200 transition ease-in-out duration-200 font-semibold hover:text-sky-600 dark:hover:text-sky-500 dark:hover:decoration-sky-50"
              : isActive
              ? "m-1 p-2 flex justify-center align-middle rounded-lg underline text-sky-500 decoration-sky-500 dark:text-sky-500 dark:decoration-sky-500 dark:hover:text-sky-500 dark:hover:decoration-sky-500 decoration-2 underline-offset-8 transition ease-in-out duration-200 font-semibold hover:text-sky-500"
              : ""
          }
        >
          About
        </NavLink>
      </div>

      <div className="flex justify-center items-center p-2 pr-6">
        <div className="pr-8">
          <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>

        {user ? (
          <div className="relative">
            <Profile setCurrentList={setCurrentList} user={user} />
          </div>
        ) : (
          <SignIn
            currentList={currentList}
            setCurrentList={setCurrentList}
            setListLoading={setListLoading}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
