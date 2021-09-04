function useCalculateCart(cartItems = []) {
  // console.log(cartItems.length);
  const totalQuantity = cartItems.reduce(function (result, item) {
    return item.quantity + result;
  }, 0);

  const totalPrice = cartItems.reduce(function (result, item) {
    return result + item.product.salePrice * item.quantity;
  }, 0);

  console.log("CustomHook", totalQuantity, totalPrice);

  return { totalQuantity, totalPrice };
}

export default useCalculateCart;
