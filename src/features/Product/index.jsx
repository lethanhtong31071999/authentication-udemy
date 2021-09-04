import { Box } from "@material-ui/core";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import ListPage from "./pages/ListPage/ListPage";

ProductFeature.propTypes = {};

function ProductFeature(props) {
  const match = useRouteMatch();

  return (
    <Box paddingTop={4}>
      <Switch>
        <Route exact path={match.url} component={ListPage} />
        <Route path={`${match.url}/:productId`}>
          <DetailPage />
        </Route>
      </Switch>
    </Box>
  );
}

export default ProductFeature;
