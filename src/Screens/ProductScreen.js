import React, { useEffect, useState } from "react";
import { Link, useRouteLoaderData, useParams,useNavigate } from "react-router-dom";
import products from "../products";
import { listProductDetails } from "../actions/productActions";
import {
  Row,
  Col,
  Image,
  Button,
  ListGroup,
  Card,
  ListGroupItem,
  Form
} from "react-bootstrap";
import Rating from "../Components/Rating";
import { useDispatch, useSelector } from "react-redux";

function ProductScreen() {
  const [qty,setQty] = useState(1)
  let { productid } = useParams();
  console.log(productid)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(listProductDetails(productid))
  },[])
  let navigate = useNavigate();
  
  const addToCartHandler = ()=>{

    navigate(`/cart/${productid}?qty=${qty}`)
  }

  const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
  console.log(productDetails);
  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        {" "}
        Back
      </Link>
      {loading ? 
        'loading'
       : error ? 
        { error }
       : 
        <Row>
          <Col md={6} className="shadow-sm">
            <Image src={product.image} fluid />
          </Col>
          <Col md={3} className="shadow-sm">
            <Card varian="flush">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3> {product.name}</h3>
                </ListGroup.Item>
                <ListGroupItem>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews}`}
                    color={"#f8e825"}
                  />
                </ListGroupItem>
                <ListGroupItem>Price: {product.price}</ListGroupItem>
                <ListGroupItem>{product.description}</ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
          <Col md={3} className="shadow-sm">
            <Card varian="flush">
              <ListGroup variant="flush">
                <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>In Stock:</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                {
                  product.countInStock >0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>
                        Qty
                        </Col >
                        <Col xs='auto' className="my-1">
                        <Form.Control as="select"
                        value={qty}
                        onChange={(e)=>setQty(e.target.value)}
                        >
                          {
                            [...Array(product.countInStock).keys()].map((x)=>(
                              <option key={x+1}>
                                {x+1}</option>
                            ))
                          }

                        </Form.Control>
                        
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )
                }
                <ListGroupItem>
                  <Button
                  onClick={addToCartHandler}
                    className="shadow-sm btn btn-block w-100 btn-shadow"
                    disabled={product.countInStock < 1}
                  >
                    Add to Cart
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      }
    </div>
  );
}

export default ProductScreen;

// export async function loadProduct({request,params})
// {
//   const id = params.productid;
//   const response = await fetch("http://127.0.0.1:800/api/products/"+id);
//   const product =  await response.json();
//   return product;
// }
