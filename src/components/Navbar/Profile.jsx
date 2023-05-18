import { auth } from "../../../firebase-config";
import { useSignOut } from "react-firebase-hooks/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { Popover } from "@headlessui/react";

const Profile = ({ setCurrentList, user }) => {
  const [signOut, loading, error] = useSignOut(auth);

  const signOutHelper = async () => {
    await signOut();
    setCurrentList("defaultBluthumbProblems");
  };

  useEffect(() => {
    if (auth.currentUser) {
    }
  }, [user, auth]);

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="">
      <Popover className="relative">
        <Popover.Button className="rounded-full pt-1 focus:outline-none">
          {user && auth.currentUser.photoURL !== null ? (
            <img
              className="h-10 w-10 rounded-xl"
              src={auth.currentUser.photoURL}
              referrerPolicy="no-referrer"
            />
          ) : (
            <FontAwesomeIcon
              className="border-4 border-sky-500 rounded-xl p-1 text-sky-500 h-6"
              icon={faUser}
            />
          )}
        </Popover.Button>
        <Popover.Panel className="rounded-md bg-slate-50 dark:bg-slate-800 shadow-md absolute z-20 h-54 w-64 right-0 border-2 border-slate-200 dark:border-slate-700">
          <div className="flex flex-col p-5">
            <div className="flex flex-col justify-center items-center">
              <p className="bg-sky-500 dark:bg-sky-600 dark:text-slate-200 w-fit px-6 rounded-2xl text-center text-white font-bold text-xl">
                {auth.currentUser.displayName}
              </p>
              <p className="pt-1 break-all text-center text-slate-900 dark:text-gray-400 whitespace-normal">
                {auth.currentUser.email}
              </p>
            </div>
            <hr className="dark:border-slate-700 dark:border-2 my-4"></hr>
            <button
              onClick={signOutHelper}
              className="mt-8 mx-12 font-semibold rounded-lg py-1 dark:text-slate-200 dark:hover:bg-sky-500 dark:bg-sky-600 text-white bg-sky-500 hover:bg-sky-400 transition duration-100"
            >
              Sign Out
              <FontAwesomeIcon className="ml-2" icon={faRightFromBracket} />
            </button>
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  );
};

export default Profile;
