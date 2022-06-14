import React from 'react'
import {useSelector} from 'react-redux'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {Grid} from '@mui/material'
import { Bar } from 'react-chartjs-2';
import { is } from 'date-fns/locale';
import PrintDhanUsed from './PrintDhanUsed'
//import faker from 'faker';


export default function PrintDhanGen() {
  const dhanGraphData = useSelector((state)=> state.DhanReportReducer)
//console.log("dhanview graph",dhanGraphData)
  const user = JSON.parse(localStorage.getItem('dhanTableListData'));
// console.log("jsonview chart1",user)
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
 const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text:'Dhan Generation',
      },
    },
  };
 
  const labels = user.splitData
 const data = {
    labels,
    datasets: user.data.map((item)=>
      (
        {
        label:item.name,
        data:item.detail.map((id)=>id.dhanGenerated),
        backgroundColor:["green","grey", "pink", "red", "black","grey"],
      }
      ))
  };
return (
  <>
    <Bar options={options} data={data} />
    <PrintDhanUsed/>
  {/* <Bar options={option1} data={data1}  />   */}
  </>
)




}