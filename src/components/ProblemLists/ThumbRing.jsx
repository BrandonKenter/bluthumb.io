import { useEffect } from "react";

const ThumbRing = ({ currentList, percentages, user }) => {
  useEffect(() => {}, [currentList, percentages, user]);

  return (
    <div>
      <div className="bg-gray-50 dark:bg-slate-800">
        <div className="flex w-full pl-4">
          <div
            className="flex items-center w-fit px-1 mx-3 bg-gray-100 dark:bg-slate-700 shadow-lg border-2 dark:border-slate-600 rounded-2xl h-10 my-5"
            x-data="{ circumference: 50 * 2 * Math.PI * (bluePercentage / 100), percent: bluePercentage }"
          >
            <div className="flex items-center justify-center -m-6 overflow-hidden bg-gray-100 dark:bg-slate-700 rounded-full">
              <svg
                className="w-16 h-16 transform translate-y-0.5 translate-x-0.5"
                aria-hidden="true"
              >
                <circle
                  className="text-gray-200 dark:text-slate-600"
                  strokeWidth="5"
                  stroke="currentColor"
                  fill="transparent"
                  r="25"
                  cx="30"
                  cy="30"
                />
                <circle
                  className="text-sky-500"
                  strokeWidth="5"
                  strokeDasharray={`${2 * Math.PI * 25}`}
                  strokeDashoffset={`${
                    ((100 - percentages[0]) / 100) * 2 * Math.PI * 25
                  }`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="25"
                  cx="30"
                  cy="30"
                />
              </svg>
              <span
                className="absolute text-sky-500"
                x-text="`${bluePercentage}%`"
              ></span>
            </div>

            <span className="flex justify-end font-medium w-20 text-sky-500 pr-2">
              {Math.floor(percentages[0])}%
            </span>
          </div>

          <div
            className="flex items-center w-fit px-1 mx-3 bg-gray-100 dark:bg-slate-700 shadow-lg border-2 dark:border-slate-600 rounded-2xl h-10 my-5"
            x-data="{ circumference: 50 * 2 * Math.PI * (greenPercentage / 100), percent: greenPercentage }"
          >
            <div className="flex items-center justify-center -m-6 overflow-hidden dark:bg-slate-700 bg-gray-100 rounded-full">
              <svg
                className="w-16 h-16 transform translate-y-0.5 translate-x-0.5"
                aria-hidden="true"
              >
                <circle
                  className="text-gray-200 dark:text-slate-600"
                  strokeWidth="5"
                  stroke="currentColor"
                  fill="transparent"
                  r="25"
                  cx="30"
                  cy="30"
                />
                <circle
                  className="text-green-500"
                  strokeWidth="5"
                  strokeDasharray={`${2 * Math.PI * 25}`}
                  strokeDashoffset={`${
                    ((100 - percentages[1]) / 100) * 2 * Math.PI * 25
                  }`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="25"
                  cx="30"
                  cy="30"
                />
              </svg>
              <span
                className="absolute text-green-500"
                x-text="`${greenPercentage}%`"
              ></span>
            </div>

            <span className="flex justify-end font-medium w-20 text-green-500 pr-2">
              {Math.floor(percentages[1])}%
            </span>
          </div>

          <div
            className="flex items-center w-fit px-1 mx-3 bg-gray-100 dark:bg-slate-700 shadow-lg border-2 dark:border-slate-600 rounded-2xl h-10 my-5"
            x-data="{ circumference: 50 * 2 * Math.PI * (redPercentage / 100), percent: redPercentage }"
          >
            <div className="flex items-center justify-center -m-6 overflow-hidden bg-gray-100 dark:bg-slate-700 rounded-full">
              <svg
                className="w-16 h-16 transform translate-y-0.5 translate-x-0.5"
                aria-hidden="true"
              >
                <circle
                  className="text-gray-200 dark:text-slate-600"
                  strokeWidth="5"
                  stroke="currentColor"
                  fill="transparent"
                  r="25"
                  cx="30"
                  cy="30"
                />
                <circle
                  className="text-red-500"
                  strokeWidth="5"
                  strokeDasharray={`${2 * Math.PI * 25}`}
                  strokeDashoffset={`${
                    ((100 - percentages[2]) / 100) * 2 * Math.PI * 25
                  }`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="25"
                  cx="30"
                  cy="30"
                />
              </svg>
              <span
                className="absolute text-red-500"
                x-text="`${redPercentage}%`"
              ></span>
            </div>

            <span className="flex justify-end font-medium w-20 text-red-500 pr-2">
              {Math.floor(percentages[2])}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThumbRing;
