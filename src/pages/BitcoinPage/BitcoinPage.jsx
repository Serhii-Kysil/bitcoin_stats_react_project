import css from "./BitcoinPage.module.css";
import { FilterBar } from "../../Components/FilterBar/FilterBar";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getBitcoinCurrency } from "../../redux/Bitcoin/opetations";
import {
  getStartDate,
  getEndDate,
  getFrequency,
} from "../../redux/Bitcoin/selector";
import { CandlsChart } from "../../Components/CandlsChart/CandlsChart";

export const BitcoinPage = () => {
  const dispatch = useDispatch();

  const startDate = useSelector(getStartDate);
  const endDate = useSelector(getEndDate);
  const frequency = useSelector(getFrequency);

  useEffect(() => {
    if (startDate && endDate) {
      dispatch(
        getBitcoinCurrency({ period1: startDate, period2: endDate, frequency })
      );
    }
  }, [dispatch, startDate, endDate, frequency]);

  return (
    <div className={css.pageCont}>
      <FilterBar />
      <CandlsChart />
    </div>
  );
};
