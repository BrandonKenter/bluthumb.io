import "../tailwind.css";
import ProblemLists from "./ProblemLists/ProblemLists";
import Table from "./Table/Table";
import ThumbProgress from "./ProblemLists/ThumbProgress";

const Home = ({
  currentList,
  setCurrentList,
  listLoading,
  percentages,
  setPercentages,
  user,
  darkMode,
}) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center dark:bg-slate-900">
        <div className="flex justify-center items-center my-4 mb-6">
          <ProblemLists
            currentList={currentList}
            setCurrentList={setCurrentList}
          />
          {user && (
            <ThumbProgress
              currentList={currentList}
              percentages={percentages}
              user={user}
            />
          )}
        </div>
        <hr className="w-full dark:border-2 dark:border-slate-800"></hr>
        <Table
          currentList={currentList}
          setCurrentList={setCurrentList}
          listLoading={listLoading}
          setPercentages={setPercentages}
          user={user}
          darkMode={darkMode}
        />
      </div>
    </>
  );
};

export default Home;
