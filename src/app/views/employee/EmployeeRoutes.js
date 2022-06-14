import React from "react";
import { authRoles } from "../../auth/authRoles";
import { generalFunction } from "app/constant/Common";
 
 const NewEmployee = React.lazy(() => import("./NewEmployee"));
 const EmployeeList = React.lazy(() => import("./EmployeeList"));
 const ProfileEdit= React.lazy(() => import("./ProfileEdit"));
 
const employeeRoutes1 = [
  {
    path: "/emp/newEmp",
   // component: React.lazy(() => import("./NewEmployee")),
    menuId: 1,
    element:<NewEmployee/>
  },
  {
    path: "/emp/empLst",
   // component: React.lazy(() => import("./EmployeeList")),
    menuId: 2,
    element:<EmployeeList/>
  },
  {
    path: "/emp/profEdit",
   // component: React.lazy(() => import("./ProfileEdit")),
    menuId: 0,
    element:<ProfileEdit/>
  },
];
const menus = localStorage.getItem("menuId");
//const enableMenu = generalFunction.decryptedString(menus);
if (menus != null){
var employeeRoutes = employeeRoutes1.filter(function (element) {
  return menus.includes(element.menuId);
});
}
else{
  var employeeRoutes= [];
}
export default employeeRoutes;