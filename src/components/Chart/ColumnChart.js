import React, { useState, useEffect } from "react";
import CanvasJSReact from "../../canvasJs/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

CanvasJS.addColorSet("customColorSet1", [
  //colorSet Array
  "#7524d8",
  "#36aeed",
  "#eb98cc",
]);

const ColumnChart = ({ values }) => {
  const [options, setOptions] = useState();

  useEffect(() => {
    setOptions({
      backgroundColor: "#2e2b3e",

      colorSet: "customColorSet1",
      axisX: {
        labelFontColor: "white",
      },
      axisY: {
        labelFontColor: "white",
      },
      title: {
        text: "CheckIn - CheckOut",
        fontColor: "white",
        fontFamily: "Arial",
      },
      data: [
        {
          type: "column",
          dataPoints: values,
        },
      ],
    });
  }, []);

  return (
    <div className="row">
      <div className="col-6 text-center mt-4 offset-3">
        <CanvasJSChart options={options} />
      </div>
    </div>
  );
};

export default ColumnChart;
