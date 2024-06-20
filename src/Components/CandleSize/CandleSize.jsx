import css from "./CandleSize.module.css";
import Select from "react-select";
import { BsStar } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setFrequency } from "../../redux/Bitcoin/bitcoinSlice";
import {
  getFrequency,
  getStartDate,
  getEndDate,
} from "../../redux/Bitcoin/selector.js";
import toast from "react-hot-toast";
import { differenceInDays } from "date-fns";
import { fromUnixTimestamp } from "../../utils/dateUtils";

export const CandleSize = () => {
  const dispatch = useDispatch();

  const frequency = useSelector(getFrequency);
  const startDate = fromUnixTimestamp(useSelector(getStartDate));
  const endDate = fromUnixTimestamp(useSelector(getEndDate));

  const options = [
    { value: "1d", label: "1 D" },
    { value: "1wk", label: "1 W" },
    { value: "1mo", label: "1 M" },
    { value: "3mo", label: "3 M" },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "100%",
    }),
    menu: (provided) => ({
      ...provided,
      width: "100%",
      zIndex: 9999,
    }),
  };

  const handleChange = (option) => {
    const dateDiff = differenceInDays(endDate, startDate);
    const frequencyInDays = {
      "1d": 1,
      "1wk": 7,
      "1mo": 30,
      "3mo": 90,
    };

    if (frequencyInDays[option.value] > dateDiff) {
      toast.error("Candle size exceeds the selected date range.");
      return;
    }

    dispatch(setFrequency(option.value));
  };

  const formatOptionLabel = ({ label }, { context }) => {
    if (context === "menu") {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{label}</span>
          <BsStar />
        </div>
      );
    }
    return label;
  };

  const selectedOption = options.find((option) => option.value === frequency);

  return (
    <div className={css.selectContainer}>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        styles={customStyles}
        formatOptionLabel={formatOptionLabel}
      />
    </div>
  );
};
