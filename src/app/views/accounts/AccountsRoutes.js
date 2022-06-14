import React from "react";
//import { authRoles } from "../../auth/authRoles";
import { generalFunction } from "app/constant/Common";
const PayoutList = React.lazy(()  => import("./payout/payoutList"));
const PayinList = React.lazy(()  => import("./payout/payinList"));
const BankKycList = React.lazy(()  => import("./bankKyc/bankKycList"));

const accountsRoutes1 = [
  {
    path: "/acc/payoutlist",
   // component: React.lazy(() => import("./payout/payoutList")),
   menuId: 3,
   element:<PayoutList/>
    
  },
  {
    path: "/acc/payinList",
  //  component: React.lazy(() => import("./payout/payinList")),
  menuId: 4,
  element:<PayinList/>
  
  },
  {
    path: "/acc/bankKycList",
   // component: React.lazy(() => import("./bankKyc/bankKycList")),
   menuId: 5,
   element:<BankKycList/>
  },
];
const menus = localStorage.getItem("menuId");
//console.log("menu String",menus); 
//const enableMenu = generalFunction.decryptedString(menus);
if (menus != null){
var accountsRoutes = accountsRoutes1.filter(function (element) {
  return menus.includes(element.menuId);
});
}
else{
  var accountsRoutes= [];
}

export default accountsRoutes;