import React, { useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
ChartJS.register(ArcElement, Tooltip, Legend)

export default function PieChart() {
    const dispatch = useDispatch()
    const getPieChartData = useSelector((state) => state.DhanReportReducer)

   // console.log('var', getPieChartData.DhanCalculation)

    const dhan = []
    if (
        getPieChartData.countryChange != 0 ||
        getPieChartData.optionChange != 0
    ) {
        var dhanGenerat = 0
        getPieChartData.DhanCalculation.forEach((element) => {
            element.forEach((res) => {
                if (res.countryId == getPieChartData.optionChange) {
                    var temp = parseInt([res.dhanGenerated])
                    dhan.push(temp)
                }
            })
            dhanGenerat = 0
            for (var i in dhan) {
                dhanGenerat += dhan[i]
            }
        })
    }

    const rows = [0]
    if (
        getPieChartData.countryChange != 0 ||
        getPieChartData.optionChange != 0
    ) {
        var dhanUse = 0,
            temp = 0
        getPieChartData.DhanCalculation.forEach((element) => {
            element.forEach((res) => {
                if (res.countryId == getPieChartData.optionChange) {
                    temp = parseInt([res.dhanUsed])
                    rows.push(temp)
                }
            })
           // console.log('rows', rows)
            dhanUse = 0
            for (var i in rows) {
                dhanUse += rows[i]
            }
        })
    }

  //  console.log('sumxxcx dhanUse', dhanUse, dhanGenerat)

    const data = {
        labels: ['dhanGenerated', 'dhanUsed'],
        datasets: [
            {
                label: getPieChartData.DhanCalculation.map((id) => id.country),
                data: [dhanGenerat, dhanUse],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
            },
        ],
    }

    return (
        <>
            <Pie
                data={data}
                options={{
                    padding: '20px',
                    responsive: false,
                    maintainAspectRatio: false,
                    defaultFontSize: '14px',
                    height: '450px',
                    margin: '40px',
                    legend: {
                        display: false,
                        position: 'center',
                        align: 'right',
                    },
                    float: 'right',
                }}
            />
        </>
    )
}
