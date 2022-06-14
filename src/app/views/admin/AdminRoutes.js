import React from "react";
//import { authRoles } from "../../auth/authRoles";
import { generalFunction } from "app/constant/Common";
//import Loadable from "app/components/Loadable/Loadable";
const RoleMenu = React.lazy(() => import("./roleMenu"));



const adminRoutes1 = [
  {
    path: "/admin/roleMenu",
    // component: React.lazy(() => import("./roleMenu")),
    menuId: 0,
    element:<RoleMenu/>
  },
];
const menus = localStorage.getItem("menuId");
//const enableMenu = generalFunction.decryptedString(menus);
//console.log("jdjd",enableMenu)
if (menus != null){
var adminRoutes = adminRoutes1.filter(function (element) {
  return  menus.includes(element.menuId);
});
}else{
  var adminRoutes= [];
}
//console.log("adminnnnn",adminRoutes)
export default adminRoutes;
