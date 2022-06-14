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
import { useDispatch,useSelector } from 'react-redux';
import { pieChartInputChange } from '../../redux/actions/DhanReportAction'
echarts.use([
    TooltipComponent,
    GridComponent,
    LegendComponent,
    MarkLineComponent,
    BarChart,
    CanvasRenderer
]);

export default function PrintDhanGen() {
    const dispatch = useDispatch();
    const dhanGraphData = useSelector((state) => state.DhanReportReducer)
    // console.log("dhanview graph", dhanGraphData)  
    const user = JSON.parse(localStorage.getItem('dhanTableListData'));
    // console.log("jsonview chart1", user.data1);

    var dhanGeneratedInd = [], dhanGeneratedSaudi = [], dhanGeneratedSrilanka = [], usedSrilanka = [],
        dhanGeneratedUnitedStates = [], usedUnitedStates = [], usedIndia = [], usedSaudi = [], dhanGeneratedBangladesh = [],
        usedBangladesh = [], dhanGeneratedIndonesia = [], usedIndonesia = []
    user != '' && (
        user.data1.forEach(a => {
        if (a.countryId == 101) {
            dhanGeneratedInd.push(parseInt(a.dhanGenerated));
            usedIndia.push(parseInt(a.dhanUsed))
        }
        if (a.countryId == 194) {
            dhanGeneratedSaudi.push(parseInt(a.dhanGenerated));
            usedSaudi.push(parseInt(a.dhanUsed))
        }
        if (a.countryId == 19) {
            dhanGeneratedBangladesh.push(parseInt(a.dhanGenerated));
            usedBangladesh.push(parseInt(a.dhanUsed))
        }
        if (a.countryId == 102) {
            dhanGeneratedIndonesia.push(parseInt(a.dhanGenerated));
            usedIndonesia.push(parseInt(a.dhanUsed))
        }
        if (a.countryId == 208) {
            dhanGeneratedSrilanka.push(parseInt(a.dhanGenerated));
            usedSrilanka.push(parseInt(a.dhanUsed))
        }
        if (a.countryId == 233) {
            dhanGeneratedUnitedStates.push(parseInt(a.dhanGenerated));
            usedUnitedStates.push(parseInt(a.dhanUsed))
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
                name: "DhanGeneration,India",
                type: 'bar',
                stack: "India",
                emphasis: {
                    focus: 'series'
                },
                data: dhanGeneratedInd,
            },
            {
                name: "DhanUsed,India",
                type: 'bar',
                stack: "India",
                emphasis: {
                    focus: 'series'
                },
                data: usedIndia,
            },
            {
                name: "DhanGeneration,Saudi",
                type: 'bar',
                stack: "Saudi",
                emphasis: {
                    focus: 'series'
                },
                data: dhanGeneratedSaudi,
            },
            {
                name: "DhanUsed,Saudi",
                type: 'bar',
                stack: "Saudi",
                emphasis: {
                    focus: 'series'
                },
                data: usedSaudi,
            },
            {
                name: 'DhanGeneration,Srilanka',
                type: 'bar',
                stack: "SriLanka",
                emphasis: {
                    focus: 'series'
                },
                data: dhanGeneratedSrilanka
            },
            {
                name: 'DhanUsed,Srilanka',
                type: 'bar',
                stack: "SriLanka",
                emphasis: {
                    focus: 'series'
                },
                data: usedSrilanka
            },
            {
                name: 'DhanGeneration,UnitedStates',
                type: 'bar',
                stack: "UnitedStates",
                emphasis: {
                    focus: 'series'
                },
                data: dhanGeneratedUnitedStates
            },
            {
                name: 'DhanUsed,UnitedStates',
                type: 'bar',
                stack: 'UnitedStates',
                emphasis: {
                    focus: 'series'
                },
                data: usedUnitedStates
            },
            {
                name: 'DhanGeneration,Bangladesh',
                type: 'bar',
                stack: "Bangladesh",
                emphasis: {
                    focus: 'series'
                },
                data: dhanGeneratedBangladesh
            },
            {
                name: 'DhanUsed,Bangladesh',
                type: 'bar',
                stack: 'Bangladesh',
                emphasis: {
                    focus: 'series'
                },
                data: usedBangladesh
            },
            {
                name: 'DhanGeneration,Indonesia',
                type: 'bar',
                stack: "Indonesia",
                emphasis: {
                    focus: 'series'
                },
                data: dhanGeneratedIndonesia
            },
            {
                name: 'DhanUsed,Indonesia',
                type: 'bar',
                stack: 'Indonesia',
                emphasis: {
                    focus: 'series'
                },
                data: usedIndonesia
            },


        ]
    };

    return (<>
        <ReactECharts
            option={option}
        />
    </>
    )
}
