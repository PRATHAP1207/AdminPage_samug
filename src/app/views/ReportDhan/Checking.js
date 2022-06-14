import React from 'react'
import { useSelector } from 'react-redux'

export default function Checking() {
    const getPieChartData = useSelector((state) => state.DhanReportReducer)
   // console.log("pieeeeeee",getPieChartData)
   const data = ['1','2','3','4','5'],dhan = [];
   {getPieChartData.countryChange.map((item,index) => {
    
        if(parseInt(item) == getPieChartData.optionChange)
        {
            var dhanGenerat = 0;
            getPieChartData.DhanCalculation.forEach(element => {
              element.forEach(res => {
                var temp = parseInt([res.dhanGenerated]);
                dhan.push(temp)
              })
            //  console.log(dhan)
              dhanGenerat = 0;
              for (var i in dhan) {
                dhanGenerat += dhan[i];
              }
            })
        }
   // console.log(dhanGenerat)
   }
    )}


    return (
        <>
      {/* <div>
      { getPieChartData.countryChange.map((item,index) => 
       (<div key={index}> Hello World {item}   ,,{index}</div>) )}
    </div> */}
        </>
    )
}