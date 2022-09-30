import { Container, Button } from "react-bootstrap";
import React from "react";
import "../style/style.css";
import { Link } from "react-router-dom";
import G from "../assets/image/G.jpg";
import E from "../assets/image/email.jpg";


function Login() {
  //modal popup
  return (
    <div className="bgLogin">
      <Container className="Clogin">
        <div className='H1Log'>
          Welcome To The Future
        </div>
        <p className="H3Log" style={{textAlign:"center"}}>
         Join With Us
          <br/> Koding Akademi
        </p>

        <div className='Signin' >
          <span >
            <img src={G} alt="gambar" width="55px" height="54px" style={{
              marginBottom: "2px",
            }} />
            </span>
          <Button bsPrefix="cusbtn" variant="primary" > SIGN IN WITH GOOGLE
          </Button>


        </div>
        <div className='login' >
          <span >
            <img src={E} width="55px" alt="gambar" height="49px" style={{
              marginBottom: "2px",
            }} /></span>

          <Button bsPrefix="cusbtn1" variant="primary" href={"/LForm"} className="text-decoration-none"  >
            Login WITH EMAIL</Button>

        </div>
        <div className="linkAcc ">
          <p style={{paddingRight:"10px", marginRight:"100px"}}>Don't have an account? <span style={{paddingLeft:"50px"}} ><Link to={"/SignUp"} className="text-decoration-none">Sign Up</Link></span> </p> 
          
        </div>
        <div>
         <h3 style={{color:'white', textAlign:'left', paddingTop:'15px'}}>
          Our Vision:
         </h3>
         <h5 style={{color:'white', textAlign:'left'}}>
          Becoming the Best Coding Education Center in Indonesia
         </h5>
        </div>
      </Container>

    </div>
  );
}

export default Login;