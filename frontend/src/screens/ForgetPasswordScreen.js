import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ForgetPasswordScreen() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState('');

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!recaptchaValue) {
        toast.error('Please complete the reCAPTCHA verification');
        return;
      }

      const { data } = await Axios.post('/api/users/forget-password', {
        email,
        recaptchaValue,
      });
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response ? err.response.data.message : 'Something went wrong');
    }
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <h1 className="my-3">Forget Password</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
         
          <ReCAPTCHA
            sitekey="6Lf7eyQpAAAAABP44pO0L6bvtrOV5FnLLk1kGIrR"
            onChange={(value) => setRecaptchaValue(value)}
          />
        </Form.Group>

        <div className="mb-3">
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    </Container>
  );
}
