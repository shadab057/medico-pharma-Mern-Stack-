import React, { useContext } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import MessageBox from "../components/MessageBox";

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
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

  const removeItemHandler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <div style={{ padding: "20px" }}>
      <Helmet>
        <title>Cart</title>
      </Helmet>

      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
        <span style={{ fontSize: "20px", marginRight: "10px" }}>
          <FontAwesomeIcon icon={faShoppingCart} />
        </span>
        Cart
      </h1>

      <Row>
        <Col md={14}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">buy medicine</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item
                  key={item._id}
                  style={{
                    marginBottom: "15px",
                    padding: "15px",
                    border: "1px solid #dee2e6",
                    borderRadius: ".25rem",
                  }}
                >
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                      <Link
                        to={`/product/${item.slug}`}
                        style={{
                          textDecoration: "none",
                          color: "#212529",
                          marginTop: "10px",
                          display: "block",
                          fontSize: "18px",
                        }}
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col
                      md={3}
                      style={{
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        variant="light"
                        disabled={item.quantity === 1}
                        style={{
                          backgroundColor: "#17a2b8",
                          border: "none",
                          marginRight: "10px",
                        }}
                      >
                        <span
                          style={{
                            color: "#fff",
                            padding: "5px 10px",
                            borderRadius: "50%",
                          }}
                        >
                          -
                        </span>
                      </Button>{" "}
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          margin: "5px 0",
                        }}
                      >
                        {item.quantity}
                      </span>{" "}
                      <Button
                        variant="light"
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        disabled={item.quantity === item.countInStock}
                        style={{
                          backgroundColor: "#28a745",
                          border: "none",
                          marginLeft: "10px",
                        }}
                      >
                        <span
                          style={{
                            color: "#fff",
                            padding: "5px 10px",
                            borderRadius: "50%",
                          }}
                        >
                          +
                        </span>
                      </Button>
                    </Col>
                    <Col
                      md={3}
                      style={{
                        textAlign: "center",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(item.price)}
                    </Col>
                    <Col
                      md={2}
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant="light"
                        style={{ color: "#dc3545", border: "none" }}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        </Row>
        <Row >
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3
                    style={{
                      marginBottom: "0",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                    items):{" "}
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                    }).format(
                      cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
                    )}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item style={{ textAlign: "center" }}>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                      style={{
                        fontSize: "18px",
                        padding: "10px",
                        backgroundColor: "#f1c40f",
                        color:"#000",
                        border: "none",
                      }}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Row>
      
    </div>
  );
}
