import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';

import { signin } from '../actions/userActions';

export default function SigninScreen() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redireactURL = new URLSearchParams(search).get('redirect');
  const redirect = redireactURL ? redireactURL : '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading } = userSignin;

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <Container className="small-container">
        <h1 className="my-3">Sign In</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="mb-3">
            <Button type="submit">Sign In</Button>
            {loading && <LoadingBox />}
          </div>
          <div className="mb-3">
            New customer?{' '}
            <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
          </div>
        </Form>
      </Container>
    </div>
  );
}
