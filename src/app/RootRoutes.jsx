import React from 'react'
import { Redirect } from 'react-router-dom'
import chartsRoute from './views/charts/ChartsRoute'
import dashboardRoutes from './views/dashboard/DashboardRoutes'
import materialRoutes from './views/material-kit/MaterialRoutes'
import moderatorRoutes from './views/moderator/ModeratorRoutes'

// import newRolesDialog from './views/admin/newRolesDialog'
// import roleMenu from './views/admin/roleMenu'
// import RoleMenuListTable from './views/admin/RoleMenuListTable'
import adminRoutes from './views/admin/AdminRoutes'
import accountsRoutes from './views/accounts/AccountsRoutes'
import employeeRoutes from './views/employee/EmployeeRoutes'
import userTreeRoutes from './views/usertree/UserTreeRoutes'
import GraphRoutes from './views/Subscription/GraphRoutes'
import reportDhanRoutes from './views/ReportDhan/reportDhanRoutes'
import CurrencyRoutes from './views/Currency/CurrencyRoutes'
import DhanSwipeRoutes from './views/DhanType/DhanSwipeRoutes';
import CouponRoutes from "./views/CouponCardDetails/CouponRoutes";
import UserLoginDetailRoutes from "./views/SamugLoginDetailsReport/UserLoginDetailRoutes"
const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/dashboard/default" />,
    },
    // {
    //     path: '',
    //     exact: true,
    //     component: () => <Redirect to="/dashboard/default" />,
    // },
]

const errorRoute = [
    {
        component: () => <Redirect to="/session/404" />,
    },
]

const routes = [
    ...dashboardRoutes,
    ...materialRoutes,
    ...chartsRoute,
    ...redirectRoute,
    ...errorRoute,
    ...adminRoutes,
    ...accountsRoutes,
    ...moderatorRoutes,
    ...employeeRoutes,
    ...userTreeRoutes,
    ...GraphRoutes,
    ...reportDhanRoutes,
    ...CurrencyRoutes,
    ...DhanSwipeRoutes,
    ...UserLoginDetailRoutes,
    ...CouponRoutes,
]

export default routes
