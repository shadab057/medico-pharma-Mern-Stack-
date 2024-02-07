import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaEye, FaPlus } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return {
        ...state,
        loadingCreate: false,
      };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };

    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false, successDelete: false };

    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

const ProductListScreen = () => {
  const [
    {
      loading,
      error,
      products,
      pages,
      loadingCreate,
      loadingDelete,
      successDelete,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get('page') || 1;

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/products/admin?page=${page}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
  
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        console.error(err);
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
  
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  },  [page, userInfo, successDelete]);

  const createHandler = async () => {
    if (window.confirm('Are you sure to create?')) {
      console.log('User confirmed to create');
      try {
        dispatch({ type: 'CREATE_REQUEST' });
        const { data } = await axios.post('/api/products', {}, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
  
        toast.success('Fill the details ');
        dispatch({ type: 'CREATE_SUCCESS' });
        navigate(`/admin/product/${data.product._id}`);
      } catch (err) {
        toast.error(getError(err));
        dispatch({ type: 'CREATE_FAIL' });
      }
    }
  };
  

  const deleteHandler = async (product) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        await axios.delete(`/api/products/${product._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        toast.success('Product deleted successfully');
        dispatch({ type: 'DELETE_SUCCESS' });
      } catch (err) {
        toast.error(getError(err));
        dispatch({ type: 'DELETE_FAIL' });
      }
    }
  };

  return (
    <div>
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="col text-end">
          <div>
            <Button
              type="button"
              onClick={createHandler}
              style={{
                backgroundColor: '##ecf0f1',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              <FaPlus style={{ marginRight: '5px' }} className="icon" />
            </Button>
          </div>
        </Col>
      </Row>

      {loadingCreate && <LoadingBox></LoadingBox>}
      {loadingDelete && <LoadingBox></LoadingBox>}

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left', backgroundColor: '#3498db' }}>ID</th>
                <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left', backgroundColor: '#3498db' }}>NAME</th>
                <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left', backgroundColor: '#3498db' }}>PRICE</th>
                <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left', backgroundColor: '#3498db' }}>CATEGORY</th>
                <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left', backgroundColor: '#3498db' }}>VARIETY</th>
                <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left', backgroundColor: '#3498db' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>{product._id}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>{product.name}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>₹{product.price}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>{product.category}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>{product.brand}</td>
                  <td>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => navigate(`/admin/product/${product._id}`)}
                      style={{ marginRight: '5px', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      <FaEdit style={{ marginRight: '5px' }} className="action-icon" />
                    </Button>
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => deleteHandler(product)}
                      style={{ marginRight: '5px', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      <FaTrashAlt style={{ marginRight: '5px' }} className="action-icon" />
                    </Button>
                    <Button
                      type="button"
                      variant="info"
                      onClick={() => navigate(`/admin/product/${product._id}`)}
                      style={{ marginRight: '5px', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      <FaEye style={{ marginRight: '5px' }} className="action-icon" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === Number(page) ? 'btn text-bold' : 'btn'}
                key={x + 1}
                to={`/admin/products?page=${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </>
        
      )}
    </div>
  );
};

export default ProductListScreen;
