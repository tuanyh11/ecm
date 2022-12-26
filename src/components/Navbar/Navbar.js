import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import logo from "../../assets/logo.jpg";

import { Link, useLocation } from "react-router-dom";
import useStyles from "./styles";

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const localtion = useLocation();
  if (localtion.pathname === "/") {
  }
  return (
    <div>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
            color="inherit"
          >
            <img
              src={logo}
              alt="Commerce"
              height="25px"
              className={classes.image}
            />
            HPL Sports
          </Typography>
          <div className={classes.grow}></div>
          {localtion.pathname === "/" && (
            <div className={classes.button}>
              {/* <Link to="/cart">go to cart</Link> */}
              <IconButton
                component={Link}
                to="/cart"
                aria-label="Show cart items"
                color="inherit"
              >
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart></ShoppingCart>
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
