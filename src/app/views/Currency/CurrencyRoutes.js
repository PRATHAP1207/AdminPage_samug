import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const Currency = Loadable(lazy(() => import('./Currency')))

const CurrencyRoutes = [
    {
        path: '/Currency',
        element: <Currency />,
        menuId: 9,
    },
]

export default CurrencyRoutes
