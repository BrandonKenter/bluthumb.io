import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const SignUpForm = ({
  handleFormSignInSwitchClick,
  handleFormSubmit,
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
          Sign up for an account
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
          const username = e.target.signupUsername.value;
          const email = e.target.signupEmail.value;
          const password = e.target.signupPassword.value;
          handleFormSubmit({ username, email, password });
        }}
        autoComplete="none"
      >
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200">
            Username
          </label>
          <div className="mt-2">
            <input
              id="signupUsername"
              name="signupUsername"
              type="username"
              required
              className="pl-1 block w-full rounded-md border-0 py-1.5 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              autoComplete="new-password"
              maxLength="16"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="signupEmail"
              name="signupEmail"
              type="email"
              required
              className="pl-1 block w-full rounded-md border-0 py-1.5 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              autoComplete="new-password"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200">
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="signupPassword"
              name="signupPassword"
              type="password"
              required
              className="pl-1 block w-full rounded-md border-0 py-1.5 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              autoComplete="new-password"
              maxLength="20"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-sky-500 dark:bg-sky-600 dark:hover:bg-sky-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white dark:text-slate-300 shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            Sign up
          </button>
        </div>
      </form>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            onMouseDown={handleFormSignInSwitchClick}
            className="font-semibold leading-6 text-sky-600 hover:text-sky-500 cursor-pointer"
          >
            Sign in here!
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
