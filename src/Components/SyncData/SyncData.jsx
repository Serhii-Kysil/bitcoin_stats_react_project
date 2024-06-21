import css from "./SyncData.module.css";
import { LuRefreshCw } from "react-icons/lu";
import { getBitcoinCurrency } from "../../redux/Bitcoin/opetations";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStartDate,
  getEndDate,
  getFrequency,
  getLastSyncTime,
} from "../../redux/Bitcoin/selector";

export const SyncData = () => {
  const dispatch = useDispatch();
  const lastSyncTime = useSelector(getLastSyncTime);
  const startDate = useSelector(getStartDate);
  const endDate = useSelector(getEndDate);
  const frequency = useSelector(getFrequency);

  const [timeSinceLastSync, setTimeSinceLastSync] = useState(0);

  const syncInterval = import.meta.env.VITE_SYNC_INTERVAL;

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastSyncTime) {
        const min = Math.floor((Date.now() - lastSyncTime) / 60000);
        setTimeSinceLastSync(min);

        if (min >= syncInterval) {
          dispatch(
            getBitcoinCurrency({
              period1: startDate,
              period2: endDate,
              frequency,
            })
          );
          setTimeSinceLastSync(0);
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [lastSyncTime, dispatch, startDate, endDate, frequency]);

  const handleSyncClick = () => {
    dispatch(
      getBitcoinCurrency({
        period1: startDate,
        period2: endDate,
        frequency,
      })
    );
    setTimeSinceLastSync(0);
  };

  return (
    <div className={css.container} onClick={handleSyncClick}>
      <LuRefreshCw />
      <span className={css.text}>
        Sync {timeSinceLastSync} minute{timeSinceLastSync !== 1 ? "s" : ""} ago
      </span>
    </div>
  );
};
