import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function ThumbDropdown({ filterState, setFilterState }) {
  const handleFilterChange = (columnId, value) => {
    setFilterState((prevState) => {
      if (prevState[columnId] === value) {
        const { [columnId]: _, ...newState } = prevState;
        return newState;
      } else {
        return {
          ...prevState,
          [columnId]: value,
        };
      }
    });
  };

  return (
    <div className="text-right z-50 p-1">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="font-semibold inline-flex w-full justify-center rounded-md ring-1 ring-slate-200 dark:bg-sky-600 dark:hover:bg-sky-500 dark:text-slate-200 dark:ring-slate-700 bg-sky-500 px-4 py-2 transition duration-100 hover:bg-sky-400 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {"Thumb"}
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-white dark:text-slate-200"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="font-semibold absolute right-0 mt-2 w-36 origin-top-right divide-y dark:bg-slate-700 divide-slate-100 rounded-md bg-slate-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item className="transition duration-100 text-sky-500">
                {({ active }) => (
                  <button
                    onClick={() => {
                      handleFilterChange("thumb", "Blue");
                    }}
                    className={`${
                      active
                        ? "bg-slate-200 dark:bg-slate-600"
                        : "text-blue-500"
                    } group flex w-full items-center rounded-md px-2 py-2`}
                  >
                    {filterState["thumb"] === "Blue" ? (
                      <>
                        Blue
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="absolute right-3 ml-2 -mr-1 h-5 w-5 text-sky-400"
                        />
                      </>
                    ) : (
                      "Blue"
                    )}
                  </button>
                )}
              </Menu.Item>
              <Menu.Item className="transition duration-100 text-green-500">
                {({ active }) => (
                  <button
                    onClick={() => {
                      handleFilterChange("thumb", "Green");
                    }}
                    className={`${
                      active
                        ? "bg-slate-200 dark:bg-slate-600"
                        : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2`}
                  >
                    {filterState["thumb"] === "Green" ? (
                      <>
                        Green
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="absolute right-3 ml-2 -mr-1 h-5 w-5 text-sky-400"
                        />
                      </>
                    ) : (
                      "Green"
                    )}
                  </button>
                )}
              </Menu.Item>
              <Menu.Item className="transition duration-100 text-red-500">
                {({ active }) => (
                  <button
                    onClick={() => {
                      handleFilterChange("thumb", "Red");
                    }}
                    className={`${
                      active
                        ? "bg-slate-200 dark:bg-slate-600"
                        : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2`}
                  >
                    {filterState["thumb"] === "Red" ? (
                      <>
                        Red
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="absolute right-3 ml-2 -mr-1 h-5 w-5 text-sky-400"
                        />
                      </>
                    ) : (
                      "Red"
                    )}
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
