import React, { useEffect, useReducer, useState } from "react";
import {  useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { Helmet } from "react-helmet-async";
import { Row, Col, Spinner } from 'react-bootstrap';
//import Rating from "../components/Rating";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Button from "react-bootstrap/Button";
import Product from "../components/Product";
//import LinkContainer from "react-router-bootstrap/LinkContainer";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

// const prices = [
//   {
//     name: "$1 to $50",
//     value: "1-50",
//   },
//   {
//     name: "$51 to $200",
//     value: "51-200",
//   },
//   {
//     name: "$201 to $1000",
//     value: "201-1000",
//   },
// ];

// export const ratings = [
//   {
//     name: "4stars & up",
//     rating: 4,
//   },
//   {
//     name: "3stars & up",
//     rating: 3,
//   },
//   {
//     name: "2stars & up",
//     rating: 2,
//   },
//   {
//     name: "1stars & up",
//     rating: 1,
//   },
// ];

export default function SearchScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search); // /search?category=Shirts
  const category = sp.get("category") || "all";
  const query = sp.get("query") || "all";
  const price = sp.get("price") || "all";
  const rating = sp.get("rating") || "all";
  const order = sp.get("order") || "newest";

  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        let productData;

        // Search by product name and category
        const productResponse = await axios.get(
          `/api/products/search?query=${query}`
        );

        if (productResponse.data.products.length > 0) {
          productData = productResponse.data;
        } else {
          // If no results by product name and category, try searching only by category
          const categoryResponse = await axios.get(
            `/api/products/search?category=${query}`
          );
          productData = categoryResponse.data;
        }

        dispatch({ type: "FETCH_SUCCESS", payload: productData });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };

    fetchData();
  }, [category, query]);

  
  
  
  // const [categories, setCategories] = useState([]);
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const { data } = await axios.get(`/api/products/categories`);
  //       setCategories(data);
  //     } catch (err) {
  //       toast.error(getError(err));
  //     }
  //   };
  //   fetchCategories();
  // }, [dispatch]);

  // const getFilterUrl = (filter) => {
  //   const filterCategory = filter.category || category;
  //   const filterQuery = filter.query || query;
  //   const filterRating = filter.rating || rating;
  //   const filterPrice = filter.price || price;
  //   const sortOrder = filter.order || order;
  //   return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}`;
  // };

  return (
    <div>
      <Helmet>
        <title>Search Foods</title>
      </Helmet>
      <Row>
        <Col md={9}>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <Row className="justify-content-between mb-3">
                <Col md={10}>
                  <div>
                    {products.length > 0 ? (
                      <p>Search medicine is not availabe, suggesting alternative medicine </p>
                    ) : (
                      <>
                        {products.length} Results
                        {query !== "all" && " : " + query}
                        {category !== "all" && " : " + category}
                        {price !== "all" && " : Price " + price}
                        {rating !== "all" && " : Rating " + rating + " & up"}
                        {query !== "all" ||
                        category !== "all" ||
                        rating !== "all" ||
                        price !== "all" ? (
                          <Button
                            variant="light"
                            onClick={() => navigate("/search")}
                          >
                            <i className="fas fa-times-circle"></i>
                          </Button>
                        ) : null}
                      </>
                    )}
                  </div>
                </Col>
              </Row>
              {products.length > 0 && (
                <Row>
                  {products.map((product) => (
                    <Col sm={6} lg={4} className="mb-3" key={product._id}>
                      <Product product={product}></Product>
                    </Col>
                  ))}
                </Row>
              )}
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}
              
