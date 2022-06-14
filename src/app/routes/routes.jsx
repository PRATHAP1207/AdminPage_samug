import AuthGuard from 'app/auth/AuthGuard'
import NotFound from 'app/views/sessions/NotFound'
import chartsRoute from 'app/views/charts/ChartsRoute'
import materialRoutes from 'app/views/material-kit/MaterialRoutes'
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes'
import sessionRoutes from 'app/views/sessions/SessionRoutes'
import MatxLayout from '../components/MatxLayout/MatxLayout'
import { Navigate } from 'react-router-dom'
import adminRoutes from 'app/views/admin/AdminRoutes'
import employeeRoutes from 'app/views/employee/EmployeeRoutes'
import accountsRoutes from 'app/views/accounts/AccountsRoutes'
import moderatorRoutes from 'app/views/moderator/ModeratorRoutes'
import userTreeRoutes from 'app/views/usertree/UserTreeRoutes'
import GraphRoutes from 'app/views/Subscription/GraphRoutes'
import reportDhanRoutes from 'app/views/ReportDhan/reportDhanRoutes'
import CurrencyRoutes from 'app/views/Currency/CurrencyRoutes'
import DhanSwipeRoutes from 'app/views/DhanType/DhanSwipeRoutes'
import UploadRoutes from 'app/views/UploadAll/UploadRoutes'
import Print from 'app/views/ReportDhan/Print'
import MessagesRoutes from 'app/views/Messages/MessagesRoutes';
import PrintTableCurrency from 'app/views/Currency/PrintTableCurrency';
import PrintOut from 'app/views/Subscription/PrintOut';
import PrintGraph from 'app/views/Currency/PrintGraph';
import PrintOutDhanSwipe from 'app/views/DhanType/PrintOutDhanSwipe';
import PrintTableUserLogin from 'app/views/SamugLoginDetailsReport/PrintTableUserLogin'
import UserLoginDetailRoutes from "app/views/SamugLoginDetailsReport/UserLoginDetailRoutes";
import CouponRoutes from "app/views/CouponCardDetails/CouponRoutes";
import TableLink from 'app/views/ReportDhan/TableLink';
import TableLinkCurrency from 'app/views/Currency/TableLinkCurrency'

export const AllPages = () => {
    const all_routes = [
        {
            element: (
                <AuthGuard>
                    <MatxLayout />
                </AuthGuard>
            ),
            children: [
                ...dashboardRoutes,
                ...chartsRoute,
                ...materialRoutes,
                ...adminRoutes,
                ...employeeRoutes,
                ...accountsRoutes,
                ...moderatorRoutes,
                ...userTreeRoutes,
                ...GraphRoutes,
                ...reportDhanRoutes,
                ...CurrencyRoutes,
                ...DhanSwipeRoutes,
                ...UploadRoutes,
                ...MessagesRoutes,
                ...UserLoginDetailRoutes,
                ...CouponRoutes,
            ],
        },
        ...sessionRoutes,
        {
            path: '/',
            element: <Navigate to="dashboard/default" />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
        {
            path: '/Print',
          element:<Print/>
        },
        {
            path:'/PrintTableCurrency',
            element:<PrintTableCurrency/>
          },
          {
            path: '/PrintOut',
          element:<PrintOut/>
        },
       
        {
            path: '/PrintOutDhanSwipe',
          element:<PrintOutDhanSwipe/>
        },
      
      {
        path:'/PrintGraph',
        element:<PrintGraph/> 
      },
       {
        path:'/PrintOutDhanSwipe',
        element:<PrintOutDhanSwipe/>
       },
       {
        path:'/PrintTableUserLogin',
        element:<PrintTableUserLogin/>
       },
       {
        path: '/TableLink',
      element:<TableLink/>
    },  {
      path: '/TableLinkCurrency',
    element:<TableLinkCurrency/>
  }
        /* {
            path: '/demoo/demo',
            element: <Demo />,
        },*/
    ]

    return all_routes
}
