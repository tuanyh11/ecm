import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import CartItem from "./CartItem/CartItem";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "../../api";

const Cart = ({
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  const classes = useStyles();

  const EmptyCart = () => (
    // console.log(cart.line_items + "EmptyCart");
    <Typography variant="subtitle1">
      Empty shopping cart,
      <Link to="/" className={classes.link}>
        Back to Home
      </Link>
    </Typography>
  );


  const {data: cart} = useQuery({
    queryKey: ['get-cart'],
    queryFn: getCartItems,
    refetchOnWindowFocus: false,
  })


  const FilledCart = () => {
    // {
    //   console.log(cart.line_items.length);
    // }

    console.log(cart);

    return (
      <>
        <Grid container spacing={3}>
          {cart.line_items.map((item) => {
            return (
              <Grid item xs={12} sm={4} key={item.id}>
                <CartItem
                  item={item}
                  onUpdateCartQty={handleUpdateCartQty}
                  onRemoveFromCart={handleRemoveFromCart}
                ></CartItem>
              </Grid>
            );
          })}
        </Grid>
        <div className={classes.cardDetails}>
          <Typography variant="h4">
            SubTotal: {cart.subtotal.formatted_with_symbol}
          </Typography>
          <div>
            <Button
              className={classes.emptyButton}
              size="large"
              type="button"
              variant="contained"
              color="secondary"
              onClick={handleEmptyCart}
            >
              Empty Cart
            </Button>
            <Button
              component={Link}
              to="/checkout"
              className={classes.checkoutButton}
              size="large"
              type="button"
              variant="contained"
              color="primary"
            >
              Checkout
            </Button>
          </div>
        </div>
      </>
    );
  };
  if (!cart?.line_items) {
    return (
      <div>
        {console.log(cart + "loading")}
        {console.log("loading... ")}
      </div>
    );
  }

  return (
    <Container>
      <div className={classes.toolbar}></div>

      <Typography className={classes.title} varaint="h3">
        Your Shopping Cart
      </Typography>
      {cart?.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
