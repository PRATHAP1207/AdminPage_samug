import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const DhanSwipe = Loadable(lazy(() => import('./DhanSwipe')))

const DhanSwipeRoutes = [
    {
        path: '/DhanSwipe',
        element: <DhanSwipe />,
        menuId: 10,
    },
]

export default DhanSwipeRoutes
