import React from "react";
import PropTypes from "prop-types";
import { Box, makeStyles, Typography } from "@material-ui/core";

ProductInfo.propTypes = {
  product: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(3),
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },

  priceBox: {
    padding: theme.spacing(2),
    background: theme.palette.grey[100],
  },

  salePrice: {
    marginRight: theme.spacing(3),
    fontSize: theme.typography.h4.fontSize,
    fontWeight: "bold",
  },

  originalPrice: {
    marginRight: theme.spacing(2),
    textDecoration: "line-through",
  },

  promotionPercent: {},
}));

function ProductInfo({ product = {} }) {
  const classes = useStyles();
  const { name, shortDescription, originalPrice, salePrice, promotionPercent } =
    product;
  return (
    <Box className={classes.root}>
      <Typography variant="h3" component="h1">
        {name}
      </Typography>
      <Typography variant="body2" component="p">
        {shortDescription}
      </Typography>
      <Box className={classes.priceBox}>
        <Box className={classes.salePrice} component="span">
          {`${salePrice}d`}
        </Box>
        {promotionPercent > 0 ? (
          <>
            <Box className={classes.originalPrice} component="span">
              {`${originalPrice}d`}
            </Box>
            <Box className={classes.promotionPercent} component="span">
              {` -${promotionPercent}%`}
            </Box>
          </>
        ) : null}
      </Box>
    </Box>
  );
}

export default ProductInfo;
