
import React from 'react'
import { useSelector } from 'react-redux'
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
import * as echarts from 'echarts/core';
import {
    TooltipComponent,
    GridComponent,
    LegendComponent,
    MarkLineComponent
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import ReactECharts from 'echarts-for-react';
import PieChartReward from './PieChartReward'
echarts.use([
    TooltipComponent,
    GridComponent,
    LegendComponent,
    MarkLineComponent,
    BarChart,
    CanvasRenderer
]);


export default function PrintGraph() {
  const graphData = useSelector((state) => state.CurrencyReportReducer)
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('currencyDetails'));
console.log("json",user)
 
  var purcaseInd = [], purcaseSaudi = [], purcaseSrilanka = [], rewardUsedSrilanka = [],
  purcaseUnitedStates = [], rewardUsedUnitedStates = [], rewardUsedIndia = [], rewardUsedSaudi = [], purcaseBangladesh = [],
  rewardUsedBangladesh = [], purcaseIndonesia = [], rewardUsedIndonesia = []
user != '' && (
  user.data1.forEach(a => {
  if (a.countryId == 101) {
    purcaseInd.push(parseInt(a.purchaseCount));
    rewardUsedIndia.push(parseInt(a.purchaseUsed))
  }
  if (a.countryId == 194) {
    purcaseSaudi.push(parseInt(a.purchaseCount));
    rewardUsedSaudi.push(parseInt(a.purchaseUsed))
  }
  if (a.countryId == 19) {
    purcaseBangladesh.push(parseInt(a.purchaseCount));
    rewardUsedBangladesh.push(parseInt(a.purchaseUsed))
  }
  if (a.countryId == 102) {
    purcaseIndonesia.push(parseInt(a.purchaseCount));
    rewardUsedIndonesia.push(parseInt(a.purchaseUsed))
  }
  if (a.countryId == 208) {
    purcaseSrilanka.push(parseInt(a.purchaseCount));
    rewardUsedSrilanka.push(parseInt(a.purchaseUsed))
  }
  if (a.countryId == 233) {
    purcaseUnitedStates.push(parseInt(a.purchaseCount));
    rewardUsedUnitedStates.push(parseInt(a.purchaseUsed))
  }
})
)
const option = {
  tooltip: {
      //  trigger: 'axis',
      stack: 'true',
      axisPointer: {
          type: 'shadow'
      }
  },

  //  legend: {},
  grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
  },
  xAxis: [
      {
          stack: true,
          type: 'category',
          data: user.splitData
      }
  ],

  yAxis: [
      {
          stack: true,
          type: 'value'
      }
  ],
  series: [
      {
          name: "RewardPurcase,India",
          type: 'bar',
          stack: "India",
          emphasis: {
              focus: 'series'
          },
          data: purcaseInd,
      },
      {
          name: "RewardUsed,India",
          type: 'bar',
          stack: "India",
          emphasis: {
              focus: 'series'
          },
          data: rewardUsedIndia,
      },
      {
          name: "RewardPurcase,Saudi",
          type: 'bar',
          stack: "Saudi",
          emphasis: {
              focus: 'series'
          },
          data: purcaseSaudi,
      },
      {
          name: "RewardUsed,Saudi",
          type: 'bar',
          stack: "Saudi",
          emphasis: {
              focus: 'series'
          },
          data: rewardUsedSaudi,
      },
      {
          name: 'RewardPurcase,Srilanka',
          type: 'bar',
          stack: "SriLanka",
          emphasis: {
              focus: 'series'
          },
          data: purcaseSrilanka
      },
      {
          name: 'RewardUsed,Srilanka',
          type: 'bar',
          stack: "SriLanka",
          emphasis: {
              focus: 'series'
          },
          data: rewardUsedSrilanka
      },
      {
          name: 'RewardPurcase,UnitedStates',
          type: 'bar',
          stack: "UnitedStates",
          emphasis: {
              focus: 'series'
          },
          data: purcaseUnitedStates
      },
      {
          name: 'RewardUsed,UnitedStates',
          type: 'bar',
          stack: 'UnitedStates',
          emphasis: {
              focus: 'series'
          },
          data: rewardUsedUnitedStates
      },
      {
          name: 'RewardPurcase,Bangladesh',
          type: 'bar',
          stack: "Bangladesh",
          emphasis: {
              focus: 'series'
          },
          data: purcaseBangladesh
      },
      {
          name: 'RewardUsed,Bangladesh',
          type: 'bar',
          stack: 'Bangladesh',
          emphasis: {
              focus: 'series'
          },
          data: rewardUsedBangladesh
      },
      {
          name: 'RewardPurcase,Indonesia',
          type: 'bar',
          stack: "Indonesia",
          emphasis: {
              focus: 'series'
          },
          data: purcaseIndonesia
      },
      {
          name: 'RewardUsed,Indonesia',
          type: 'bar',
          stack: 'Indonesia',
          emphasis: {
              focus: 'series'
          },
          data: rewardUsedIndonesia
      },
  ]
 };
  return (
    <>
      <ReactECharts option={option} 
      />

    </>
  )
}