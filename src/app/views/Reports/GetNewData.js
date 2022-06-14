import React, { Fragment, useEffect } from 'react'
import { Container } from 'app/constant/Common'
import IntlMessages from '../../utils/IntlMessages'
import { Breadcrumb } from 'app/components'
import { SimpleCard } from 'matx'
import MaterialTable from 'material-table'
import { Icon } from '@mui/material'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';


export default function GetNewData() {
  
   const column= [
      { title: 'Sno', render: (rowData) => rowData.tableData.id + 1  },
      { title: 'Country', field: 'country' },
      { title: 'Coupon-Code', field: 'couponCode' },
      { title: 'Coupon-Mode', field: 'couponMode' },
      { title: 'Coupon-Value', field: 'couponValue' },
    //   {title :'Coupon Percentage' , field:'couponPercentage'},
      { title: 'Discount-type', field: 'discountType' },
      { title: 'Maximum-Count', field: 'maxCount' },
      { title: 'Start-Date', field: 'startDate' },
      { title: 'End-Date', field: 'endDate' },
  ]
  const data=[{'country' : " India"},
  {'country' : " India"},
  {'country' : " India"},
  {'country' : " India"}];
    //  const data=CouponReducer.couponListData  && CouponReducer.couponListData.map((item)=>(
    //   {
    //     country:item.countryId,
    //     couponValue:  item.couponAmount != 0 ?  item.couponAmount : item.couponPercentage + "%",
    //     couponMode:item.couponMode == 1 ? "Subscribe" : item.couponMode == 2 ? "Currency" : "Amount" ,
    //     discountType:item.discountType == 1 ? "Percentage" : "Amount",
    //     couponCode:item.coupon,
    //     maxCount:item.maxCount,
    //     startDate: dateFormat(item.startDate),
    //     endDate:  dateFormat(item.endDate),
  
    //   }
    // ))
  
    return (
        <Container>
           
            <SimpleCard>
                <MaterialTable
                  onRowClick={(event, rowData) => {
                    console.log(rowData);
                    window.open("GetNewData", "_blank")
                    //event.stopPropagation();
                  }}
                    style={{ paddingLeft: '15px' }}
                    title="Subscription Report"
                    columns={column}
                    data={data}
                    actions={[
                        // {
                        //   icon: () => <Icon style={{ color: "green" }}>edit</Icon>,
                        //   tooltip:<IntlMessages id="label.employeeEdit" />,
                        //   onClick: (event, rowData) => {

                        //    // return alert("You Edit " + rowData.towerId);
                        //   //  return this.props.onEditEmployee({rowData: rowData ,navigation:this.props.navigate});
                        //   },
                        // },
                        (rowData) => ({
                            icon: () => (
                                <Icon style={{ color: 'red' }}>delete</Icon>
                            ),
                            tooltip: <IntlMessages id="label.deleteCoupon" />,
                            onClick: (event, rowData) => {
                             //   onDeleteCoupon(event)
                                //return confirm("You want to delete " + rowData.name);
                                //    return this.props.onDeleteEmployee(rowData);
                            },
                            //disabled: rowData.birthYear < 2000
                        }),
                    ]}
                    options={{
                        exportButton: true,
                        actionsColumnIndex: -1,
                        search: false,
                        paging: false,
                        headerStyle: { position: 'center' },
                    }}
                />
            </SimpleCard>
        </Container>
    )
}
