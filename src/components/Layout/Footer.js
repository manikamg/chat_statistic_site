import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Input, Label } from 'reactstrap';
import { HashLink } from 'react-router-hash-link';

//Import Icons
import FeatherIcon from 'feather-icons-react';
import footerImg from '../../assets/images/footer-img.jpg';

//Import Images
import applestore from "../../assets/images/applestore.png";
import playstore from "../../assets/images/playstore.png";

class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = {
       
    };
  }

render() {
    return (
        <React.Fragment>
            <footer>
                <img src={footerImg} alt="footerImg" width="100%" />
            </footer>
            {/* {this.props.isLight ? "footer bg-light" : "footer"} */}
            <footer className="footer footer-bar" style={{ backgroundColor: "#ffffff",borderTop : "1px solid lightgray" }}>
                <Container>
                    <Row>

                    <Col lg="2" md="4" xs="12" className="mt-4 mt-sm-0 pt-2 pt-sm-0" name="footercolumn">
                        <h4 style={{ color: "#1F618D" }}>Company</h4>
                        
                    </Col>

                    <Col lg="3" md="3" xs="12" className="mt-4 mt-sm-0 pt-2 pt-sm-0" name="footercolumn">
                    {/* <Col lg="3" xs="12" className="mb-0 mt-4 pb-0 pb-md-2" name="footercolumn"> */}
                        <h4 style={{ color: "#1F618D" }}>Solutions</h4>
                       
                    </Col>
                    
                    <Col lg="2" md="3" xs="12" className="mt-4 mt-sm-0 pt-2 pt-sm-0" name="footercolumn">
                        <h4 style={{ color: "#1F618D" }}>Recourses</h4>
                        
                    </Col>

                    <Col lg="2" md="4" xs="12" className="mt-4 mt-sm-0 pt-2 pt-sm-0" name="footercolumn">
                        <h4 style={{ color: "#1F618D" }}>Support</h4>
                       
                        
                    </Col>
                </Row>
                {/* <i className="mdi mdi-chevron-right mr-1"></i> */}
                </Container>
            </footer>
            <footer className="footer footer-bar" style={{ backgroundColor: "#ffffff", borderTop : "1px solid lightgray" }}>
                <Container className="text-center">
                    <Row className="align-items-center">
                        <Col lg={6} md={6} sm="6" className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                            <p className="mb-0 text-sm-left">© 2020-21 All rights reserved
                            <Link to="/"  rel="noopener noreferrer" className="text-success"><span style={{ color:"#1F618D" }}> Upmovv</span></Link>
                            </p>
                            <p className="mb-0 text-sm-left"> Design & Developed By
                            <a href="https://programmics.co.in" target="_blank" rel="noopener noreferrer" className="text-success"><span style={{ color:"#1F618D" }}> Programmics Technology</span></a>
                            </p>
                        </Col>
                        <Col lg={6} md={6} sm="6" className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                            {/* <p className="mb-0 text-sm-right" style={{fontSize: "30px"}}> */}
                                <ul className="list-unstyled text-sm-right mb-0" style={{fontSize: "30px"}}>
                                    <li className="list-inline-item mr-2"> 
                                        <a href="#" target="_blank"> <span className="mdi mdi-facebook"></span> </a>
                                    </li>
                                    <li className="list-inline-item mr-2">
                                        <a href="#" target="_blank"> <span className="mdi mdi-twitter"></span> </a>
                                    </li>
                                    <li className="list-inline-item mr-2">
                                        <a href="#" target="_blank"> <span className="mdi mdi-instagram"></span> </a>
                                    </li>
                                    <li className="list-inline-item mr-2">
                                        <a href="#" target="_blank"> <span className="mdi mdi-linkedin"></span> </a>
                                    </li>
                                    <li className="list-inline-item mr-2">
                                        <a href="#" target="_blank"> <span className="mdi mdi-youtube"></span> </a>
                                    </li>
                                </ul>
                            {/* </p> */}
                        </Col>
                    </Row>
                </Container>
            </footer>        
        </React.Fragment>
    );
  }
}

export default Footer;
