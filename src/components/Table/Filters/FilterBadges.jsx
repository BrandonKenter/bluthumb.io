const FilterBadges = ({ filterState, setFilterState }) => {
  const handleBadgeRemove = (columnId) => {
    setFilterState((prevState) => {
      const { [columnId]: undefined, ...newState } = prevState;
      return newState;
    });
  };

  return (
    <div className="p-2 flex">
      {filterState["pattern"] && (
        <div className="flex items-center">
          <span
            id="badge-dismiss-default"
            className="text-slate-400 inline-flex items-center px-2 py-0.5 mx-1 text-sm font-medium rounded-lg border-slate-300 border-2 bg-slate-200 dark:bg-slate-800 dark:border-slate-600 shadow-sm"
          >
            {filterState["pattern"]}
            <button
              onClick={() => handleBadgeRemove("pattern")}
              type="button"
              className="inline-flex items-center p-0.5 ml-2 text-sm text-red-slate bg-transparent rounded-md hover:bg-slate-400 hover:text-slate-900 dark:hover:bg-slate-400 dark:hover:text-slate-200 transition duration-100"
              data-dismiss-target="#badge-dismiss-default"
              aria-label="Remove"
            >
              <svg
                aria-hidden="true"
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Remove badge</span>
            </button>
          </span>
        </div>
      )}
      {filterState["difficulty"] && filterState["difficulty"] === "Hard" && (
        <div className="flex items-center">
          <span
            id="badge-dismiss-default"
            className="text-red-400 inline-flex items-center px-2 py-0.5 mx-1 text-sm font-medium rounded-lg border-red-300 border-2 bg-red-200 shadow-sm dark:bg-slate-800"
          >
            {filterState["difficulty"]}
            <button
              onClick={() => handleBadgeRemove("difficulty")}
              type="button"
              className="inline-flex items-center p-0.5 ml-2 text-sm text-red-400 bg-transparent rounded-md hover:bg-red-400 hover:text-slate-900 dark:hover:bg-red-400 dark:hover:text-red-200 transition duration-100"
              data-dismiss-target="#badge-dismiss-default"
              aria-label="Remove"
            >
              <svg
                aria-hidden="true"
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Remove badge</span>
            </button>
          </span>
        </div>
      )}
      {filterState["difficulty"] && filterState["difficulty"] === "Medium" && (
        <div className="flex items-center">
          <span
            id="badge-dismiss-default"
            className="text-orange-400 inline-flex items-center px-2 py-0.5 mx-1 text-sm font-medium rounded-lg border-orange-300 border-2 bg-orange-200 shadow-sm dark:bg-slate-800"
          >
            {filterState["difficulty"]}
            <button
              onClick={() => handleBadgeRemove("difficulty")}
              type="button"
              className="inline-flex items-center p-0.5 ml-2 text-sm text-orange-400 bg-transparent rounded-md hover:bg-orange-400 hover:text-slate-900 dark:hover:bg-orange-400 dark:hover:text-orange-200 transition duration-100"
              data-dismiss-target="#badge-dismiss-default"
              aria-label="Remove"
            >
              <svg
                aria-hidden="true"
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Remove badge</span>
            </button>
          </span>
        </div>
      )}
      {filterState["difficulty"] && filterState["difficulty"] === "Easy" && (
        <div className="flex items-center">
          <span
            id="badge-dismiss-default"
            className="text-green-400 inline-flex items-center px-2 py-0.5 mx-1 text-sm font-medium rounded-lg border-green-300 border-2 bg-green-200 shadow-sm dark:bg-slate-800"
          >
            {filterState["difficulty"]}
            <button
              onClick={() => handleBadgeRemove("difficulty")}
              type="button"
              className="inline-flex items-center p-0.5 ml-2 text-sm text-green-400 bg-transparent rounded-md hover:bg-green-400 hover:text-slate-900 dark:hover:bg-green-400 dark:hover:text-green-200 transition duration-100"
              data-dismiss-target="#badge-dismiss-default"
              aria-label="Remove"
            >
              <svg
                aria-hidden="true"
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Remove badge</span>
            </button>
          </span>
        </div>
      )}
      {filterState["thumb"] && filterState["thumb"] === "Blue" && (
        <div className="flex items-center">
          <span
            id="badge-dismiss-default"
            className="text-blue-400 inline-flex items-center px-2 py-0.5 mx-1 text-sm font-medium rounded-lg border-blue-300 border-2 bg-blue-200 shadow-sm dark:bg-slate-800"
          >
            {filterState["thumb"]}
            <button
              onClick={() => handleBadgeRemove("thumb")}
              type="button"
              className="inline-flex items-center p-0.5 ml-2 text-sm text-blue-400 bg-transparent rounded-md hover:bg-blue-400 hover:text-slate-900 dark:hover:bg-blue-400 dark:hover:text-blue-200 transition duration-100"
              data-dismiss-target="#badge-dismiss-default"
              aria-label="Remove"
            >
              <svg
                aria-hidden="true"
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Remove badge</span>
            </button>
          </span>
        </div>
      )}
      {filterState["thumb"] && filterState["thumb"] === "Green" && (
        <div className="flex items-center">
          <span
            id="badge-dismiss-default"
            className="text-green-400 inline-flex items-center px-2 py-0.5 mx-1 text-sm font-medium rounded-lg border-green-300 border-2 bg-green-200 shadow-sm dark:bg-slate-800"
          >
            {filterState["thumb"]}
            <button
              onClick={() => handleBadgeRemove("thumb")}
              type="button"
              className="inline-flex items-center p-0.5 ml-2 text-sm text-green-400 bg-transparent rounded-md hover:bg-green-400 hover:text-slate-900 dark:hover:bg-green-400 dark:hover:text-green-200 transition duration-100"
              data-dismiss-target="#badge-dismiss-default"
              aria-label="Remove"
            >
              <svg
                aria-hidden="true"
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Remove badge</span>
            </button>
          </span>
        </div>
      )}
      {filterState["thumb"] && filterState["thumb"] === "Red" && (
        <div className="flex items-center">
          <span
            id="badge-dismiss-default"
            className="text-red-400 inline-flex items-center px-2 py-0.5 mx-1 text-sm font-medium rounded-lg border-red-300 border-2 bg-red-200 shadow-sm dark:bg-slate-800"
          >
            {filterState["thumb"]}
            <button
              onClick={() => handleBadgeRemove("thumb")}
              type="button"
              className="inline-flex items-center p-0.5 ml-2 text-sm text-red-400 bg-transparent rounded-md hover:bg-red-400 hover:text-slate-900 dark:hover:bg-red-400 dark:hover:text-red-200 transition duration-100"
              data-dismiss-target="#badge-dismiss-default"
              aria-label="Remove"
            >
              <svg
                aria-hidden="true"
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Remove badge</span>
            </button>
          </span>
        </div>
      )}
    </div>
  );
};

export default FilterBadges;
