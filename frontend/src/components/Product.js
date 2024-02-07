import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import axios from "axios";
import { Store } from "../Store";

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    // Fix the URL string in axios.get
    const { data } = await axios.get(`/api/products/${item._id}`);

    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }

    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  return (
    <Card
      style={{
        backgroundColor: '#e3ffee',
        width: "18rem",
        margin: "20px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Link to={`/product/${product.slug}`}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10%",
          }}
        >
          <img
            src={product.image}
            className="card-img-top"
            alt={product.name}
            style={{ height: "240px", width: "240px", objectFit: "cover" }}
          />
        </div>
      </Link>

      <Card.Body className="d-flex flex-column align-items-center">
        <Card.Title
          style={{ textAlign: "center", fontSize: "1.2em", fontWeight: "bold" }}
        >
          {product.name}
        </Card.Title>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text
          style={{ fontSize: "1.2em", fontWeight: "bold", marginTop: "8px" }}
        >
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(product.price)}
        </Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled style={{ marginTop: "10px" }}>
            Out of stock
          </Button>
        ) : (
          <Button
            onClick={() => addToCartHandler(product)}
            style={{
              backgroundColor: "#004225",
              marginTop: "10px",
              color: "white",
              border: "none",
            }}
          >
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;
