import "../../../tailwind.css";
import { AuthenticationForm } from "./AuthenticationForm";
import React, { useRef, useEffect, useState } from "react";

const SignIn = ({ currentList, setCurrentList, setListLoading }) => {
  const authenticationFormRef = useRef(null);
  const [signInFormOpened, setSignInFormOpened] = useState(false);
  const [formError, setFormError] = useState(false);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      // Checks if user is clicking outside or inside the AuthenticationForm component or clicking "Sign up here!" or "Sign in here!"
      if (
        authenticationFormRef.current &&
        !authenticationFormRef.current.contains(event.target) &&
        authenticationFormRef.current &&
        event.target.className !=
          "font-semibold leading-6 text-sky-600 hover:text-sky-500 cursor-pointer"
      ) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [authenticationFormRef]);

  const handleOpen = () => {
    setSignInFormOpened(true);
  };

  const handleClose = () => {
    setSignInFormOpened(false);
    setFormError(false);
  };

  const handleSignInClick = (event) => {
    event.stopPropagation();
    handleOpen();
  };

  return (
    <>
      <div>
        {signInFormOpened ? (
          <div className="bg-black flex fixed items-center justify-center top-0 left-0 right-0 bottom-0 z-40 bg-opacity-70">
            <div ref={authenticationFormRef}>
              <AuthenticationForm
                currentList={currentList}
                setCurrentList={setCurrentList}
                setSignInFormOpened={setSignInFormOpened}
                formError={formError}
                setFormError={setFormError}
                setListLoading={setListLoading}
              />
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div
        className="bg-sky-500 hover:bg-sky-400 dark:bg-sky-600 dark:hover:bg-sky-500 dark:text-slate-200 font-semibold text-white px-3 py-2 rounded-lg transition ease-in-out duration-200 cursor-pointer flex items-center"
        onClick={handleSignInClick}
      >
        Sign In
      </div>
    </>
  );
};

export default SignIn;
