import { CandleSize } from "../CandleSize/CandleSize";
import { DateRange } from "../DateRange/DateRange";
import { SyncData } from "../SyncData/SyncData";
import css from "./FilterBar.module.css";

export const FilterBar = () => {
  return (
    <div className={css.filterBar}>
      <CandleSize />
      <DateRange />
      <SyncData />
    </div>
  );
};
