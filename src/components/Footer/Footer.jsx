import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-96 pb-5">
      <hr className="p-5 dark:border-slate-800"></hr>
      <div className="flex flex-col items-center">
        <p className="text-gray-900 dark:text-slate-200">© 2023 BluThumb.io</p>
        <div className="flex items-center pt-2">
          <NavLink
            to="privacy"
            className="text-sky-600 hover:text-sky-400 dark:text-sky-600 dark:hover:text-sky-500"
          >
            Privacy Policy
          </NavLink>

          <NavLink
            to="terms"
            className="text-sky-600 hover:text-sky-400 dark:text-sky-600 dark:hover:text-sky-500 ml-4"
          >
            Terms of Service
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Footer;
