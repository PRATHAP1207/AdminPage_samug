import React from 'react'
import { useSelector } from 'react-redux'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import PrintGraph2Data from './PrintGraph2Data'
export default function PrintGraph() {
    const graphDataCurrency = useSelector(
        (state) => state.CurrencyReportReducer
    )

    const user = JSON.parse(localStorage.getItem('currencyDetails'))
   // console.log('json', user.splitData)

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    )
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Reward Purcase',
            },
        },
    }

    const labels = user.splitData

    const data = {
        labels,
        datasets: user.data.map((item) => ({
            label: item.name,
            data: item.detail.map((id) => id.purchaseCount),
            backgroundColor: ['green', 'grey', 'pink', 'red', 'black', 'grey'],
        })),
    }

    return (
        <>
            <Bar options={options} data={data} />
            <PrintGraph2Data />
        </>
    )
}
