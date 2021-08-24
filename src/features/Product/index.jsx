import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import { Box } from "@material-ui/core";
import ListPage from "./pages/ListPage/ListPage";

ProductFeature.propTypes = {};

function ProductFeature(props) {
  const match = useRouteMatch();
  return (
    <Box paddingTop={4}>
      <Switch>
        <Route path={match.url} component={ListPage} />
      </Switch>
    </Box>
  );
}

export default ProductFeature;
