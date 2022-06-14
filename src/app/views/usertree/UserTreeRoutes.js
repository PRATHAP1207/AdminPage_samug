import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'
const UserTreePage = Loadable(lazy(() => import('./UserTree')))

const userTreeRoutes1 = [
    {
        path: '/admin/userTree',
        element: <UserTreePage />,
        auth: authRoles.admin,
        menuId: 7,
    },
]
const menus = localStorage.getItem('menuId')
//const enableMenu = generalFunction.decryptedString(menus)
if (menus != null){
var userTreeRoutes = userTreeRoutes1.filter(function (element) {
   // console.log('enableMenu:', element)
    return menus.includes(element.menuId)
})
}
else{
    var userTreeRoutes= [];
}
export default userTreeRoutes
