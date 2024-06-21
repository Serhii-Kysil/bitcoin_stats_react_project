import { useState, useEffect, useRef } from "react";
import css from "./CandlsChart.module.css";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { getItems } from "../../redux/Bitcoin/selector";

export const CandlsChart = () => {
  const items = useSelector(getItems);
  const [ctrlPressed, setCtrlPressed] = useState(false);
  const [squares, setSquares] = useState([]);
  const [dragging, setDragging] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Control") {
        setCtrlPressed(true);
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "Control") {
        setCtrlPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  //add new markers by pressing left click
  const handleDivClick = (event) => {
    const container = event.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    //check if square exists
    const isExistingSquare = squares.some(
      (square) => Math.abs(square.x - x) < 10 && Math.abs(square.y - y) < 10
    );

    if (!isExistingSquare) {
      const newSquare = { x, y };
      setSquares([...squares, newSquare]);
    }
  };

  //delete marker by pressing right click
  const handleSquareRightClick = (event, index) => {
    event.preventDefault();
    setSquares(squares.filter((_, i) => i !== index));
  };

  //drugging marker by holding left click on marker
  const handleMouseDown = (index) => (event) => {
    setDragging(index);
  };
  const handleMouseMove = (event) => {
    if (dragging === null) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setSquares((prevSquares) =>
      prevSquares.map((square, index) =>
        index === dragging ? { x, y } : square
      )
    );
  };
  const handleMouseUp = () => {
    setDragging(null);
  };
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

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
      events: {
        mouseMove: function (event, chartContext) {
          if (!ctrlPressed) {
            chartContext.clearAnnotations();
          }
        },
      },
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      opposite: true,
      tooltip: {
        enabled: ctrlPressed,
      },
    },
    tooltip: {
      enabled: ctrlPressed,
    },
  };

  const series = [
    {
      name: "Bitcoin",
      data: seriesData,
    },
  ];

  return (
    <div
      className={css.chartCont}
      onClick={handleDivClick}
      style={{ position: "relative" }}
      ref={containerRef}
    >
      <Chart
        options={options}
        series={series}
        type="candlestick"
        height="100%"
      />
      {squares.map((square, index) => (
        <div
          key={index}
          onContextMenu={(e) => handleSquareRightClick(e, index)}
          onMouseDown={handleMouseDown(index)}
          style={{
            position: "absolute",
            top: `${square.y - 14}px`,
            left: `${square.x}px`,
            width: "20px",
            height: "20px",
            backgroundColor: "#FFA500",
            transform: "translate(-50%, -50%) rotate(45deg)",
            cursor: "pointer",
          }}
        />
      ))}
    </div>
  );
};
