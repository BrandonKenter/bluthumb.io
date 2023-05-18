const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div className="">
      <form className="p-1">
        <label className="text-sm font-medium text-slate-900 sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-slate-500 dark:text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <div>
            <input
              className="h-10 w-60 p-4 pl-10 dark:bg-slate-800 dark:text-slate-100 text-slate-900 bg-slate-50 font-medium transition duration-100 rounded-lg ring-1 ring-slate-200 dark:ring-slate-700  focus:outline-none focus:ring-opacity-100 focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-600"
              placeholder="Search titles, notes..."
              value={filter || ""}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default GlobalFilter;
