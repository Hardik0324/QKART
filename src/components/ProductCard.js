import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
  Grid,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  // console.log(product)
  return (
    <Grid item xs={6} md={3} className="prodList">
      <Card className="card">
        <CardMedia
          sx={{ height: 240}}
          component="img"
          src={product.image}
          alt={product.name}
        />
        <CardContent>
          <Typography component="div">
            {product.name}
          </Typography>
          <Typography component="div">
            <b>${product.cost}</b>
          </Typography>
          <Rating name="size-medium" defaultValue={product.rating} readOnly/>
        </CardContent>
        <CardActions>
          <Button className="addbut" variant="contained"><AddShoppingCartOutlined/> ADD TO CART</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductCard;


