import ThumbRing from "./ThumbRing";

const ThumbProgress = ({ currentList, percentages, user }) => {
  return (
    <div className="h-40 text border-slate-200 border-2 border-opacity-50 items-center dark:bg-slate-800 bg-slate-50 rounded-lg m-2 p-4 shadow-md dark:border-slate-700">
      <div className="flex flex-col">
        <div className="flex justify-center text mb-4">
          <span className="text-gray-900 font-normal text dark:text-slate-300">
            Thumb Progress
          </span>
        </div>

        <ThumbRing
          currentList={currentList}
          percentages={percentages}
          user={user}
        />
      </div>
    </div>
  );
};

export default ThumbProgress;
