import React from "react";
import { Grid, LinearProgress, Typography } from  '@mui/material'
import { makeStyles } from "@mui/styles";

const CustomLinearProgress = makeStyles(theme => ({
  root: {
    borderRadius: 2,
    background: "rgba(0, 0, 0, 0.1)"
  }
}))(LinearProgress);

const MatxProgressBar = ({
  value = 75,
  color = "primary",
  text = "",
  spacing = 2,
  coloredText = false,
  className
}) => {
  return (
    <Grid container spacing={spacing} alignItems="center" className={className}>
      <Grid item xs={text ? 8 : 12}>
        <CustomLinearProgress
          color={color}
          value={value}
          variant="determinate"
        ></CustomLinearProgress>
      </Grid>
      {text !== "" && (
        <Grid item xs={text ? 4 : false}>
          <Typography color={color}>
            <small className={`${coloredText ? "" : "text-muted"}`}>
              {text}
            </small>
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default MatxProgressBar;
