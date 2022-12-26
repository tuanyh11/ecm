import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";

import useStyles from "./styles";

import { AddShoppingCart } from "@material-ui/icons";
const Product = ({ product, onAddToCart }) => {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={product.image.url}
          title={product.name}
        ></CardMedia>
        <CardContent>
          <div className={classes.CardContent}>
            <Typography variant="h5" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="h5">
              {product.price.formatted_with_symbol}
            </Typography>
          </div>
          <Typography
            dangerouslySetInnerHTML={{ __html: product.description }}
            variant="body2"
            color="textSecondary"
          ></Typography>
        </CardContent>
        <CardActions disableSpaceing className={classes.cardActions}>
          <IconButton
            arial-label="Add to Cart"
            onClick={() => onAddToCart(product.id, 1)}
          >
            <AddShoppingCart></AddShoppingCart>
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default Product;
