import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./DateRange.module.css";
import {
  setStartDate,
  setEndDate,
  setFrequency,
} from "../../redux/Bitcoin/bitcoinSlice";

import { getStartDate, getEndDate } from "../../redux/Bitcoin/selector";

import { IoIosArrowDown } from "react-icons/io";

import { toUnixTimestamp, fromUnixTimestamp } from "../../utils/dateUtils";

export const DateRange = () => {
  const dispatch = useDispatch();
  const startDate = fromUnixTimestamp(useSelector(getStartDate));
  const endDate = fromUnixTimestamp(useSelector(getEndDate));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  const onChange = (dates) => {
    const [start, end] = dates;
    dispatch(setStartDate(toUnixTimestamp(start)));
    dispatch(setEndDate(toUnixTimestamp(end)));
    dispatch(setFrequency("1d"));
    if (start && end) {
      setIsModalOpen(false);
    }
  };

  const handleInputClick = (event) => {
    event.stopPropagation();
    setIsModalOpen((prev) => !prev);
  };

  const handleQuickSelect = (period) => {
    let start, end;
    const today = new Date();
    switch (period) {
      case "today":
        start = today;
        end = today;
        break;
      case "yesterday":
        start = new Date(today);
        start.setDate(start.getDate() - 1);
        end = start;
        break;
      case "lastWeek":
        start = new Date(today);
        start.setDate(start.getDate() - 7);
        end = today;
        break;
      case "lastMonth":
        start = new Date(today);
        start.setMonth(start.getMonth() - 1);
        end = today;
        break;
      case "lastQuarter":
        start = new Date(today);
        start.setMonth(start.getMonth() - 3);
        end = today;
        break;
      default:
        start = new Date(today);
        start.setDate(start.getDate() - 1);
        end = start;
    }
    dispatch(setStartDate(toUnixTimestamp(start)));
    dispatch(setEndDate(toUnixTimestamp(end)));
    dispatch(setFrequency("1d"));
    setIsModalOpen(false);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleKeydown = (event) => {
    if (event.key === "Escape") {
      setIsModalOpen(false);
    }
  };

  const handleClickOutside = (event) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target) &&
      inputRef.current &&
      !inputRef.current.contains(event.target)
    ) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("keydown", handleKeydown);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.classList.add(css.modalOpen);
    } else {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.classList.remove(css.modalOpen);
    }
    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.classList.remove(css.modalOpen);
    };
  }, [isModalOpen]);

  return (
    <div className={css.container}>
      <div className={css.inputCont} ref={inputRef}>
        <input
          className={css.input}
          type="text"
          placeholder="Click to open date range picker"
          onClick={handleInputClick}
          readOnly
          value={`${formatDate(startDate)} - ${formatDate(endDate)}`}
        />
        <IoIosArrowDown onClick={handleInputClick} className={css.dropDown} />
      </div>
      {isModalOpen && (
        <div className={css.modal} ref={modalRef}>
          <div className={css.modalContent}>
            <div className={css.leftBar}>
              <ul className={css.quickSelect}>
                <button
                  onClick={() => handleQuickSelect("today")}
                  className={css.btn}
                >
                  Today
                </button>
                <button
                  onClick={() => handleQuickSelect("yesterday")}
                  className={css.btn}
                >
                  Yesterday
                </button>
                <button
                  onClick={() => handleQuickSelect("lastWeek")}
                  className={css.btn}
                >
                  Last week
                </button>
                <button
                  onClick={() => handleQuickSelect("lastMonth")}
                  className={css.btn}
                >
                  Last month
                </button>
                <button
                  onClick={() => handleQuickSelect("lastQuarter")}
                  className={css.btn}
                >
                  Last quarter
                </button>
              </ul>
              <button
                onClick={() => handleQuickSelect("default")}
                className={css.btnReset}
              >
                Reset
              </button>
            </div>
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
            />
          </div>
        </div>
      )}
    </div>
  );
};
