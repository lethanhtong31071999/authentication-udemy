import React from "react";
import PropTypes from "prop-types";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { PLACEHOLDER_IMG, STATIC_HOST } from "constanst/common";

ProductItem.propTypes = {
  product: PropTypes.object,
};

ProductItem.defaultProps = {
  product: {},
};

const useStyle = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
});

function ProductItem(props) {
  const classes = useStyle();
  const { product } = props;
  const productImgUrl = product.thumbnail?.url;
  const imgUrl = productImgUrl
    ? `${STATIC_HOST}${productImgUrl}`
    : PLACEHOLDER_IMG;
  return (
    <Box padding={1} className={classes.root}>
      <Box padding={1}>
        <img src={imgUrl} alt={product.name} width="100%" />
      </Box>
      <Box marginTop="auto">
        <Typography variant="body2">{product.name}</Typography>
        <Typography variant="body2">
          <Box component="span" fontSize="16px" fontWeight="bold" margin={1}>
            {product.salePrice}
          </Box>
          {product.promotionPercent > 0
            ? ` -${product.promotionPercent}%`
            : null}
        </Typography>
      </Box>
    </Box>
  );
}

export default ProductItem;
