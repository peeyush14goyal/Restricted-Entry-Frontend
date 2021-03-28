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

const PieChart = ({ values }) => {
  const [options, setOptions] = useState();

  useEffect(() => {
    setOptions({
      animationEnabled: true,
      backgroundColor: "#2e2b3e",
      width: "500",
      height: "300",

      colorSet: "customColorSet1",

      title: {
        text: "Users Logged in Today",
        fontColor: "white",
        fontFamily: "Arial",
        padding: 10,
      },
      axisY: {
        valueFormatString: '##0.00"%"',
        labelFontColor: "white",
      },
      data: [
        {
          type: "pie",
          startAngle: 75,
          toolTipContent: "<b>{label}</b>: {y}%",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabelFontColor: "white",
          indexLabel: "{label}:  {y}",
          dataPoints: values,
        },
      ],
    });
  }, [values]);

  return (
    <div className="row">
      <div className="">
        <CanvasJSChart options={options} />
      </div>
    </div>
  );
};

export default PieChart;
