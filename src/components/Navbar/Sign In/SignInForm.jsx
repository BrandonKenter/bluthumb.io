import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const SignInForm = ({
  handleSignUpSwitchClick,
  handleFormSubmit,
  signInWithGoogle,
  formError,
}) => {
  return (
    <div className="flex bg-slate-50 dark:bg-slate-900 rounded-xl w-96 z-50 max-w-3xl min-h-fit flex-1 flex-col justify-center px-4 py-12 lg:px-4">
      <div className="flex flex-col items-center sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center py-2 px-3 w-fit bg-sky-500 dark:bg-sky-600 rounded-3xl">
          <div className="bg-slate-50 dark:bg-slate-900 px-2 rounded-3xl">
            <FontAwesomeIcon
              className="text-sky-500 dark:text-sky-600"
              icon={faThumbsUp}
            />
          </div>
        </div>

        <h2 className="mt-5 mb-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-slate-200">
          Sign in to your account
        </h2>
      </div>

      {formError === true ? (
        <div className="flex justify-center mx-0 bg-red-500 text-base py-2 my-3 rounded-md text-slate-50 font-semibold">
          Invalid email or password. Please try again.
        </div>
      ) : (
        <div> </div>
      )}

      <form
        className="space-y-6"
        action="#"
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();
          const email = e.target.loginEmail.value;
          const password = e.target.loginPassword.value;
          handleFormSubmit({ email, password });
        }}
      >
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="loginEmail"
              name="loginEmail"
              type="loginEmail"
              required
              className="pl-1 block w-full rounded-md border-0 py-1.5 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              autoComplete="new-password"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="loginPassword"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
            >
              Password
            </label>
            {/* <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-sky-600 hover:text-sky-500"
                  >
                    Forgot password?
                  </a>
                </div> */}
          </div>
          <div className="mt-2">
            <input
              id="loginPassword"
              name="loginPassword"
              type="password"
              required
              className="pl-1 block w-full rounded-md border-0 py-1.5 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              autoComplete="new-password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-sky-500 dark:bg-sky-600 dark:hover:bg-sky-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white dark:text-slate-300 shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            Sign in
          </button>
        </div>
      </form>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="w-full py-7 items-center justify-center flex flex-row">
          <hr className="m-2 inline-block w-20 bg-gray-200 dark:border-2 dark:border-slate-700 dark:bg-slate-700"></hr>
          <span className="text-slate-400 text-base">or</span>
          <hr className="m-2 inline-block w-20 bg-gray-200 dark:border-2 dark:border-slate-700 dark:bg-slate-700"></hr>
        </div>

        <div className="flex justify-center">
          <button
            className="px-4 py-2 text-base border flex gap-2 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 bg-slate-200 border-slate-200 hover:bg-slate-300 rounded-lg text-slate-700 hover:text-slate-900 transition duration-150 justify-center items-center"
            onMouseDown={signInWithGoogle}
          >
            <img
              className="w-5 h-5"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            ></img>
            <span>Login with Google</span>
          </button>
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          Not registered?{" "}
          <a
            onMouseDown={handleSignUpSwitchClick}
            className="font-semibold leading-6 text-sky-600 hover:text-sky-500 cursor-pointer"
          >
            Sign up here!
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
