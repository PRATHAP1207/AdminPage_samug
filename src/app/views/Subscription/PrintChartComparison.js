import React from 'react';
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
import { useSelector } from 'react-redux';

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  BarChart,
  CanvasRenderer
]);
export default function PrintChartComparison() {
  const user = JSON.parse(localStorage.getItem('storageTableListData'));
 console.log("jsongraphhhh",user.data.data1);

  var newSubscription = [], newSaudi = [],newSriLanka=[],renSriLanka=[],newUnitedStates=[],renUnitedStates=[], renewal = [], rensaudi = [],SubBangladesh=[],renBangladesh=[],newIndonesia=[],renIndonesia=[]
  user != '' && (
    user.data.data1.forEach(a => {
    if (a.countryId == 101) {
      newSubscription.push(parseInt(a.newSubscription));
      renewal.push(parseInt(a.renewal))
    }
    if (a.countryId == 194) {
      newSaudi.push(parseInt(a.newSubscription));
      rensaudi.push(parseInt(a.renewal))
    }
    if (a.countryId == 19) {
      SubBangladesh.push(parseInt(a.newSubscription));
      renBangladesh.push(parseInt(a.renewal))
    }
    if (a.countryId == 102) {
      newIndonesia.push(parseInt(a.newSubscription));
      renIndonesia.push(parseInt(a.renewal))
    }
    if (a.countryId == 208) {
      newSriLanka.push(parseInt(a.newSubscription));
      renSriLanka.push(parseInt(a.renewal))
    }
    if (a.countryId == 233) {
      newUnitedStates.push(parseInt(a.newSubscription));
      renUnitedStates.push(parseInt(a.renewal))
    }
  }))
 
  const option = {
    tooltip: {
      //  trigger: 'axis',
      stack:'true',
      axisPointer: {
        type: 'shadow'
      }
    },

      // legend: {},
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
        data:  user.data.splitData
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
        name: "Subscription,India",
        type: 'bar',
        stack: "India",
        emphasis: {
          focus: 'series'
        },
        data: newSubscription,
      },
      {
        name: "Renewal,India",
        type: 'bar',
        stack: "India",
        emphasis: {
          focus: 'series'
        },
        data: renewal,
      },
      {
        name: "Subscription,Saudi",
        type: 'bar',
        stack: "Saudi",
        emphasis: {
          focus: 'series'
        },
        data: newSaudi,
      },
      {
        name: "Renewal,Saudi",
        type: 'bar',
        stack: "Saudi",
        emphasis: {
          focus: 'series'
        },
        data: rensaudi,
      },
      {
        name: 'Subscription,Srilanka',
        type: 'bar',
        stack: "SriLanka",
        emphasis: {
          focus: 'series'
        },
        data: newSriLanka
      },
      {
        name: 'Renewal,Srilanka',
        type: 'bar',
        stack: "SriLanka",
        emphasis: {
          focus: 'series'
        },
        data: renSriLanka
      },
      {
        name: 'Subscription,UnitedStates',
        type: 'bar',
        stack: "UnitedStates",
        emphasis: {
          focus: 'series'
        },
        data: newUnitedStates
      },
      {
        name: 'Renewal,UnitedStates',
        type: 'bar',
        stack: 'UnitedStates',
        emphasis: {
          focus: 'series'
        },
        data: renUnitedStates
      },
      {
        name: 'Subscription,Bangladesh',
        type: 'bar',
        stack: "Bangladesh",
        emphasis: {
          focus: 'series'
        },
        data: SubBangladesh
      },
      {
        name: 'Renewal,Bangladesh',
        type: 'bar',
        stack: 'Bangladesh',
        emphasis: {
          focus: 'series'
        },
        data: renBangladesh
      },
      {
        name: 'Subscription,Indonesia',
        type: 'bar',
        stack: "Indonesia",
        emphasis: {
          focus: 'series'
        },
        data: newIndonesia
      },
      {
        name: 'Renewal,Indonesia',
        type: 'bar',
        stack: 'Indonesia',
        emphasis: {
          focus: 'series'
        },
        data: renIndonesia
      },
    
    
    ]
  };
 

  return (
    <ReactECharts 
    option={option}
     />

  )
}

