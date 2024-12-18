import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import uuid from 'uuid/v1';
import { makeStyles } from "@mui/styles";
import * as colors from  '@mui/material/colors'
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center'
  },
  starIcon: {
    fontSize: 18,
    height: 18,
    width: 18
  },
  starFilledIcon: {
    color: colors.amber[400]
  },
  starBorderIcon: {
    color: theme.palette.icon
  }
}));

const ReviewStars = props => {
  const { value, starCount, className, ...rest } = props;

  const classes = useStyles();
  const starNodes = [];

  for (let i = 1; i <= starCount; i++) {
    const key = uuid();

    const starNode =
      i <= value ? (
        <StarIcon
          className={clsx(classes.starIcon, classes.starFilledIcon)}
          key={key}
        />
      ) : (
        <StarBorderIcon
          className={clsx(classes.starIcon, classes.starBorderIcon)}
          key={key}
        />
      );

    starNodes.push(starNode);
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      {starNodes}
    </div>
  );
};

ReviewStars.propTypes = {
  className: PropTypes.string,
  starCount: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

ReviewStars.defaultProps = {
  value: 0,
  starCount: 5
};

export default ReviewStars;
