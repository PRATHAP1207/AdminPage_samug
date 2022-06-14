import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const Upload = Loadable(lazy(() => import('./Upload')))

const UploadRoutes = [
    {
        path: '/Upload',
        element: <Upload/>,
        menuId: 8,
      
    },
]

export default UploadRoutes