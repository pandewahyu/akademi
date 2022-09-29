import React from "react";
import { Navbar, Button, Container } from "react-bootstrap";
import logo from '../assets/image/D.png';
function Header({ active, setActive }) {
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
          <i className="fas fa-bell" style={{marginRight:"35px"}}></i>
          <Navbar.Text className="text-end" style={{marginRight:"15px "}}>
            Ida ayu made dyah kusuma
          </Navbar.Text>
          <img
            width="40"
            height="40"
            className="justify-content-end me-3 rounded-circle "
            style={{width:"35px", height:"35px"}}
            src={logo}
            alt="l"
          />
        </div>
      </header>
    </Container>
  );
}

export default Header;
