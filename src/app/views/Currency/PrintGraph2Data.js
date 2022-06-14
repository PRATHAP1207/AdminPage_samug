
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
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import PieChartReward from './PieChartReward'
import IntlMessages from "../../utils/IntlMessages";
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
import { pieChartCurrInputChange } from '../../redux/actions/CurrencyReportAction'
//import faker from 'faker';
export default function PrintGraph2Data() {
  const graphData = useSelector((state) => state.CurrencyReportReducer)
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('currencyDetails'));

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
        text: 'Reward Used',
      },
    },
  };

  const labels = user.splitData


  const data = {
    labels,
    datasets: user.data.map((item) =>
    (
      {
        label: item.name,
        data: item.detail.map((id) => id.purchaseUsed),
        backgroundColor: ["green", "grey", "pink", "red", "black", "grey"],
      }
    ))
  };



  return (
    <>
      <Bar options={options} data={data} />
    </>
  )




}