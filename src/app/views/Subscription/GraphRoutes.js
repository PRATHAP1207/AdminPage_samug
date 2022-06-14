import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
//import Graph from "./Graph"

const Graph = Loadable(lazy(() => import('./Graph')))

const GraphRoutes = [
    {
        path: '/Graph',
        element: <Graph/>,
        menuId: 7,
      
    },
]

export default GraphRoutes