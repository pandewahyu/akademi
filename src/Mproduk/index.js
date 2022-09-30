import React, { useEffect, useState } from "react";
import "../App.css"
import Card from 'react-bootstrap/Card';
import { Nav, NavItem } from 'reactstrap';
import { Button, Row, Col, Modal, Form, Container } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { NavLink, Link, useHistory } from 'react-router-dom';
import Box from '../assets/image/icon/box.svg';
import Chart from '../assets/image/icon/chart.svg';
import Calender from '../assets/image/icon/calender.svg';
import Edit from "../assets/image/icon/edit.svg";
import Delete from "../assets/image/icon/delete.svg";
import axios from "axios";

const recommendations = [{
  id: 1,
  kategori: 'Web Programing',
}, {
  id: 2,
  kategori: 'Mobile App',
}, {
  id: 3,
  kategori: 'Robotic',
},
{
  id: 4,
  kategori: 'Game Programing',
},
{
  id: 5,
  kategori: 'App Programing',
},

]

const Search = () => {
  const [data, setData] = useState([]);
  const [catagori, setCatagori] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();


  useEffect(() => {
   
    //const getProductcategories = async () => {
    //  setIsLoading(true);
    // axios.get("http://localhost:3000/product-categories", { withCredentials: "true" })
    //  .then((response) => {
    //  setData(response.data);
    //   console.log(data);
    // setIsLoading(false);
    //  })
    // .catch(error => {
    //   console.log(error.response);
    // });
    //  };
    getProductunit();
    getProduct();
    getCatagori();
    // getProductcategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getProduct = async () => {
    axios.get("http://localhost:3000/products", { withCredentials: "true" })
      .then((response) => {
        setData(response.data);
        
      })
      
  };
  const getCatagori = async () => {
    axios.get("http://localhost:3000/product-categories", { withCredentials: 'true' })
      .then((response) => {
        setCatagori(response.data);
      });
  };

  const CatagoriMap = catagori.map((item) => item.category_id)
  const ProdukNew = data.filter(({ id }) => CatagoriMap.includes(id))

  const [id, setId] = useState("");
  const [category_id, setCategoriproduk] = useState("");
  const [code_product, setCodeProduct] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [days_period, setDaysPeriod] = useState("");

  const [buka, setBuka] = useState(false);
  const addProduct = async (id) => {
    axios.post("http://localhost:3000/products", {
      category_id: category_id,
      code_product: code_product,
      name: name,
      description: description,
      price: price,
      days_period: days_period,
    }, { withCredentials: 'true' })
      .then(() => {
        console.log('mau');
      })
  };

  console.log(data);


  const [tampil, setTampil] = useState(false);

  const handleEdit = (id) => {
    axios.get("http://localhost:3000/products/" + id, { withCredentials: 'true' })
      .then((response) => {
        setId(response.data.id);
        setCategoriproduk(response.data.category_id);
        setCodeProduct(response.data.code_product);
        setName(response.data.name);
        setDescription(response.data.description);
        setPrice(response.data.price);
        setDaysPeriod(response.data.days_period);
        setTampil(true);

      });
  };
  const updateProduct = async () => {
    axios.patch("http://localhost:3000/products/" + id, {
      id: id,
      category_id: category_id,
      code_product: code_product,
      name: name,
      description: description,
      price: price,
      days_period: days_period,
    }, { withCredentials: 'true' })
      .then(
        () => {
          setId('');
          setCategoriproduk('');
          setCodeProduct('');
          setName('');
          setDescription('');
          setPrice('');
          setDaysPeriod('');
        }
      ).catch(
        (eror) => {
          console.log(eror);
        }
      )
  }

  const [hapus, setHapus] = useState(false);
  const handleHapus = (id) => {
    axios.get("http://localhost:3000/products/" + id, { withCredentials: 'true' })
      .then((response) => {
        setId(response.data.id);
        setCodeProduct(response.data.category_id);
        setName(response.data.name);
        setDescription(response.data.description);
        setPrice(response.data.price);
        setDaysPeriod(response.data.days_period);
        setHapus(true);
      });
  };
  const deleteData = (id) => {
    axios.delete("http://localhost:3000/products/" + id, { withCredentials: 'true' })
      .then(() => {
        getProduct();
        setHapus(false);
        setId('');
        setCodeProduct('')
        setName('')
        setDescription('');
        setPrice('');
        setDaysPeriod('');

      });
  };
  const handleTtp = () => {
    setId('');
    setCategoriproduk('');
    setCodeProduct('')
    setName('')
    setDescription('');
    setPrice('');
    setDaysPeriod('');
    setTampil(false);
  };
  const handleTutup = () => {
    setId('');
    setCategoriproduk('');
    setCodeProduct('');
    setName('');
    setDescription('');
    setPrice('');
    setDaysPeriod('');
    setBuka(false);
  };
  const handleClose = () => {
    setId('');
    setCategoriproduk('')
    setCodeProduct('');
    setName('')
    setDescription('');
    setPrice('');
    setDaysPeriod('');
    setHapus(false);
  };

  const [filterText, setFilterText] = React.useState('');
  const filteredItems = data.filter(
    item => item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const Loading = () => {
    return (
      <div className="mx-auto">
        <Spinner animation="border" variant="warning" />
      </div>
    );
  };
  const handleBuka = () => setBuka(true);
  const ShowProducts = () => {
    return (
      <Row className="mt-5">
        {data.map((data, index) => (
          <Col md="4" className="mb-5 px-4">
            <Card key={`data-${index}`} className="produk__card">
              <Card.Body>
                <h3 className='product__subtitle'> Koding Departement </h3>
                <h2 className='product__title'>{data.name}</h2>
                <p className='product__description '>
                  {data.description.substring(0,100)}...
                </p>
                <div className="flex">
                  <span className='product__price-new'>{data.price}</span>
                </div>
                <div className="d-flex justify-content-between product__icon-detail mt-2">


                  <div className='product__icon-list'> <img src={Calender} alt="" /><div >{data.days_period}</div></div>
                  <Link to={`/Listunit/${data.id}`}>
                    <div className='product__icon-list'> <img src={Chart} alt="" /><div >Unit</div></div>
                  </Link>



                  <div className='product__icon-list'> <img src={Box} alt="" /><div >{data.code_product}</div></div>
                </div>
                <div className="d-flex justify-content-end mt-5">
                  <div className="edit_product"><img src={Edit} alt="" onClick={() => handleEdit(data.id)} /></div>
                  <div className="edit_product" ><img src={Delete} alt="" onClick={() => handleHapus(data.id)} /></div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  const [datas, setDatas] = useState([]);

  const getProductunit = async () => {
    axios.get("http://localhost:3000/product-units", { withCredentials: "true" })
      .then((response) => {
        setDatas(response.data);
        console.log(datas);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  console.log(datas);
  return (
    <div>

      <Container className="d-flex justify-content-center">
        <div className="d-flex flex-row justify-content-around mb-3 mt-3">
          {
            recommendations.map((recommendations, index) => (
              <Button variant="white" className=" filter__button-active ">{recommendations.kategori}</Button>
            ))
          }
        </div>
        <Button

          className="create__button " activeClassName="active"
          onClick={handleBuka}
        >
          + New Products
        </Button>
        <Modal
          show={buka}
          onHide={handleTutup}
          backdrop="static"
          size="lg"
          keyboard={false}
          centered
        >
          <Modal.Header >
            <Modal.Title>Add New Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={addProduct}>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name Unit</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Product name"
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Col>
                      <Form.Label>Produk Catagory</Form.Label>
                      <Form.Select aria-label="Default select coba" required onChange={(e) => setCategoriproduk(e.target.value)}>
                        <option value="">Select Produk ID</option>
                        {catagori.map((item) => (
                          <option value={item.id}>{item.id} - {item.code_category}</option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Kode Product</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Product Code"
                      name="code_product"
                      onChange={(e) => setCodeProduct(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Price"
                      name="price"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Days Periode</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Days Period"
                      name="days_period"
                      onChange={(e) => setDaysPeriod(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className=" mx-auto">
                <Col>
                  <Button className="Button_cancel" variant="danger" type="" onClick={handleTutup} >
                    Cancel
                  </Button>
                  <Button className="Button_save" variant="success" type="submit" >
                    Save
                  </Button>
                </Col>

              </Row>
            </Form>
          </Modal.Body>
        </Modal>


      </Container>


      <Modal //edit
        show={tampil}
        onHide={handleTtp}
        backdrop="static"
        size="lg"
        keyboard={false}
        centered
      >
        <Modal.Header >
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={() => updateProduct(id)}>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name Unit</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Product name"
                    name="name"
                    onChange={(e) => setName(e.target.value)} value={name}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Col>
                    <Form.Label>Produk Catagory</Form.Label>
                    <Form.Select aria-label="Default select coba" required onChange={(e) => setCategoriproduk(e.target.value)} value={category_id}>
                      <option value="">Select Produk ID</option>
                      {catagori.map((item) => (
                        <option value={item.id}>{item.id} - {item.code_category}</option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Kode Product</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Product Code"
                    name="code_product"
                    onChange={(e) => setCodeProduct(e.target.value)} value={code_product}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Price"
                    name="price"
                    onChange={(e) => setPrice(e.target.value)} value={price}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Days Periode</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Days Period"
                    name="days_period"
                    onChange={(e) => setDaysPeriod(e.target.value)} value={days_period}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    onChange={(e) => setDescription(e.target.value)} value={description}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className=" mx-auto">
              <Col>
                <Button className="Button_cancel" variant="danger" type="" onClick={handleTtp} >
                  Cancel
                </Button>
                <Button className="Button_save" variant="success" type="submit" >
                  Save
                </Button>
              </Col>

            </Row>
          </Form>
        </Modal.Body>
      </Modal>



      <Modal //delete
        show={hapus}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>

        </Modal.Header>
        <Modal.Body>
          <img className="text-center d-flex justify-content-center mx-auto" style={{ alignItems: 'center', width: '100px', height: '100px' }}
            src="https://cdn-icons-png.flaticon.com/512/4201/4201973.png" alt="drive" />
          <Row>
            <h2 className="text-center">Are You Sure?</h2>
          </Row>
          <Row className="pb-3">
            <Col className="text-center">
              <h4>Do you want to delete "{name}"?</h4>
            </Col>
          </Row>
          {/* <Row>
                                        <Col className="text-center mb-4">
                                            <h2>email: {item.email}</h2>
                                        </Col>
                                    </Row> */}
          <Row className=" mx-auto">
            <Button className="red" key={id} variant="danger" type="submit" onClick={() => deleteData(id)}>
              Delete
            </Button>
          </Row>

        </Modal.Body>
      </Modal>



      <div className="justify-content-center m-3">

      </div>
      <div className="d-flex flex-column justify-content-center mb-3">
        {isLoading === true ? <Loading /> : <ShowProducts />}
      </div>
      <div style={{ paddingBottom: '70px' }}>
      </div>
    </div>
  )
};

export default Search;