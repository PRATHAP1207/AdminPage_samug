import React from "react";
import { generalFunction } from "app/constant/Common";
const ModetatorList = React.lazy(() => import("./ModetatorList"));
const UserProfile = React.lazy(() => import("./userProfile"));

const moderatorRoutes1 = [
  {
    path: "/mod/post",
    //component: React.lazy(() => import("./ModetatorList")),
    menuId: 6,
    element:<ModetatorList/>
  },
  {
    path: "/mod/prof",
  //  component: React.lazy(() => import("./userProfile")),
    menuId: 0,
    element:<UserProfile/>
  },
  ];
const menus = localStorage.getItem("menuId");
//const enableMenu = generalFunction.decryptedString(menus);
if (menus != null){
var moderatorRoutes = moderatorRoutes1.filter(function (element) {
  return menus.includes(element.menuId);
});
}else{
  var moderatorRoutes= [];
}


export default moderatorRoutes;
