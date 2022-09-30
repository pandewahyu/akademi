import { Form, Container, Button, Card, Modal, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import logo from '../assets/image/D.png';
import "../style/style.css";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

function Forget() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');
    //login
    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/Forget-password/', {
            email: email,
            password: password,
        }, { withCredentials: 'true' }).then(() => {
            localStorage.setItem('email', email);
            history.push("/mstaff");
        }).catch((error) => {
            console.log(error)
            setMsg(error.response.data.msg)
        });
    }


    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    }
    const handleBuka = () => setOpen(true);
    const insertData = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/users/', {
            password: password,
            confPassword: confPassword,
        }, { withCredentials: 'true' }).then(() => {
            handleClose();
        }).catch((error) => {
            setError(error.response.data.msg);
        });
    };

    return (
        <div className="bgLogin">
            <div className="space">
                <Container className="w-40">
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center">
                                <img src={logo} alt="logo awal" className="logoD rounded-circle" />
                                <div className="text-muted p-2">Dashboard</div>
                                <h3>Forget Password</h3>
                                <div className="text-muted p-2 mt-3">Enter your email below</div>
                            </Card.Title>
                            <Card.Body>
                                <Form >
                                    <p className="has-text-centered"></p>
                                    {msg ? (
                                        <div className="alert alert-danger text-center" role="alert">
                                            {msg}
                                        </div>)
                                        : (<></>)}

                                    <Form.Group className="mb-4" controlId="formBasicEmail">
                                        <Form.Label>EMAIL</Form.Label>
                                        <Form.Control size="lg" type="email" placeholder="Email address" className="formColor"
                                            required onChange={(e) => setEmail(e.target.value)} />
                                    </Form.Group>
                                    <div className="d-grid" style={{ marginBottom: "230px" }}>
                                        <Button style={{ background: '#F0A500' }} className=" button btn btn-lg is-success coba is-fullwidth kuning"
                                            onClick={() => handleBuka(email)}>
                                            Enter
                                        </Button>
                                    </div>

                                </Form>
                            </Card.Body>
                        </Card.Body>
                    </Card>
                    <Modal //modal tambah
                        show={open}
                        backdrop="static"
                        size="lg"
                        keyboard={false}
                        centered
                    >

                        <Modal.Body>
                            <Card style={{border:'none'}}>
                                <Card.Body>
                                    <Card.Title className="text-center">
                                        <img src={logo} alt="logo awal" className="logoD rounded-circle" />
                                        <div className="text-muted p-2">Dashboard</div>
                                        <h3>Forget Password</h3>
                                        <div className="text-muted p-2 mt-3">Enter your email below</div>
                                    </Card.Title>
                                    <Card.Body>
                                        <Form >
                                            <p className="has-text-centered"></p>
                                            {msg ? (
                                                <div className="alert alert-danger text-center" role="alert">
                                                    {msg}
                                                </div>)
                                                : (<></>)}

                                            <Form.Group className="mb-4" controlId="formBasicPassword">
                                                <Form.Label>New Password</Form.Label>
                                                <Form.Control size="lg" type="password" placeholder="New Password" className="formColor"
                                                    required onChange={(e) => setPassword(e.target.value)} />
                                            </Form.Group>
                                            
                                            <Form.Group className="mb-4" controlId="formBasicPas">
                                                <Form.Label>Confirm Password</Form.Label>
                                                <Form.Control size="lg" type="password" placeholder="Confirm Password" className="formColor"
                                                    required onChange={(e) => setConfPassword(e.target.value)} />
                                            </Form.Group>
                                            <div className="d-grid" style={{ marginBottom: "230px" }}>
                                                <Button style={{ background: '#F0A500' }} className=" button btn btn-lg is-success coba is-fullwidth kuning"
                                                    onClick={() => handleBuka(email)}>
                                                    Enter
                                                </Button>
                                            </div>

                                        </Form>
                                    </Card.Body>
                                </Card.Body>
                            </Card>
                        </Modal.Body>
                    </Modal>
                    {/* <Modal //modal tambah
                        show={open}
                        backdrop="static"
                        size="lg"
                        keyboard={false}
                        centered
                    >
                        <Modal.Header className="d-flex flex-column">
                            <div closeButton></div>
                            <Modal.Title>New User</Modal.Title>
                            {error ? (
                                <div className="alert alert-danger text-center" role="alert">
                                    {error}
                                </div>)
                                : (<></>)}

                        </Modal.Header>
                         <Modal.Body>
                            <Form onSubmit={insertData}>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Password" required
                                                onChange={(e) => setPassword(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control type="password" placeholder="Confirm Password" required
                                                onChange={(e) => setConfPassword(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="mx-auto d-flex justify-content-between">
                                    <Button variant="danger" onClick={() => handleClose()} className="w-45">
                                        Cancel
                                    </Button>
                                    <Button variant="success" type="submit" className="w-45" >
                                        Save
                                    </Button>
                                </Row>
                            </Form>
                        </Modal.Body>
                    </Modal> */}
                </Container>
            </div>
        </div>
    );
}


export default Forget;