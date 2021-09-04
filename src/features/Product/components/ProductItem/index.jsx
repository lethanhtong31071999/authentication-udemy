import { Box, makeStyles, Typography } from "@material-ui/core";
import { PLACEHOLDER_IMG, STATIC_HOST } from "constanst/common";
import PropTypes from "prop-types";
import React from "react";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
  const { product } = props;
  const productImgUrl = product.thumbnail?.url;
  const imgUrl = productImgUrl
    ? `${STATIC_HOST}${productImgUrl}`
    : PLACEHOLDER_IMG;

  const handleOnClick = (e) => {
    history.push(`/products/${product?.id}`);
  };

  return (
    <Box padding={1} className={classes.root}>
      <Box
        padding={1}
        style={{ cursor: "pointer" }}
        onClick={(e) => handleOnClick(e)}
      >
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
