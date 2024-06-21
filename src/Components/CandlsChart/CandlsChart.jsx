import css from "./CandlsChart.module.css";
import Chart from "react-apexcharts";

import { useSelector } from "react-redux";

import { getItems } from "../../redux/Bitcoin/selector";

export const CandlsChart = () => {
  const items = useSelector(getItems);

  const seriesData = items.map((item) => ({
    x: new Date(item.Date),
    y: [
      parseFloat(item.Open).toFixed(2),
      parseFloat(item.High).toFixed(2),
      parseFloat(item.Low).toFixed(2),
      parseFloat(item.Close).toFixed(2),
    ],
  }));

  const options = {
    chart: {
      type: "candlestick",
      width: "100%",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      type: "datetime",
    },

    yaxis: {
      opposite: true,
      tooltip: {
        enabled: true,
      },
    },
  };

  const series = [
    {
      name: "Bitcoin",
      data: seriesData,
    },
  ];

  return (
    <div className={css.chartCont}>
      <Chart
        options={options}
        series={series}
        type="candlestick"
        height="100%"
      />
    </div>
  );
};
