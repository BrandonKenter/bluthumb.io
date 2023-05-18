import { useState, useRef, useEffect } from "react";

const EditableCell = ({ row, value, updateCell }) => {
  const [editing, setEditing] = useState(false);
  const [cellValue, setCellValue] = useState(value);
  const [inputStyle, setInputStyle] = useState({});
  const inputRef = useRef(null);
  const divRef = useRef(null);
  const popoverRef = useRef(null);
  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
      setInputStyle({
        resize: "none",
        border: "#f5f5f5",
        outline: "solid",
        overflow: "hidden",
      });
      adjustInputSize();
    }
  }, [editing, row.original.color]);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleChange = (event) => {
    setCellValue(event.target.value);
    adjustInputSize();
  };

  const handleBlur = () => {
    setEditing(false);
    updateCell(row, cellValue);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleBlur();
    } else if (event.key === "Escape") {
      event.preventDefault();
      setCellValue(value);
      handleBlur();
    }
  };

  const adjustInputSize = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  const handleMouseEnter = () => {
    const isTextClamped =
      popoverRef.current.scrollHeight !== popoverRef.current.clientHeight
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
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full">
        <div
          onDoubleClick={handleDoubleClick}
          style={{ wordBreak: "break-normal" }}
          className="cursor-cell w-full line-clamp-2 z-40 flex justify-center items-center"
          ref={divRef}
        >
          {editing && (
            <textarea
              value={cellValue}
              maxLength="150"
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              ref={inputRef}
              rows="2"
              style={{ ...inputStyle }}
              className="z-50 bg-slate-50 dark:slate-300 dark:outline-slate-600 dark:bg-slate-800 break-words absolute rounded-lg outline-2 shadow-md outline-gray-300 p-1 border-2 h-32 w-64 my-1 flex justify-center items-center"
            />
          )}
          {!editing && cellValue && (
            <div
              ref={popoverRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="bob -z-0 line-clamp-2 select-none"
            >
              {cellValue}
            </div>
          )}
          {!editing && cellValue && showPopover && (
            <div className="z-50 dan break-words absolute w-full p-1 mx-auto top-full transform translate-y-1 dark:bg-slate-800 dark:border-slate-700 bg-slate-200 border border-gray-300 rounded-lg shadow-lg">
              {cellValue}
            </div>
          )}
          {!cellValue && <i className="fas fa-edit opacity-80"></i>}
        </div>
      </div>
    </div>
  );
};

export default EditableCell;
