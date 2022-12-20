import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";

import useStyles from "./styles";
const Cart = ({ cart }) => {
  const classes = useStyles();
  //   console.log(cart);

  //   const isEmpty = !cart.line_items.length ===0;

  const EmptyCart = () => {
    <Typography variant="subtitle1">Empty shopping cart</Typography>;
  };
  const FilledCart = () => {
    // console.log(
    //   cart.line_items.map((item) => {
    //     // console.log(item.name);
    //   })
    // );
    return (
      <>
        <Grid container spacing={3}>
          {cart.line_items.map((item) => {
            return (
              <Grid item xs={12} sm={4} key={item.id}>
                <div>{item.name}</div>

                {console.log(item.name)}
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
            >
              Empty Cart
            </Button>
            <Button
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
  if (!cart.line_items) {
    return "loading... ";
  }

  return (
    <Container>
      <div className={classes.toolbar}></div>

      <Typography className={classes.title} varaint="h3">
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
