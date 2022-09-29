import { Button, Form, Container, Card } from "react-bootstrap";
import React from "react";
import { useState } from "react";
import logo from '../assets/image/D.png';
import "../style/style.css";
import { useHistory } from "react-router-dom";

function SignIn() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [role, setRole] = useState('');

  //login

  const handleEmailChange = e => {
    setEmail(e.target.value)
  };
  const handlePasswordChange = e => {
    setPassword(e.target.value)
  };
  const handleConfPasswordChange = e => {
    setConfPassword(e.target.value)
  };
  const handleRole = e => {
    setRole(e.target.value)
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    let item = { email ,password, confPassword, role}
    console.warn(item);
    let result = await fetch("http://localhost:3000/users", {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });
    result = await result.json()
    localStorage.setItem("user-info", JSON.stringify(result));
    history.push("/muser");
  }
  return (
    <div className="bgLogin">
      <div className="space">
        <Container>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">
                <img src={logo} alt="logo awal" className="logoD rounded-circle" />
                <div className="text-muted p-2">Dashboard</div>
                <h3>Registrasi</h3>
                <div className="text-muted p-2 mt-3">Enter your email and password below</div>

              </Card.Title>
              <Card.Body>

                <Form onSubmit={handleSubmit}>
                  <p className="has-text-centered"></p>
                  <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Label>EMAIL</Form.Label>
                    <Form.Control size="lg" type="email" placeholder="Enter email"
                      onChange={handleEmailChange} value={email} />                  
                  </Form.Group>


                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="d-flex justify-content-between">
                      <div>PASSWORD </div>
                    </Form.Label>
                    <Form.Control size="lg" type="password" placeholder="Password"
                     onChange={handlePasswordChange} value={password}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="d-flex justify-content-between">
                      <div>CONFIRM PASSWORD </div>
                    </Form.Label>
                    <Form.Control size="lg" type="password" placeholder="Password"
                     onChange={handleConfPasswordChange} value={confPassword}
                    />
                  </Form.Group>
                  <div className="mb d-grid">
                    <Button variant="primary" type="submit" className="button is-success is-fullwidth"
                    >

                      Create Account
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