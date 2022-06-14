import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const MessageTypes = Loadable(lazy(() => import('./MessageTypes')))

const MessagesRoutes = [
    {
        path: '/MessageTypes',
        element: <MessageTypes/>,
        menuId: 9,
      
    },
]

export default MessagesRoutes