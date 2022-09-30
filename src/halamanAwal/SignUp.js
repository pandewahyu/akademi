import { Button, Form, Container, Card } from "react-bootstrap";
import React from "react";
import { useState } from "react";
import logo from '../assets/image/D.png';
import "../style/style.css";
import { useHistory } from "react-router-dom";
import axios from "axios";


function SignIn() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [full_name, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('Guest');
  const [msg, setMsg] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/users/', {
      full_name: full_name,
      phone: phone,
      email: email,
      password: password,
      confPassword: confPassword,
      role: role
    }, { withCredentials: 'true' }).then(() => {
      localStorage.setItem('email', email);
      history.push("/Lform");
    }).catch((error) => {
      console.log(error)
      setMsg(error.response.data.msg)
    });
  }
  return (
    <div className="bgLogin">
      <div className="space">
        <Container className="w-40">
          <Card>
            <Card.Body>
              <Card.Title className="text-center">
                <img src={logo} alt="logo awal" className="logoD rounded-circle" />
                <div className="text-muted p-2">Dashboard</div>
                <h3>Register</h3>
                <div className="text-muted p-2 mt-3">Enter your email and password below</div>

              </Card.Title>
              <Card.Body>

                <Form onSubmit={handleSubmit}>
                  <p className="has-text-centered"></p>
                  {msg ? (
                    <div className="alert alert-danger text-center" role="alert">
                      {msg}
                    </div>)
                    : (<></>)}
                  <Form.Group className="mb-2" controlId="formBasicName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Full Name" className="formColor" required
                      onChange={(e) => setFullname(e.target.value)} value={full_name} />
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="formBasicPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="number" placeholder="Phone" className="formColor" required
                      onChange={(e) => setPhone(e.target.value)} value={phone} />
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label>EMAIL</Form.Label>
                    <Form.Control type="email" placeholder="Email Address" className="formColor" required
                      onChange={(e) => setEmail(e.target.value)} value={email} />
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="formBasicPassword">
                    <Form.Label className="d-flex justify-content-between">
                      <div>PASSWORD </div>
                    </Form.Label>
                    <Form.Control type="password" placeholder="Password" className="formColor" required
                      onChange={(e) => setPassword(e.target.value)} value={password}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 " controlId="formBasicConfPassword">
                    <Form.Label className="d-flex justify-content-between">
                      <div>CONFIRM PASSWORD </div>
                    </Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" className="formColor required"
                      onChange={(e) => setConfPassword(e.target.value)} value={confPassword}
                    />
                  </Form.Group>
                  <div className="mb-3 d-grid ">
                    <Button  type="submit" className="button btn btn-lg is-success is-fullwidth kuning"
                    > Create Account
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
}
export default SignIn;