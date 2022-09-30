import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Navbar, Button, Container } from "react-bootstrap";
import logo from '../assets/image/D.png';
import { useHistory } from "react-router-dom";
function Header({ active, setActive }) {
  const [coba, setCoba] = useState([]);
  const email = localStorage.getItem('email');
  const [msg, setError] = useState('');
  const history = useHistory();
  useEffect(() => {
    getNama();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const getNama = async () => {
    axios.get("http://localhost:3000/users", { withCredentials: "true" })
      .then((response) => {
        setCoba(response.data);
      }).catch((error) => {
        history.push('LForm')
      });
  };

  const filtt = coba.filter(
    item => item.email == email
  );
  return (
    <Container className="edit">
      <header
        className={
          active ? "sidebar_active p-3 d-flex justify-content-between" : "p-3 sidebar d-flex justify-content-between"
        }
      >
        <Button
          id="sidebarCollapse"
          type="button"
          className="btn shadow-sm fw-bold"
          onClick={() => {
            setActive(!active);
          }}
        >
          <i className="fas fa-bars"></i>
        </Button>
        <div className={active ? "" : "n-active"}>



          <i className="fas fa-bell" style={{ marginRight: "35px" }}></i>
         <span className="headder"> {filtt.map((i) => (i.full_name))}</span>
          <Navbar.Text className="text-end" style={{ marginRight: "15px " }}>
          </Navbar.Text>
          <img
            width="40"
            height="40"
            className="justify-content-end me-3 rounded-circle "
            style={{ width: "35px", height: "35px" }}
            src={logo}
            alt="l"
          />


        </div>
      </header>
    </Container>
  );
}

export default Header;
