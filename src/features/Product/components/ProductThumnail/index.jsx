import React from "react";
import PropTypes from "prop-types";
import { Box, makeStyles } from "@material-ui/core";
import { PLACEHOLDER_IMG, STATIC_HOST } from "constanst/common";

ProductThumnail.propTypes = {
  product: PropTypes.object,
};

ProductThumnail.defaultProps = {
  product: {},
};

const useStyles = makeStyles();

function ProductThumnail(props) {
  const { product } = props;
  const classes = useStyles();
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : PLACEHOLDER_IMG;
  return (
    <Box>
      <img src={thumbnailUrl} alt={product?.name} width="100%" />
    </Box>
  );
}

export default ProductThumnail;
