import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const UserLogin = Loadable(lazy(() => import('./UserLogin')))

const UserLoginDetailRoutes = [
    {
        path: '/UserLogin',
        element: <UserLogin/>,
      
    },
]

export default UserLoginDetailRoutes