import React, { useEffect, useState } from 'react';
import {
  Card, Row, Col, Button, Modal, Form,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Box from '../../assets/image/icon/box.svg';
import Chart from '../../assets/image/icon/chart.svg';
import Calender from '../../assets/image/icon/calender.svg';
import Edit from '../../assets/image/icon/edit.svg';
import Delete from '../../assets/image/icon/delete.svg';
import axios from "axios";

export default function ListProduct() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [product, setProduct] = useState([]);
  const [totalSum, setTotalSum] = useState(0);
  const length = data.length;
  
  useEffect(() => {
    const getProductbyId = async () => {
      axios.get("http://localhost:3000/products/" + id,  {withCredentials : "true"})
        .then((response) => {
          setProduct(response.data);
        })
        .catch(error => {
          console.log(error.response)
      });
    };
    getProductbyId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getUnit();
}, [])

const getUnit = async () => {
  axios.get("http://localhost:3000/product-unitsbyProductid/"+ id, {withCredentials : 'true'})
  .then((response) => {
    setData(response.data);
  })
  .catch(error => {
    console.log(error.response)
})
};

console.log(data);
useEffect(() => {
  const total = data.reduce((acc, row) => acc + data.amount, 0);
  setTotalSum(total)
}, [data]);
  return (
    <>
    
      <Row className="mt-5">
        <Col  md="12" className="mb-5 px-4">
        <Card  >
            <Card.Body className="top-unit">
            <Card.Title className="text-center">{product.name}</Card.Title>
            <Card.Subtitle className="text-muted text-center">0/{length}</Card.Subtitle>
            </Card.Body>
        </Card>
        </Col>
       
        {data.map((data,index) => (
          <Col md="12" className="mb-5 px-4">
            <Card>
              <Card.Body>
                <h3 className="unit__subtitle"> Koding Departement </h3>
                <h2 className="unit__title">{data.name}</h2>
                <div className="d-flex unit__icon-detail mt-2">
                  <div className="unit__icon-list">
                    {' '}
                    <img src={Chart} alt="" />
                    <div>{data.order_unit}</div>
                  </div>
                  <div className="unit__icon-list">
                    {' '}
                    <img src={Box} alt="" />
                    <div>{data.code_unit}</div>
                  </div>
                </div>
               
              </Card.Body>
            </Card>
          </Col>
        ))}

      </Row>
 
    </>
  );
}
