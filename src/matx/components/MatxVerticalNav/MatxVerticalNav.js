import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from '@mui/material'
import {TouchRipple} from '@mui/material'
import MatxVerticalNavExpansionPanel from "./MatxVerticalNavExpansionPanel";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { generalFunction } from "app/constant/Common";
const styles = (theme) => ({
  expandIcon: {
    transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
    transform: "rotate(90deg)",
  },
  collapseIcon: {
    transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
    transform: "rotate(0deg)",
  },
});

const MatxVerticalNav = (props) => {
  let LoginCredentials = useSelector((state)=>state.login);

  console.log("Login cCredentials",LoginCredentials);
  let navigations = useSelector(({ navigations }) => navigations);
  if (localStorage.getItem("menuDetails") !== null) {
    const menus = localStorage.getItem("menuDetails");
   // const enableMenu = generalFunction.decryptedString(menus);
    //console.log(enableMenu);
    
    const apiMenu = JSON.parse(menus);
    let apiMenuLength = Object.keys(apiMenu).length;
    if (apiMenuLength > 0) {
      navigations = apiMenu;
    }
  }

  /*const splitMenu=enableMenu.split(',');
console.log(splitMenu);
if(enableMenu !="0"){

const abc=navigations.map((item,index)=>{
  if(item.subMenu=="0" && (item.menuUid=="0" || splitMenu.includes(item.menuUid))){
    //No submenu
    return item
  }else{//SubMenu
let dummyArray= new Array();
if(item.subMenu=="1"){
  //item.
}
  }
})
}*/

  const renderLevels = (data) => {
    return data.map((item, index) => {
      if (item.children) {
        return (
          <MatxVerticalNavExpansionPanel item={item} key={index}>
            {renderLevels(item.children)}
          </MatxVerticalNavExpansionPanel>
        );
      } else if (item.type === "extLink") {
        return (
          <a
            key={index}
            href={item.path}
            className="nav-item"
            rel="noopener noreferrer"
            target="_blank"
          >
            <TouchRipple key={item.name} name="child" className="w-full">
              {(() => {
                if (item.icon) {
                  return (
                    <Icon className="item-icon align-middle">{item.icon}</Icon>
                  );
                } else {
                  return (
                    <span className="item-icon icon-text">{item.iconText}</span>
                  );
                }
              })()}
              <span className="align-middle item-text">{item.name}</span>
              <div className="mx-auto"></div>
              {item.badge && (
                <div className={`badge bg-${item.badge.color}`}>
                  {item.badge.value}
                </div>
              )}
            </TouchRipple>
          </a>
        );
      } else {
        return (
          <NavLink key={index} to={item.path} className="nav-item">
            <TouchRipple key={item.name} name="child" className="w-full">
              {(() => {
                if (item.icon) {
                  return (
                    <Icon className="item-icon align-middle">{item.icon}</Icon>
                  );
                } else {
                  return (
                    <span className="item-icon icon-text">{item.iconText}</span>
                  );
                }
              })()}
              <span className="align-middle item-text">{item.name}</span>
              <div className="mx-auto"></div>
              {item.badge && (
                <div className={`badge bg-${item.badge.color}`}>
                  {item.badge.value}
                </div>
              )}
            </TouchRipple>
          </NavLink>
        );
      }
    });
  };

  return <div className="navigation">{renderLevels(navigations)}</div>;
};

export default makeStyles(styles)(MatxVerticalNav);
