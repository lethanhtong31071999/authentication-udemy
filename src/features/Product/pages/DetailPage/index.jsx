import { Box, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import LoadingPage from "components/Loading";
import { addToCart } from "features/Cart/cartSlice";
import AddCartForm from "features/Product/components/AddCartForm";
import ProductInfo from "features/Product/components/ProductInfo";
import ProductMenu from "features/Product/components/ProductMenu";
import DescriptionProduct from "features/Product/components/ProductMenu/ProductDescription.jsx";
import ProductThumnail from "features/Product/components/ProductThumnail";
import useProductDetail from "features/Product/hooks/useProductDetail";
import React from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";

DetailPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: "400px",
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },
  right: {
    padding: theme.spacing(1.5),
    borderLeft: `1px solid ${theme.palette.grey[300]}`,
    flex: 1,
  },
  pagination: {},
}));

function DetailPage(props) {
  const classes = useStyles();
  const { url } = useRouteMatch();
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const productId = match.params?.productId;

  const { product, loading } = useProductDetail(productId);
  if (loading) return <LoadingPage color="secondary" />;
  const handleSubmit = (values) => {
    console.log("id from Object: ", product.id);
    console.log("id from url: ", productId);
    if (!product) return;
    const action = addToCart({
      productId: Number.parseInt(productId) || product.id,
      product,
      quantity: values.quantity,
    });
    dispatch(action);
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumnail product={product} />
            </Grid>

            <Grid item className={classes.right}>
              <ProductInfo product={product} />
              <AddCartForm onSubmit={handleSubmit} />
            </Grid>
          </Grid>
        </Paper>

        <Box>
          <ProductMenu />
          <Paper elevation={0}>
            <Switch>
              <Route path={url} exact>
                <DescriptionProduct product={product} />
              </Route>
              <Route path={`${url}/additional`} exact>
                Additional
              </Route>
              <Route path={`${url}/reviews`} exact>
                reviews
              </Route>
            </Switch>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

export default DetailPage;
