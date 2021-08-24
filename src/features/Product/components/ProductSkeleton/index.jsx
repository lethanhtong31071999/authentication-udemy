import React from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

ProductSkeleton.propTypes = {
  length: PropTypes.number,
};

ProductSkeleton.defaultProps = {
  length: 6,
};

function ProductSkeleton(props) {
  const { length } = props;
  const skeletonList = Array.from(new Array(length));
  return (
    <Box>
      <Grid container>
        {skeletonList.map((x, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Box padding={1} margin={0}>
              <Skeleton
                variant="rect"
                width="100%"
                height={200}
                animation="wave"
              />
              <Skeleton />
              <Skeleton variant="text" width={60} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductSkeleton;
