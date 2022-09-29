import React from "react";
import '../style/style.css'
import logo from '../assets/image/D.png';
import { Nav, NavItem } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faShoppingBasket, faRectangleList, faBookOpen, faCalendarAlt, faShoppingBag, faChartLine, faSlidersH, faIdBadge, faChartPie, faStickyNote } from '@fortawesome/free-solid-svg-icons';

const tabs = [{
  route: "/home",
  icon: faChartPie,
  label: "Overview"
},  {
  route: "/mjadwal",
  icon: faCalendarAlt,
  label: "Manajemen Jadwal"
}, 
{
  route: "/categori",
  icon: faRectangleList,
  label: "Product Category"
},
{
  route: "/units",
  icon: faShoppingBasket,
  label: "Product Unit"
},
{
  route: "/mproduk",
  icon: faShoppingBag,
  label: "Produk"
},
{
  route: "/notes",
  icon: faStickyNote,
  label: "notes"
},
]

function Sidebar({ active }) {
  return (
    <div className="edit">
      <div
        className={
          active
            ? "sidebar_active vertical-nav "
            : "vertical-nav sidebar "
        }
      >
        <div className="py-4 px-5 text-muted" >
          <div className="media d-flex align-items-center">
            <img src={logo} alt="logo awal" className="logoSide rounded-circle" />
            <p className="text-grey fw-bold text-uppercase px-3 small py-3 mb-0 atas">
              Dashboard
            </p>
          </div>
        </div>
        <div className="">
          <Nav defaultActiveKey="/home" as="ul" className="flex-column text-muted">
            {
              tabs.map((tab, index) => (
                <NavItem key={`tab-${index}`} className="text-muted">
                  <NavLink to={tab.route} className="nav-link rounded-pill" activeClassName="active">
                    <FontAwesomeIcon size="lg" icon={tab.icon} /><span> {tab.label}</span>
                  </NavLink>
                </NavItem>
              ))
            }
          </Nav>
          <Nav className="flex-column text-muted notes">
            <NavItem className="text-muted">
              <NavLink to={"/notes"} className="nav-link rounded-pill" activeClassName="active">
                <div className="text-align-center">
                  <FontAwesomeIcon size="lg" icon={faStickyNote} />
                  <span> Notes</span>
                </div>
              </NavLink>
            </NavItem>
            <></>
          </Nav>
        </div>
      </div >
    </div>
  );
}

export default Sidebar;
