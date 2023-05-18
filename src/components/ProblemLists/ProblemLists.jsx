import { auth } from "../../../firebase-config";

const ProblemLists = ({ currentList, setCurrentList }) => {
  function handleListChange(list, event) {
    const otherButton =
      event.target.nextSibling || event.target.previousSibling;

    if (auth.currentUser) {
      setCurrentList(list);
    } else if (list === "bluthumb300") {
      setCurrentList("defaultBluthumbProblems");
    } else {
      setCurrentList("defaultBlind75Problems");
    }
    event.target.classList.add("bg-slate-200");
    otherButton.classList.remove("bg-slate-200");
    otherButton.classList.add("bg-slate-50");
  }

  return (
    <div className="h-40 w-46 flex flex-col p-4 m-2 bg-slate-50 rounded-lg dark:bg-slate-800 dark:border-slate-700 border-slate-200 border-2 border-opacity-50 shadow-md">
      <div className="flex justify-center mb-4">
        <span className="text-slate-900 font-normal text dark:text-slate-300">
          Problem Lists
        </span>
      </div>
      <div className="flex flex-col justify-center items-center font-semibold text dark:text-slate-200">
        <button
          className={`flex flex-col justify-center p-3 h-10 rounded-md whitespace-nowrap ${
            currentList === "bluthumb300" ||
            currentList === "defaultBluthumbProblems" ||
            currentList === undefined
              ? "bg-slate-200 dark:bg-sky-600"
              : "bg-slate-50 dark:bg-slate-800"
          } hover:bg-slate-200 dark:hover:bg-sky-600 transition duration-200`}
          onClick={(event) => handleListChange("bluthumb300", event)}
        >
          BluThumb 300
        </button>
        <button
          className={`flex flex-col justify-center p-3 m-1 h-10 rounded-md ${
            currentList === "blind75" ||
            currentList === "defaultBlind75Problems"
              ? "bg-slate-200 dark:bg-sky-600"
              : "bg-slate-50 dark:bg-slate-800"
          } hover:bg-slate-200 dark:hover:bg-sky-600 transition duration-200`}
          onClick={(event) => handleListChange("blind75", event)}
        >
          Blind 75
        </button>
      </div>
    </div>
  );
};

export default ProblemLists;
