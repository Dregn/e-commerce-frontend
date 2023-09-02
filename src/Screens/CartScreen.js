import React, { useEffect, useState } from "react";
import {
  ListGroupItem,
  ListGroup,
  Col,
  Row,
  Form,
  Image,
  Button,
  Card,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link ,useLocation} from "react-router-dom";
import { addTocart,removeFromCart } from "../actions/cartActions";
function CartScreen() {
  const { productid } = useParams();
  
const location = useLocation();
const qty = location.search?Number(location.search.split('=')[1]):0



console.log(location.search)
  const dispatch = useDispatch();
  useEffect(() => {
    if (productid) {
      dispatch(addTocart(productid, qty));
    }
  }, [dispatch, productid, qty]);

  const removeFromCartHandler = (productid) => {
    dispatch(removeFromCart(productid));
  };

  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems);
  return (
    <Row>
      <Col md={6}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div>
            {" "}
            Your cart is empty
            <Link to="/Home">Home</Link>
          </div>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => {
              return (
                <ListGroupItem key={item.productid}>
                  <Row>
                    <Col className="align-self-center" md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col className="align-self-center" md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col className="align-self-center" md={2}>
                      {item.price}
                    </Col>
                    <Col className="align-self-center" md={3}>
                      <Form.Control
                        as="select"
                        className="mx-3 align-self-center"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addTocart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1}>{x + 1}</option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={1}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <h2>
              {" "}
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              items
            </h2>
            $
            {cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toFixed(2)}
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;
