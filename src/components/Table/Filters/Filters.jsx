import ColorDropdown from "./ThumbDropdown";
import DifficultyDropdown from "./DifficultyDropdown";
import GlobalFilter from "./GlobalFilter";
import Patterns from "./Patterns";
import { auth } from "../../../../firebase-config";

const Filters = ({
  globalFilter,
  setGlobalFilter,
  filterState,
  setFilterState,
}) => {
  return (
    <div>
      <div className="my-4">
        <Patterns filterState={filterState} setFilterState={setFilterState} />
      </div>
      <div className="flex justify-center">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <DifficultyDropdown
          filterState={filterState}
          setFilterState={setFilterState}
        />
        {auth.currentUser && (
          <ColorDropdown
            filterState={filterState}
            setFilterState={setFilterState}
          />
        )}
      </div>
    </div>
  );
};

export default Filters;
