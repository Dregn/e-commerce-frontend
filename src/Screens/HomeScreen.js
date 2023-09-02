import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../Components/Product";
import { useRouteLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

function HomeScreen() {
 // const products = useRouteLoaderData("root");

  const dispatch = useDispatch();
useEffect(()=>{

  dispatch(listProducts);
},[])


const productsList= useSelector(state=>state.productList)
const {error, loading, products}=productsList

  return (
    <div>
      <h1>Lastest Products</h1>
      {loading ? <h3>Loading...</h3>:error ? <>{error}</> :
      <Row>
      {products.map((product) => (
        <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="border border-grey p-2 m-3">
          <Product product={product}></Product>
        </Col>
      ))}
    </Row>
      }
      
    </div>
  );
}

export default HomeScreen;

export async function loadProducts() {
  
  let response = await fetch("http://127.0.0.1:800/api/products/");
  const products = await response.json();
  return products;
}
