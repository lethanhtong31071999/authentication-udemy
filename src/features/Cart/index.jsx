import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import ProductInfo from "features/Product/components/ProductInfo";
import ProductThumnail from "features/Product/components/ProductThumnail";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFormCart } from "./cartSlice";
import useCalculateCart from "./hooks/useCalculateCart";

CartFeature.propTypes = {};

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

function CartFeature(props) {
  const classes = useStyles();
  const state = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const { totalPrice, totalQuantity } = useCalculateCart(state.cartItems);
  console.log("Cart", totalQuantity, totalPrice);

  const handleRemoveItem = (productId) => {
    console.log(productId);
    const action = removeItemFormCart(productId);
    dispatch(action);
  };

  return (
    <Box>
      <Container>
        <Typography
          variant="h5"
          component="h2"
          style={{ margin: "1rem 0 0.5rem" }}
        >
          Giỏ hàng
          <Typography
            variant="body2"
            component="span"
            style={{ color: grey[500] }}
          >
            ({totalQuantity} sản phẩm)
          </Typography>
        </Typography>
        {state.cartItems.map((item) => (
          <Paper
            key={item.productId}
            elevation={0}
            style={{ marginBottom: "1rem", borderRadius: "15px" }}
          >
            <Grid container>
              <Grid item className={classes.left}>
                <ProductThumnail product={item.product} />
              </Grid>

              <Grid item className={classes.right}>
                <ProductInfo product={item.product} />
                <Box>
                  {/* <QuantityField form={{}} name="quantity" /> */}
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleRemoveItem(item.productId)}
                  >
                    Xóa
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Container>
    </Box>
  );
}

export default CartFeature;
