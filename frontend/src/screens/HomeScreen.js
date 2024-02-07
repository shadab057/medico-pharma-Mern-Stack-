import { useEffect, useReducer } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Footer from '../components/Footer';
// import data from '../data';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });
  const handleLike = (product) => {
    // Implement your logic to update the product with a like
    // You may want to make an API call to update the backend
    console.log('Liked:', product.name);
  };

  const handleDislike = (product) => {
    // Implement your logic to update the product with a dislike
    // You may want to make an API call to update the backend
    console.log('Disliked:', product.name);
  };

  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <>
      <div>
        <Helmet>
          <title>LifeCare</title>
        </Helmet>
        
        <h1>Tablets</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox style={{ color: 'red' }} variant="danger">
              {error}
            </MessageBox>
          ) : (
            <Row style={{ justifyContent: 'center' }}>
              {products.map((product) => (
                <Col
                  key={product.slug}
                  style={{ marginBottom: '15px' }}
                  sm={6}
                  md={4}
                  lg={3}
                >
                  <Product
                    product={product}
                    style={{ border: '1px solid #ccc', padding: '10px' }}
                  />
                </Col>
              ))}
            </Row>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}
export default HomeScreen;
