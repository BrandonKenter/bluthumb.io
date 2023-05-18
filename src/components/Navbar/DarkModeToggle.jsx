import { Switch } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun as faSunBright } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

function DarkModeToggle({ darkMode, setDarkMode }) {
  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute("class", darkMode ? "dark" : "");
    htmlElement.setAttribute(
      "style",
      darkMode ? "background-color: rgb(15, 23, 42)" : ""
    );
    window.localStorage.setItem("dark_Mode", JSON.stringify(darkMode));
    const storedDarkMode = JSON.parse(window.localStorage.getItem("dark_Mode"));
  }, [darkMode]);

  return (
    <Switch
      checked={darkMode}
      onChange={() => {
        setDarkMode(!darkMode);
      }}
      className={`${
        darkMode ? "dark:bg-slate-700" : "bg-slate-200"
      } relative inline-flex h-8 w-14 items-center rounded-full`}
    >
      <span
        className={`${
          darkMode ? "translate-x-7" : "-translate-x-1"
        } flex justify-center items-center h-8 w-8 transform rounded-full bg-slate-100 dark:bg-slate-600 transition`}
      >
        <FontAwesomeIcon
          icon={faSunBright}
          className="w-5 h-5 text-slate-300 dark:text-slate-500"
        />
      </span>
    </Switch>
  );
}

export default DarkModeToggle;
