
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
import { pieChartCurrInputChange } from '../../redux/actions/CurrencyReportAction'
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
export default function ChartUsedCurrency() {
 
  const dispatch = useDispatch();
 // const user = JSON.parse(localStorage.getItem('currencyDetails'));
//console.log("json",user.data1)
const graphData = useSelector((state) => state.CurrencyReportReducer)



 
  var purcaseInd = [], purcaseSaudi = [], purcaseSrilanka = [], rewardUsedSrilanka = [],
  purcaseUnitedStates = [], rewardUsedUnitedStates = [], rewardUsedIndia = [], rewardUsedSaudi = [], purcaseBangladesh = [],
  rewardUsedBangladesh = [], purcaseIndonesia = [], rewardUsedIndonesia = []
  graphData.tableDhanCurr.forEach(a => {
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
});

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
          data: graphData.splitData
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
      <Grid container spacing={3}>
        <Grid item xs>
          <FormControl className="" fullWidth={true} style={{ marginLeft: "10px", marginTop: "5px", marginRight: "80px", marginBottom: "30px" }}>
            {<IntlMessages id="label.country" />} <InputLabel
              id='demo-simple-select-label'
              style={{ fontWeight: "normal", fontSize: "14px", paddingBottom: "4px", paddingLeft: "2px" }}></InputLabel>
            <Select
              labelId="demo-simple-select-label"
              placeholder="Select"
              maxmenuheight={10}
              dropdownHeight="10px"
              style={{
                background: 'transparent',
                width: '260px',
                dropdownHeight: '10px',
                fontSize: '15px',
                lineHeight: '1',
                border: '0',
                borderRadius: '0',
                height: '34px',
                textIndent: ' 0.01px',
                textOverflow: '',
                minWidth: 1,
                padding: '0.16666666666667em 0.5em',
              }}
              onChange={(value) => {
                dispatch(pieChartCurrInputChange({
                  props: "optionChange",
                  value: value.target.value,
                  error: "optionChangeError"
                }))
              }}
            >
              <MenuItem>Select ... </MenuItem>
              {graphData.countryList.map((id) =>
                <MenuItem key={id} value={id.id}>
                  {id.name}
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs>
          <PieChartReward />
        </Grid>
      </Grid>


    </>
  )
}