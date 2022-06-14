import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChartReward() {
  const dispatch = useDispatch();
  const getPieChartCurr = useSelector((state) => state.CurrencyReportReducer)
 // console.log("pieeeee",getPieChartCurr)
  const rows = [], rew = []
  if (getPieChartCurr.curCountryIds != 0 || getPieChartCurr.optionChange != 0) {
    var rewardPurchase = 0;
    getPieChartCurr.rewardCalculation.forEach(element => {
      element.forEach(res => {
        if (res.countryId == getPieChartCurr.optionChange) {
          var temp = parseInt([res.purchaseCount]);
          rew.push(temp)
        }
      })
      //console.log("rew", rew)
      rewardPurchase = 0;
      for (var i in rew) {
        rewardPurchase += rew[i];
      }
    })
  }
  //console.log("sumxxcx", rewardPurchase)



  if (getPieChartCurr.curCountryIds != 0 || getPieChartCurr.optionChange != 0) {
    var rewardUse = 0;
    getPieChartCurr.rewardCalculation.forEach(element => {
      element.forEach(res => {
        if (res.countryId == getPieChartCurr.optionChange) {
          var temp = parseInt([res.purchaseUsed]);
          rows.push(temp)
        }
      })
     // console.log("rows", rows)
      rewardUse = 0;
      for (var i in rows) {
        rewardUse += rows[i];
      }
    }
    )

  }

 // console.log("sumxxcx dhanUse", rewardUse)


  const data = {

    labels: ["Reward Used", "Reward Purchase"],
    datasets: [
      {
        label: "",
        data: [rewardUse, rewardPurchase],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ]
      }
    ],

  };

  return <Pie data={data}
    options={{
      padding: "20px",
      responsive: false,
      maintainAspectRatio: false,
      defaultFontSize: "14px",
      height: "450px",
      margin: "40px",
      legend: {
        display: false,
        position: "center",
        align: "right"
      },
      float: 'right'
    }}
  />;
}

