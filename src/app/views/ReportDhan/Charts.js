/*import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { Grid } from '@mui/material'
import PieChart from './PieChart'
export default function Charts() {


     //  var details=graphData.tableListGraph.map((a)=>a.detail)
  //  console.log("details",details)
  //  var xaxisData=details.map(a => {
 
  //    return a.map((b)=>b.newSubscribe)
  //  });
  //  console.log("xaxisData",xaxisData)

    const dhanGenerated = {
        grid: {
            top: '10%',
            bottom: '10%',
            right: '5%',
        },
        legend: {
            show: true,
        },
        color: ['#223388', 'rgba(34, 51, 136, 0.8)', "orange"],
        barGap: 0,
        barMaxWidth: '20px',
        tooltip: {},
        xAxis: [
            {
                type: 'category',
                axisTick: { show: false },
                data: [
                    'India',
                    'Saudi Arabia',
                    'Bangladesh',
                    'Indonesia',
                    'SriLanka',
                    'United State'
                ]
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Year',
                type: 'bar',
                barGap: 0,
                emphasis: {
                    focus: 'series'
                },
                data: [320, 332, 301, 334, 390]
            },
            {
                name: 'Month',
                type: 'bar',
                // emphasis: {
                //     focus: 'series'
                // },
                data: [220, 182, 191, 234, 290]
            },
            {
                name: 'Date',
                type: 'bar',
                // emphasis: {
                //     focus: 'series'
                // },
                data: [150, 232, 201, 154, 190]
            },
            // {
            //   name: ' ',
            //   type: 'bar',
            //   emphasis: {
            //     focus: 'series'
            //   },
            //   data: [98, 77, 101, 99, 40]
            // }
        ]
    }
    const DhanUsed = {
        grid: {
            top: '10%',
            bottom: '10%',
            right: '5%',
        },
        legend: {
            show: true,
        },
        color: ['#223388', 'rgba(34, 51, 136, 0.8)', "orange"],
        barGap: 0,
        barMaxWidth: '20px',
        tooltip: {},
        xAxis: [
            {
                type: 'category',
                axisTick: { show: false },
                data: [
                    'India',
                    'Saudi Arabia',
                    'Bangladesh',
                    'Indonesia',
                    'SriLanka',
                    'United State'
                ]
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Year',
                type: 'bar',
                barGap: 0,
                emphasis: {
                    focus: 'series'
                },
                data: [320, 332, 301, 334, 390]
            },
            {
                name: 'Month',
                type: 'bar',
                emphasis: {
                    focus: 'series'
                },
                data: [220, 182, 191, 234, 290]
            },
            {
                name: 'Date',
                type: 'bar',
                emphasis: {
                    focus: 'series'
                },
                data: [150, 232, 201, 154, 190]
            },
            // {
            //   name: ' ',
            //   type: 'bar',
            //   emphasis: {
            //     focus: 'series'
            //   },
            //   data: [98, 77, 101, 99, 40]
            // }
        ]
    }
    return (
        <>

            <Grid container spacing={3}>
                <Grid item xs>
                    <ReactEcharts
                        style={{ height: "350px", margin: "30px" }}
                        option={{
                            ...dhanGenerated,
                            // color: [...color],
                        }}
                    />
                </Grid>
                <Grid item xs>
                    <ReactEcharts
                        style={{ height: "350px", margin: "30px" }}
                        option={{
                            ...DhanUsed,
                            // color: [...color],
                        }}
                    />
                </Grid>
            </Grid>
            <PieChart />
        </>
    )
}
*/


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
import PieChart from './PieChart'
echarts.use([
    TooltipComponent,
    GridComponent,
    LegendComponent,
    MarkLineComponent,
    BarChart,
    CanvasRenderer
]);

export default function ChartsComparision() {
    const dispatch = useDispatch();
    const dhanGraphData = useSelector((state) => state.DhanReportReducer)
 //   console.log("dhanview graph", dhanGraphData)  
   // const user = JSON.parse(localStorage.getItem('dhanTableListData'));
    const userData = useSelector((state) => state.DhanReportReducer)
   // console.log("user welcome",userData.dhanTableGraphData,userData.splitData)
 // console.log("jsonview chart1", user.data1,user.splitData);

    var dhanGeneratedInd = [], dhanGeneratedSaudi = [], dhanGeneratedSrilanka = [], usedSrilanka = [],
        dhanGeneratedUnitedStates = [], usedUnitedStates = [], usedIndia = [], usedSaudi = [], dhanGeneratedBangladesh = [],
        usedBangladesh = [], dhanGeneratedIndonesia = [], usedIndonesia = []
        userData.dhanTableGraphData.forEach(a => {
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
                data: userData.splitData
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
        <Container>
            <Grid container spacing={3}>
                <Grid item xs>
                    <FormControl className="" fullWidth={true} style={{ marginLeft: "10px", marginTop: "5px", marginRight: "80px", marginBottom: "30px" }}>
                        {<IntlMessages id="label.country" />} <InputLabel
                            id='demo-simple-select-label'
                            style={{ fontWeight: "normal", fontSize: "14px", paddingBottom: "4px", paddingLeft: "2px" }}></InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            placeholder="Select"
                            maxMenuHeight={10}
                            dropdownHeight="10px"
                            style={{
                                background: 'transparent',
                                width: '260px',
                                // padding: '5px',
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
                                dispatch(pieChartInputChange({
                                    props: "optionChange",
                                    value: value.target.value,
                                    error: "optionChangeError"
                                }))
                            }}
                        >
                            <MenuItem>Select ... </MenuItem>
                            {/* {dhanGraphData.DisplayCountry.map((id) =>
                  <MenuItem key={id} value={id.id}>
                    {id.name}
                  </MenuItem>
                )} */}
                            {dhanGraphData.countryData.map((id) =>
                                <MenuItem key={id} value={id.id}>
                                    {id.name}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs>
                    <PieChart />
                </Grid>
            </Grid>
        </Container>
    </>
    )
}
