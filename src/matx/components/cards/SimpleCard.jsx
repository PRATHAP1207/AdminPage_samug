import React from "react";
import { Card } from '@mui/material'
import { classList } from "../../../app/utils/utils";

const SimpleCard = ({ children, title, subtitle, icon }) => {
  return (
    <Card elevation={6} className="px-6 py-5 h-full">
      <div
        className={
          classList({
          "card-title": true,
          "mb-4": !subtitle,
           //paddingLeft:"60px"
        })}
        style={{paddingLeft:"50px"}}

      >
        
        {title}
      </div>
      {subtitle && <div className="card-subtitle mb-4">{subtitle}</div>}
      {children}
    </Card>
  );
};

export default SimpleCard;
