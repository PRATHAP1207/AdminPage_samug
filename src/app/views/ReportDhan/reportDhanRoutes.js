import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const Download = Loadable(lazy(() => import('./Download')))

const reportDhanRoutes = [
    {
        path: '/Download',
        element: <Download />,
        menuId: 8,
    },
]

export default reportDhanRoutes
