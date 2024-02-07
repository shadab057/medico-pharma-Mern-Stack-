import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import ReCAPTCHA from 'react-google-recaptcha'; // Make sure to import the ReCAPTCHA component

export default function SignupScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState(null); // Added state for reCAPTCHA value

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    // Check if reCAPTCHA is validated.
    if (!recaptchaValue) {
      toast.error('Please complete the reCAPTCHA verification');
      return;
    }

    // Check if passwords match.
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const { data } = await Axios.post('/api/users/signup', {
        name,
        email,
        password,
        recaptcha: recaptchaValue, // Include the reCAPTCHA value in the request.
      });

      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const formStyle = {
    maxWidth: '400px',
    margin: 'auto',
    paddingTop: '50px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  };

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '20px',
  };

  const buttonStyle = {
    backgroundColor: '#28a745',
    border: 'none',
  };

  const linkStyle = {
    marginBottom: '20px',
    textAlign: 'center',
  };

  return (
    <Container style={formStyle} className="small-container">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 style={headingStyle} className="my-3">
        Sign Up
      </h1>
      <Form onSubmit={submitHandler}>
        <Form.Group style={{ marginBottom: '15px' }} controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={(e) => setName(e.target.value)} required />
        </Form.Group>

        <Form.Group style={{ marginBottom: '15px' }} controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group style={{ marginBottom: '15px' }} controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Form.Group style={{ marginBottom: '15px' }} controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" required onChange={(e) => setConfirmPassword(e.target.value)} />
        </Form.Group>

        {/* Add the ReCAPTCHA component */}
        <ReCAPTCHA
          sitekey="6Lf7eyQpAAAAABP44pO0L6bvtrOV5FnLLk1kGIrR"
          onChange={(value) => setRecaptchaValue(value)}
        />

        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <Button type="submit" style={buttonStyle}>
            Sign Up
          </Button>
        </div>

        <div style={linkStyle} className="mb-3">
          Already have an account?{' '}
          <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
        </div>
      </Form>
    </Container>
  );
}