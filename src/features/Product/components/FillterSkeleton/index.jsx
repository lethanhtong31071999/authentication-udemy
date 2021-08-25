import React from "react";
import PropTypes from "prop-types";
import { Box, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

FillterSkeleton.propTypes = {};

const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },

  category: {
    padding: theme.spacing(2),
    height: theme.spacing(35),
  },

  price: {
    padding: theme.spacing(2),
    height: theme.spacing(35),

    "& .action": {
      display: "flex",
      justifyContent: "space-between",
    },
  },
}));

function FillterSkeleton(props) {
  const classes = useStyle();
  return (
    <Box className={classes.root}>
      <Box className={classes.category}>
        <Skeleton variant="text" width="100%" animation="wave" />
        <Skeleton variant="text" width={80} />
        <Skeleton variant="text" width={80} />
        <Skeleton variant="text" width={80} />
        <Skeleton variant="text" width={80} />
        <Skeleton variant="text" width={80} />
        <Skeleton variant="text" width={80} />
      </Box>

      <Box className={classes.price}>
        <Skeleton variant="text" width="100%" animation="wave" />
        <Skeleton variant="text" width={40} />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width={40} />
        <Skeleton variant="text" width="80%" />
        <Box className="action">
          <Skeleton variant="text" width={60} height="40px" />
          <Skeleton variant="text" width={60} height="40px" />
        </Box>
      </Box>
    </Box>
  );
}

export default FillterSkeleton;
