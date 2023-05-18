import { useState } from "react";
import { faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Patterns = ({ filterState, setFilterState }) => {
  const [showMore, setShowMore] = useState(false);
  const buttonList = [
    {
      label: "Array",
      className:
        "m-1 px-2 rounded-md hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500",
    },
    {
      label: "String",
      className:
        "m-1 px-2 rounded-md hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500",
    },
    {
      label: "Hash Map",
      className:
        "m-1 px-2 rounded-md hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500",
    },
    {
      label: "Hash Set",
      className:
        "m-1 px-2 rounded-md hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500",
    },
    {
      label: "Dynamic Programming",
      className:
        "m-1 px-2 rounded-md hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500",
    },
    {
      label: "Math",
      className:
        "m-1 px-2 rounded-md hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500",
    },
    {
      label: "Greedy",
      className:
        "m-1 px-2 rounded-md hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500",
    },
    {
      label: "Binary Search",
      className:
        "m-1 px-2 rounded-md hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500",
    },
    {
      label: "Tree",
      className:
        "m-1 px-2 rounded-md hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500",
    },
    {
      label: "BST",
      className:
        "m-1 px-2 rounded-md hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500",
    },
    {
      label: "Matrix",
      className:
        "m-1 px-2 rounded-md hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500",
    },
    {
      label: "Intervals",
      className:
        "m-1 px-2 rounded-md hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500",
    },
    {
      label: "Two Pointers",
      className:
        "m-1 px-2 rounded-md hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500",
    },
    {
      label: "Bit Manipulation",
      className:
        "m-1 px-2 rounded-md hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500",
    },
    {
      label: "Heap",
      className:
        "m-1 px-2 rounded-md hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500",
    },
    {
      label: "Counting Sort",
      className:
        "m-1 px-2 rounded-md hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500",
    },
    {
      label: "Stack",
      className:
        "m-1 px-2 rounded-md hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500",
    },
    {
      label: "Monotonic Stack",
      className:
        "m-1 px-2 rounded-md hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500",
    },
    {
      label: "Graph",
      className:
        "m-1 px-2 rounded-md hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500",
    },
    {
      label: "DFS",
      className:
        "m-1 px-2 rounded-md hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500",
    },
    {
      label: "BFS",
      className:
        "m-1 px-2 rounded-md hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500",
    },
    {
      label: "Dijkstras",
      className:
        "m-1 px-2 rounded-md hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500",
    },
    {
      label: "Floyd-Warshall",
      className:
        "m-1 px-2 rounded-md hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500",
    },
    {
      label: "Backtracking",
      className:
        "m-1 px-2 rounded-md hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500",
    },
    {
      label: "Sliding Window",
      className:
        "m-1 px-2 rounded-md hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500",
    },
    {
      label: "Union Find",
      className:
        "m-1 px-2 rounded-md hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500",
    },
    {
      label: "Linked List",
      className:
        "m-1 px-2 rounded-md hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500",
    },
    {
      label: "Slow & Fast",
      className:
        "m-1 px-2 rounded-md hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500",
    },
    {
      label: "Trie",
      className:
        "m-1 px-2 rounded-md hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500",
    },
    {
      label: "Queue",
      className:
        "m-1 px-2 rounded-md hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500",
    },
    {
      label: "Topological Sort",
      className:
        "m-1 px-2 rounded-md hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500",
    },
  ];
  const visibleButtons = showMore ? buttonList : buttonList.slice(0, 12);

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

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const toggleCollapse = () => {
    setShowMore(false);
  };

  return (
    <div className="flex justify-center shadow-sm dark:bg-slate-800 dark:text-slate-400 bg-slate-50 rounded-lg border-2 dark:border-slate-700 font-medium transition duration-300 text-slate-900">
      <div className="mt-2 flex flex-wrap justify-center max-w-lg">
        {visibleButtons.map((button, index) => (
          <button
            key={index}
            className={
              filterState.pattern === button.label
                ? `${button.className} bg-slate-200 dark:bg-slate-500`
                : button.className
            }
            onClick={(e) => handleFilterChange("pattern", button.label)}
          >
            {button.label}
          </button>
        ))}
        {!showMore && (
          <button
            className="m-1 px-2 rounded-lg hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500"
            onClick={toggleShowMore}
          >
            Expand <FontAwesomeIcon icon={faAngleDoubleDown} />
          </button>
        )}
        {showMore && (
          <button
            className="m-1 px-2 rounded-lg hover:bg-slate-200 transition duration-200 dark:hover:bg-slate-500"
            onClick={toggleCollapse}
          >
            Collapse <FontAwesomeIcon icon={faAngleDoubleUp} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Patterns;
