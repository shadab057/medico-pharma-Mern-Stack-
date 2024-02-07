import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import ReCAPTCHA from 'react-google-recaptcha';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import Axios from 'axios';

export default function SigninScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!recaptchaValue) {
      toast.error('Please complete the reCAPTCHA verification');
      return;
    }

    try {
      const { data } = await Axios.post('/api/users/signin', {
        email,
        password,
        recaptchaValue,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container style={{ maxWidth: '400px', margin: 'auto', paddingTop: '50px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#f9f9f9' }}>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign In</h1>
      <Form style={{ padding: '0 20px', marginBottom: '20px' }} onSubmit={submitHandler}>
        <Form.Group controlId="email" style={{ marginBottom: '15px' }}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password" style={{ marginBottom: '15px' }}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group style={{ marginBottom: '15px' }}>
          <ReCAPTCHA
            sitekey="6Lf7eyQpAAAAABP44pO0L6bvtrOV5FnLLk1kGIrR"
            onChange={(value) => setRecaptchaValue(value)}
          />
        </Form.Group>
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <Button type="submit" style={{ backgroundColor: '#28a745', border: 'none' }}>Sign In</Button>
        </div>
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          New customer?{' '}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
        <div style={{ textAlign: 'center' }}>
          Forget Password? <Link to={`/forget-password`}>Reset Password</Link>
        </div>
      </Form>
    </Container>
  );
}
