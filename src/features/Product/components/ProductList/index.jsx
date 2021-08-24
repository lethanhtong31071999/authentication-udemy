import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, makeStyles } from "@material-ui/core";
import ProductItem from "../ProductItem";

ProductList.propTypes = {
  data: PropTypes.array,
};

ProductList.defaultProps = {
  data: [],
};

const useStyle = makeStyles({
  "product-card": {
    alignItems: "stretch",
  },
  "product-item": {
    minHeight: "200px",
  },
});

function ProductList(props) {
  const { data } = props;
  const classes = useStyle();
  return (
    <Box>
      <Grid container className={classes["product-card"]}>
        {data.map((product) => (
          <Grid
            item
            key={product.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className={classes["product-item"]}
          >
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductList;
