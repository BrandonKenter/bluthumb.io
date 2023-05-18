import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faStickyNote } from "@fortawesome/free-solid-svg-icons";

const TableUserCard = ({}) => {
  return (
    <div className="bg-slate-50 dark:bg-slate-800 border-2 dark:border-slate-700 flex flex-col justify-center items-center text-center ml-6 w-96 rounded shadow-lg mb-12 min-w-fit">
      <div className=" p-6">
        <div className="font-bold text-lg mb-2 dark:text-slate-300">
          Please sign in to use...
        </div>
        <div className="mb-2 flex justify-center items-center">
          <FontAwesomeIcon
            icon={faThumbsUp}
            className="text-2xl mr-2 text-sky-500"
          />
          <span className="text-slate-700 dark:text-slate-400">Thumbs</span>
        </div>
        <div className="flex justify-center items-center">
          <FontAwesomeIcon
            icon={faStickyNote}
            className="text-2xl mr-2 text-red-400"
          />
          <span className="text-slate-700 dark:text-slate-400">Notes</span>
        </div>
      </div>
    </div>
  );
};
export default TableUserCard;
