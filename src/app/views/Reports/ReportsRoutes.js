import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const SubscriptionReport = Loadable(lazy(() => import('./SubscriptionReport')));

const ReportsRoutes = [
    {
        path: 'Reports/SubscriptReport',
        element: <SubscriptionReport />,
       // menuId: 8,
    },
]

export default ReportsRoutes