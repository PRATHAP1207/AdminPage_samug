import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const CouponForm = Loadable(lazy(() => import('./CouponForm')));
const CouponTableList = Loadable(lazy(() => import('./CouponTableList')));

const CouponRoutes = [
    {
        path: '/CouponForm',
        element: <CouponForm/>,
       // menuId: 9,
    },
    {
        path: '/CouponTableList',
        element: <CouponTableList/>,
       // menuId: 9,
    },
]

export default CouponRoutes