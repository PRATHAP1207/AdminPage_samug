import React from 'react'
import { useSelector } from 'react-redux'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { is } from 'date-fns/locale';
import PieChart from './PieChart'
//import faker from 'faker';
import IntlMessages from "../../utils/IntlMessages";
import { Container } from 'app/constant/Common';
import { SimpleCard } from 'matx'
import {
  FormControl,
  FormLabel,
  Grid,
  Select,
  Button,
  MenuItem,
  TextField,
  InputLabel
} from '@mui/material'
import { useDispatch } from 'react-redux';
import { pieChartInputChange } from '../../redux/actions/DhanReportAction'
import html2canvas from "html2canvas";
import ReactDOM from "react-dom";
const pdfConverter = require("jspdf");


export default function PrintDhanUsed() {

  const dispatch = useDispatch();
  const dhanGraphData = useSelector((state) => state.DhanReportReducer)
 // console.log("dhanview graph", dhanGraphData)
  const users = JSON.parse(localStorage.getItem('dhanTableListData'));

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
        text: 'Dhan Used',
      },
    },
  };

  const labels = users.splitData
  const data = {
    labels,
    datasets: users.data.map((item) =>
    (
      {
        label: item.name,
        data: item.detail.map((id) => id.dhanUsed),
        backgroundColor: ["green", "grey", "pink", "red", "black", "grey"],
      }
    ))
  };

 

  return (
    <>
      {/* <button onClick={e => div2PDF(e)}>Export PDF</button> */}
      <Bar
        options={options} data={data} />
    
    </>
  )
}
