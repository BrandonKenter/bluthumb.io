import "../../tailwind.css";
import Filters from "./Filters/Filters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretUp,
  faCaretDown,
  faAngleRight,
  faAngleLeft,
  faThumbsUp,
  faMinus,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useMemo, useState, useRef } from "react";
import {
  useTable,
  useSortBy,
  useBlockLayout,
  useFlexLayout,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../firebase-config";
import EditableCell from "./EditableCell";
import TableUserCard from "./TableUserCard";
import FilterBadges from "./Filters/FilterBadges";
import { auth } from "../../../firebase-config";
import { bluthumbProblems, blind75Problems } from "../../Problems";

const Table = ({
  currentList,
  setCurrentList,
  listLoading,
  setPercentages,
  user,
  darkMode,
}) => {
  const [data, setData] = useState([]);
  const [filterState, setFilterState] = useState([]);

  const columns = useMemo(() => {
    const columnsArr = [
      {
        Header: "#",
        accessor: "number",
        width: 60,
        maxWidth: 60,
        minWidth: 10,
        canResize: false,
      },
      {
        Header: "Title",
        accessor: "title",
        width: 150,
        maxWidth: 200,
        minWidth: 100,
        Cell: ({ row }) => {
          const [showPopover, setShowPopover] = useState(false);
          const popoverRef = useRef(null);
          function handleMouseEnter() {
            const isTextClamped =
              popoverRef.current.scrollHeight !==
              popoverRef.current.clientHeight
                ? true
                : false;
            if (isTextClamped) {
              setShowPopover(true);
            }
          }

          function handleMouseLeave() {
            setShowPopover(false);
          }

          const handleTitleClick = async (url) => {
            function getURL(str) {
              const modifiedStr = str.replace(/ (?<= )-(?= )/g, "");
              const finalStr = modifiedStr.replace(/['()]/g, "");
              const words = finalStr.split(" ");
              const updatedWords = words.map(function (word) {
                return word.toLowerCase().charAt(0) + word.slice(1);
              });
              const updatedString = updatedWords.join("-");
              const newURL =
                "https://leetcode.com/problems/" + updatedString + "/";
              return newURL;
            }
            const problemURL = getURL(row.original.title);

            try {
              window.open(problemURL, "_blank");
            } catch (error) {
              console.log("Error with handleTitleClick: " + error);
            }
          };

          return (
            <div className="flex justify-center">
              <div
                className="bill text-blue-700 dark:text-blue-600 hover:underline cursor-pointer line-clamp-2 "
                onClick={() => handleTitleClick(row.original.url)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={popoverRef}
              >
                {row.original.title}
              </div>
              {showPopover && (
                <div className="z-50 dan break-words absolute translate-y-12 w-44 p-1 dark:bg-slate-800 dark:border-slate-700 bg-slate-200 border border-gray-300 rounded-lg shadow-lg flex justify-center">
                  {row.original.title}
                </div>
              )}
            </div>
          );
        },
      },
      {
        Header: "Pattern",
        accessor: "pattern",
        width: 150,
        maxWidth: 400,
        minWidth: 100,
        Cell: ({ row }) => {
          const [showPopover, setShowPopover] = useState(false);
          const popoverRef = useRef(null);

          const handleMouseEnter = () => {
            const isTextClamped =
              popoverRef.current.scrollHeight !==
              popoverRef.current.clientHeight
                ? true
                : false;
            if (isTextClamped) {
              setShowPopover(true);
            }
          };

          const handleMouseLeave = () => {
            setShowPopover(false);
          };

          return (
            <div className="flex justify-center">
              <div
                className="bill line-clamp-2 relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={popoverRef}
              >
                {row.original.pattern}
              </div>
              {showPopover && (
                <div className="z-50 dan break-words absolute translate-y-12 w-44 p-1 dark:bg-slate-800 dark:border-slate-700 bg-slate-200 border border-gray-300 rounded-lg shadow-lg flex justify-center">
                  {row.original.pattern}
                </div>
              )}
            </div>
          );
        },
      },
      {
        Header: "Difficulty",
        accessor: "difficulty",
        width: 120,
        canResize: false,
      },
    ];

    // Conditionally render the notes column depending on if a user is signed in
    if (user) {
      const headerColumn = {
        Header: "Notes",
        accessor: "notes",
        width: 300,
        maxWidth: 500,
        minWidth: 100,
      };

      const cellColumn = {
        accessor: "notes",
        Cell: ({ value, row, updateCell }) => (
          <EditableCell row={row} value={value} updateCell={updateCell} />
        ),
      };
      const combinedColumn = { ...headerColumn, ...cellColumn };
      columnsArr.push(combinedColumn);
    }

    // Conditionally render the thumb column depending on if a user is signed in
    if (user) {
      const headerColumn = {
        Header: "Thumbs",
        accessor: "thumb",
        width: 150,
        canResize: false,
      };

      const cellColumn = {
        accessor: "thumb",
        Cell: ({ row }) => {
          // Update color corresponding to the thumb row/problem that was clicked
          const handleRadioClick = async (
            prevThumbColor,
            newThumbColor,
            row
          ) => {
            try {
              const listsRef = collection(
                db,
                "users",
                auth.currentUser.uid,
                "leetcode_lists"
              );
              const listName =
                currentList === "bluthumb300" ||
                currentList === "defaultBluthumbProblems"
                  ? "bluthumb300"
                  : "blind75";
              const listRef = collection(listsRef, listName, "problems");
              const problemNumber = row.values.number;
              const q = query(listRef, where("number", "==", problemNumber));
              const querySnapshot = await getDocs(q);
              const matchingDoc = querySnapshot.docs[0];
              const matchingDocRef = matchingDoc.ref;
              const newThumb =
                newThumbColor === prevThumbColor ? "white" : newThumbColor;
              await updateDoc(matchingDocRef, { thumb: newThumb });
              const newData = data.map((d) => {
                if (d.number === row.original.number) {
                  const rgb =
                    newThumbColor === prevThumbColor
                      ? "241,245,249"
                      : newThumbColor === "red"
                      ? "248,113,113"
                      : newThumbColor === "green"
                      ? "74,222,128"
                      : "56,189,248";

                  return {
                    ...d,
                    thumb: newThumb,
                    color: `rgb(${rgb})`,
                  };
                } else {
                  return d;
                }
              });
              setData(newData);
            } catch (error) {
              console.log("Error with handleRadioClick: " + error);
            }
          };

          return (
            <div>
              <div className="flex justify-evenly items-center">
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  color={
                    row.original.thumb === "blue"
                      ? "rgb(56, 189, 248)"
                      : "rgb(0 0 0)"
                  }
                  onClick={() =>
                    handleRadioClick(row.original.thumb, "blue", row)
                  }
                  className={
                    row.original.thumb === "blue"
                      ? "mx-1 hover:brightness-110 hover:scale-110 transition duration-200 px-2 py-1 rounded-xl cursor-pointer bg-sky-600 dark:bg-slate-800 border-4 border-opacity-75 border-sky-500"
                      : "mx-1 dark:text-slate-300 border-sky-300 border-4 border-opacity-0 hover:brightness-105 hover:scale-110 transition duration-200 px-2 p-1 rounded-xl cursor-pointer hover:bg-slate-300 hover:bg-opacity-50 hover:border-4 hover:border-opacity-5 hover:border-slate-400"
                  }
                />
                <FontAwesomeIcon
                  icon={faMinus}
                  color={
                    row.original.thumb === "green"
                      ? "rgb(74, 222, 128)"
                      : "rgb(0 0 0)"
                  }
                  onClick={() =>
                    handleRadioClick(row.original.thumb, "green", row)
                  }
                  className={
                    row.original.thumb === "green"
                      ? "mx-1 hover:brightness-110 hover:scale-110 transition duration-200 px-2 py-1 rounded-xl cursor-pointer bg-green-600 dark:bg-slate-800 border-4 border-opacity-75 border-green-500"
                      : "mx-1 dark:text-slate-300 border-green-300 border-4 border-opacity-0 hover:brightness-105 hover:scale-110 transition duration-200 pl-2 pr-2 p-1 rounded-xl cursor-pointer opacity-75 hover:bg-slate-300 hover:bg-opacity-50 hover:border-4 hover:border-opacity-5 hover:border-slate-400"
                  }
                />
                <FontAwesomeIcon
                  icon={faThumbsDown}
                  color={
                    row.original.thumb === "red"
                      ? "rgb(248, 113, 113)"
                      : "rgb(0 0 0)"
                  }
                  onClick={() =>
                    handleRadioClick(row.original.thumb, "red", row)
                  }
                  className={
                    row.original.thumb === "red"
                      ? "mx-1 hover:brightness-110 hover:scale-110 transition duration-200 px-2 py-1 rounded-xl cursor-pointer bg-red-600 dark:bg-slate-800 border-4 border-opacity-75 border-red-500"
                      : "mx-1 dark:text-slate-300 border-red-300 border-4 border-opacity-0 hover:brightness-105 hover:scale-110 transition duration-200 pl-2 pr-2 p-1 rounded-xl cursor-pointer opacity-75 hover:bg-slate-300 hover:bg-opacity-50 hover:border-4 hover:border-opacity-5 hover:border-slate-400"
                  }
                />
              </div>
            </div>
          );
        },
      };
      const combinedColumn = { ...headerColumn, ...cellColumn };
      columnsArr.push(combinedColumn);
    }

    return columnsArr;
  }, [auth, currentList, data, darkMode]);

  const tableInstance = useTable(
    {
      columns,
      data,
      autoResetPage: false,
      autoResetFilters: false,
      initialState: { pageIndex: 0, sortBy: [{ id: "number", desc: false }] },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useBlockLayout,
    useFlexLayout,
    usePagination
  );

  const {
    rows,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageCount,
    gotoPage,
    pageSize,
    setPageSize,
    state: { pageIndex },
  } = tableInstance;

  const { globalFilter, filters } = state;

  // Update table data for currentList of current user (or default list if no user is logged in)
  // This is only called when a user logs in/out or the list changes
  const fetchData = async (currentList, setData) => {
    if (user) {
      // Get the reference to the current user's selected problem list
      const userListsRef = collection(
        db,
        "users",
        auth.currentUser.uid,
        "leetcode_lists"
      );
      const userListName =
        currentList === "bluthumb300" ? "bluthumb300" : "blind75";
      const userListRef = collection(userListsRef, userListName, "problems");

      // Update the table data for each doc in this list collection
      const snapshot = await getDocs(userListRef);
      const d = snapshot.docs.map((doc) => {
        const docData = doc.data();
        const thumb = docData.thumb;

        if (!darkMode) {
          const rgb =
            thumb === "red"
              ? "248,113,113"
              : thumb === "green"
              ? "74,222,128"
              : thumb === "blue"
              ? "56,189,248"
              : "241,245,249";
          return {
            ...docData,
            color: `rgb(${rgb})`,
            thumb: thumb,
          };
        } else {
          const rgb =
            thumb === "red"
              ? "15, 23, 42"
              : thumb === "green"
              ? "15, 23, 42"
              : thumb === "blue"
              ? "15, 23, 42"
              : "15, 23, 42";
          return {
            ...docData,
            color: `rgb(${rgb})`,
            thumb: thumb,
          };
        }
      });
      setData(d);
      await updatePercentages();
    } else {
      // Update the table data for the default problem list
      const d =
        currentList === "defaultBluthumbProblems" ||
        currentList === "bluthumb300" ||
        currentList === undefined
          ? bluthumbProblems
          : blind75Problems;
      setData(d);
    }
  };

  // Update document in the database for the row corresponding to the changed notes cell
  // Also Update the table data for the changed row
  const updateCell = async (row, cellValue) => {
    // Get the reference to the current user's selected problem list
    const userListsRef = collection(db, "users", user.uid, "leetcode_lists");
    const userListName =
      currentList === "bluthumb300" || currentList === "defaultBluthumbProblems"
        ? "bluthumb300"
        : "blind75";
    const userListRef = collection(userListsRef, userListName, "problems");

    // Update document in the database for the row corresponding to the changed notes cell
    const problemNumber = row.values.number;
    const q = query(userListRef, where("number", "==", problemNumber));
    const querySnapshot = await getDocs(q);
    const matchingDoc = querySnapshot.docs[0];
    const matchingDocRef = matchingDoc.ref;
    await updateDoc(matchingDocRef, { notes: cellValue });

    // Update the table data for the changed row
    const newData = data.map((d) => {
      if (d.number === row.original.number) {
        return {
          ...d,
          notes: cellValue,
        };
      } else {
        return d;
      }
    });
    setData(newData);
  };

  // Update percentages for ThumbRing component
  const updatePercentages = async () => {
    const problemCount = currentList === "bluthumb300" ? 300 : 75;
    if (user) {
      const listsRef = collection(
        db,
        "users",
        auth.currentUser.uid,
        "leetcode_lists"
      );

      const listName =
        currentList === "bluthumb300" ||
        currentList === "defaultBluthumbProblems"
          ? "bluthumb300"
          : "blind75";

      const docRef =
        listName === "bluthumb300"
          ? doc(listsRef, "bluthumb300")
          : doc(listsRef, "blind75");
      const docSnap = await getDoc(docRef);

      if (docSnap.data() !== undefined) {
        const blueValue = docSnap.data().blue;
        const greenValue = docSnap.data().green;
        const redValue = docSnap.data().red;
        const bluePercentage = (blueValue / problemCount) * 100;
        const greenPercentage = (greenValue / problemCount) * 100;
        const redPercentage = (redValue / problemCount) * 100;
        setPercentages([bluePercentage, greenPercentage, redPercentage]);
      }
    }
  };

  useEffect(() => {
    if (user) {
      const listsRef = collection(
        db,
        "users",
        auth.currentUser.uid,
        "leetcode_lists"
      );
      const listName =
        currentList === "bluthumb300" ||
        currentList === "defaultBluthumbProblems"
          ? "bluthumb300"
          : "blind75";

      const countThumbsByColor = (data, color) => {
        return data.filter((item) => item.thumb === color).length;
      };

      const updateDocs = async () => {
        const blueThumbsCount = countThumbsByColor(data, "blue");
        const greenThumbsCount = countThumbsByColor(data, "green");
        const redThumbsCount = countThumbsByColor(data, "red");
        const whiteThumbsCount = countThumbsByColor(data, "white");

        try {
          if (listName === "bluthumb300") {
            const bluthumb300DocRef = doc(listsRef, "bluthumb300");

            await updateDoc(bluthumb300DocRef, {
              blue: blueThumbsCount,
            });
            await updateDoc(bluthumb300DocRef, {
              green: greenThumbsCount,
            });
            await updateDoc(bluthumb300DocRef, {
              red: redThumbsCount,
            });
            await updateDoc(bluthumb300DocRef, {
              white: whiteThumbsCount,
            });
          } else {
            const blind75DocRef = doc(listsRef, "blind75");

            await updateDoc(blind75DocRef, {
              blue: blueThumbsCount,
            });
            await updateDoc(blind75DocRef, {
              green: greenThumbsCount,
            });
            await updateDoc(blind75DocRef, {
              red: redThumbsCount,
            });
            await updateDoc(blind75DocRef, {
              white: whiteThumbsCount,
            });
          }

          await updatePercentages();
        } catch (error) {}
      };

      updateDocs();
    }
  }, [data]);

  // Set the column filter based on the filter state
  useEffect(() => {
    headerGroups.forEach((headerGroup) => {
      headerGroup.headers.forEach((column) => {
        const filter = filterState[column.id];
        column.setFilter(filter);
      });
    });
  }, [headerGroups, filterState]);

  // Set table data if a user logs in/logs out or the problem list is changed
  useEffect(() => {
    fetchData(currentList, setData);
  }, [currentList, user, listLoading, darkMode]);

  // Whenever filters or currentList changes, set the page to 0 (page 1)
  useEffect(() => {
    gotoPage(0);
  }, [filterState, currentList]);

  return (
    <>
      <div className="flex flex-col items-center justify-center pt-4 w-full min-w-fit">
        <Filters
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          filterState={filterState}
          setFilterState={setFilterState}
        />

        <FilterBadges
          filterState={filterState}
          setFilterState={setFilterState}
        />

        {/* table and card container */}
        <div className="flex justify-center w-full text-base px-10 ">
          {/* table and pagination container */}
          <div
            className={
              "flex-col justify-center items-center max-w-7xl " +
              (user ? "w-full" : "")
            }
          >
            <div className="shadow-lg bg-slate-200 dark:bg-slate-900 rounded-t-xl flex flex-col min-w-fit ">
              {/* table */}
              <div {...getTableProps()} className="">
                {/* thead */}
                <div className="">
                  {headerGroups.map((headerGroup) => (
                    // tr
                    <div
                      className="bg-slate-50 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-700 rounded-t-xl border-2 pt-1 border-slate-200 w-full"
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {headerGroup.headers.map((column) => (
                        // th
                        <div
                          className=""
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          {/* header content wrapper */}
                          <div className="text-base select-none flex justify-center my-2">
                            {/* header name */}
                            <div className="flex justify-center w-fit hover:bg-slate-200 dark:hover:bg-slate-500 transition duration-200 px-2 rounded-lg">
                              {column.render("Header")}
                              {/* arrows */}
                              <div className="ml-2 flex flex-col justify-center">
                                {column.isSorted ? (
                                  column.isSortedDesc ? (
                                    <FontAwesomeIcon icon={faCaretDown} />
                                  ) : (
                                    <FontAwesomeIcon icon={faCaretUp} />
                                  )
                                ) : (
                                  <div className="flex flex-col">
                                    <FontAwesomeIcon
                                      className="-mb-2"
                                      icon={faCaretUp}
                                    />
                                    <FontAwesomeIcon icon={faCaretDown} />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                {listLoading ? (
                  <div className=" rounded-md p-4 w-full mx-auto opacity-40">
                    <div className="animate-pulse flex space-x-4 my-8">
                      <div className="flex-1 space-y-6">
                        <div className="flex space-x-4">
                          <div className="flex items-center justify-center text-center">
                            <div className="h-10 w-10 mr-2 bg-slate-700 rounded"></div>
                            <div className="h-10 w-32 mx-2 bg-slate-700 rounded"></div>
                            <div className="h-10 w-32 mx-2 bg-slate-700 rounded "></div>
                            <div className="h-10 w-28 mx-2 bg-slate-700 rounded"></div>
                            <div className="h-10 w-80 mx-2 bg-slate-700 rounded"></div>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-full bg-slate-700 h-10 w-10 "></div>
                      <div className="rounded-full bg-slate-700 h-10 w-10 "></div>
                      <div className="rounded-full bg-slate-700 h-10 w-10 "></div>
                    </div>

                    <div className="animate-pulse flex space-x-4 my-8">
                      <div className="flex-1 space-y-6">
                        <div className="flex space-x-4">
                          <div className="flex items-center justify-center text-center">
                            <div className="h-10 w-10 mr-2 bg-slate-700 rounded"></div>
                            <div className="h-10 w-32 mx-2 bg-slate-700 rounded"></div>
                            <div className="h-10 w-32 mx-2 bg-slate-700 rounded "></div>
                            <div className="h-10 w-28 mx-2 bg-slate-700 rounded"></div>
                            <div className="h-10 w-80 mx-2 bg-slate-700 rounded"></div>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-full bg-slate-700 h-10 w-10 "></div>
                      <div className="rounded-full bg-slate-700 h-10 w-10 "></div>
                      <div className="rounded-full bg-slate-700 h-10 w-10 "></div>
                    </div>

                    <div className="animate-pulse flex space-x-4 my-8">
                      <div className="flex-1 space-y-6">
                        <div className="flex space-x-4">
                          <div className="flex items-center justify-center text-center">
                            <div className="h-10 w-10 mr-2 bg-slate-700 rounded"></div>
                            <div className="h-10 w-32 mx-2 bg-slate-700 rounded"></div>
                            <div className="h-10 w-32 mx-2 bg-slate-700 rounded "></div>
                            <div className="h-10 w-28 mx-2 bg-slate-700 rounded"></div>
                            <div className="h-10 w-80 mx-2 bg-slate-700 rounded"></div>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-full bg-slate-700 h-10 w-10 "></div>
                      <div className="rounded-full bg-slate-700 h-10 w-10 "></div>
                      <div className="rounded-full bg-slate-700 h-10 w-10 "></div>
                    </div>

                    <div className="animate-pulse flex space-x-4 my-8">
                      <div className="flex-1 space-y-6">
                        <div className="flex space-x-4">
                          <div className="flex items-center justify-center text-center">
                            <div className="h-10 w-10 mr-2 bg-slate-700 rounded"></div>
                            <div className="h-10 w-32 mx-2 bg-slate-700 rounded"></div>
                            <div className="h-10 w-32 mx-2 bg-slate-700 rounded "></div>
                            <div className="h-10 w-28 mx-2 bg-slate-700 rounded"></div>
                            <div className="h-10 w-80 mx-2 bg-slate-700 rounded"></div>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-full bg-slate-700 h-10 w-10 "></div>
                      <div className="rounded-full bg-slate-700 h-10 w-10 "></div>
                      <div className="rounded-full bg-slate-700 h-10 w-10 "></div>
                    </div>

                    <div className="animate-pulse flex space-x-4 my-8">
                      <div className="flex-1 space-y-6">
                        <div className="flex space-x-4">
                          <div className="flex items-center justify-center text-center">
                            <div className="h-10 w-10 mr-2 bg-slate-700 rounded"></div>
                            <div className="h-10 w-32 mx-2 bg-slate-700 rounded"></div>
                            <div className="h-10 w-32 mx-2 bg-slate-700 rounded "></div>
                            <div className="h-10 w-28 mx-2 bg-slate-700 rounded"></div>
                            <div className="h-10 w-80 mx-2 bg-slate-700 rounded"></div>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-full bg-slate-700 h-10 w-10 "></div>
                      <div className="rounded-full bg-slate-700 h-10 w-10 "></div>
                      <div className="rounded-full bg-slate-700 h-10 w-10 "></div>
                    </div>

                    <div className="animate-pulse flex space-x-4 my-8">
                      <div className="flex-1 space-y-6">
                        <div className="flex space-x-4">
                          <div className="flex items-center justify-center text-center">
                            <div className="h-10 w-10 mr-2 bg-slate-700 rounded"></div>
                            <div className="h-10 w-32 mx-2 bg-slate-700 rounded"></div>
                            <div className="h-10 w-32 mx-2 bg-slate-700 rounded "></div>
                            <div className="h-10 w-28 mx-2 bg-slate-700 rounded"></div>
                            <div className="h-10 w-80 mx-2 bg-slate-700 rounded"></div>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-full bg-slate-700 h-10 w-10 "></div>
                      <div className="rounded-full bg-slate-700 h-10 w-10 "></div>
                      <div className="rounded-full bg-slate-700 h-10 w-10 "></div>
                    </div>

                    <div className="animate-pulse flex space-x-4 my-8">
                      <div className="flex-1 space-y-6">
                        <div className="flex space-x-4">
                          <div className="flex items-center justify-center text-center">
                            <div className="h-10 w-10 mr-2 bg-slate-700 rounded"></div>
                            <div className="h-10 w-32 mx-2 bg-slate-700 rounded"></div>
                            <div className="h-10 w-32 mx-2 bg-slate-700 rounded "></div>
                            <div className="h-10 w-28 mx-2 bg-slate-700 rounded"></div>
                            <div className="h-10 w-80 mx-2 bg-slate-700 rounded"></div>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-full bg-slate-700 h-10 w-10 "></div>
                      <div className="rounded-full bg-slate-700 h-10 w-10 "></div>
                      <div className="rounded-full bg-slate-700 h-10 w-10 "></div>
                    </div>
                  </div>
                ) : (
                  // tbody
                  <div
                    className="bg-slate-100 box-border"
                    {...getTableBodyProps()}
                  >
                    {page.map((row, idx) => {
                      prepareRow(row);
                      return (
                        //tr
                        <div
                          {...row.getRowProps()}
                          className="transition duration-200 dark:border-slate-700 border-slate-200 border-2 flex items-center text-center"
                          style={{
                            backgroundColor: darkMode
                              ? "rgb(15, 23, 42)"
                              : row.original.color,
                          }}
                        >
                          {row.cells.map((cell) => (
                            // td
                            <div
                              className="text-slate-900 px-4 flex justify-center items-center h-16 dark:text-slate-300"
                              {...cell.getCellProps()}
                            >
                              {cell.render("Cell", { updateCell })}
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            {/* pagination */}
            <div className="flex items-center justify-center mt-4 dark:text-slate-200">
              <span className="mr-2">
                Page {pageIndex + 1} of {pageOptions.length}
              </span>
              <button
                className="rounded bg-slate-200 hover:bg-slate-300 text-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200 py-1 px-3 mr-2 disabled:opacity-50"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
              <button
                className="rounded bg-slate-200 hover:bg-slate-300 text-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200  py-1 px-3 disabled:opacity-50"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </button>
            </div>
          </div>

          {!user && <TableUserCard />}
        </div>
      </div>
    </>
  );
};

export default Table;
