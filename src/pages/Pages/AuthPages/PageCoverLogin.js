// React Basic and Bootstrap
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Container, Row, Col, Label, FormGroup, Input, Button, Card, CardBody } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import axios from 'axios';

// Import CSS
import './custom.css';

//Import Icons
import FeatherIcon from 'feather-icons-react';

import loding from '../../../assets/images/loader.gif';


class PageCoverLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password : '',
            remember_me : '',
            prevPath:'',
            isLoggedIn:false
        }
        this.handleChange = this.handleChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    componentDidMount(){
        var session = JSON.parse(localStorage.getItem('currentUser'));
        if(session){
            this.setState({
                isLoggedIn:true
            })
        }
    }

    componentWillReceiveProps() {
        window.previousLocation = this.props.location
        this.setState({
            prevPath: window.previousLocation
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

   

    formSubmitOne = (e) => {
        e.preventDefault();
        console.log("Login attampt")
    }

    formSubmit = (e) => {
        e.persist();
        document.getElementById('Loading').style.display = 'block'
        
        axios.post(process.env.REACT_APP_BACKEND_BASE_API_URL+'login', { 
            email : this.state.email,
            password : this.state.password
         })
        .then(res => {

            localStorage.setItem('login-success', 'Login has been successfuly done');

            if(res.data.success == true){
                
                localStorage.setItem('currentUser', JSON.stringify(res.data.data));
                localStorage.setItem('token', res.data.token );
                if(localStorage.getItem('previousPath')){
                    this.props.history.push(localStorage.getItem('previousPath'));
                    localStorage.removeItem('previousPath');
                }
                else{
                    this.props.history.push('/my-report');
                }
            }
            else{
                document.getElementById('Loading').style.display = 'none'
                document.getElementById('errorId').style.display = 'block'
                document.getElementById('errorId').innerHTML = res.data.message;
                console.log(res.data.message)
            }
            
        })
        .catch( error => {
            document.getElementById('Loading').style.display = 'none'
            document.getElementById('errorId').style.display = 'block'
            document.getElementById('errorId').innerHTML = "Something wrong!";
            console.log(error)
        })

    }

    
// Page render is start from here ========================================================================================
    render() {

        if(this.state.isLoggedIn){
            return ( <Redirect to={'/my-report'} />);
        }
        


        return (
            <React.Fragment>
                <div className="back-to-home rounded d-none d-sm-block">
                    <Link to="/" className="btn btn-icon btn-soft-primary"><i><FeatherIcon icon="home" className="icons" /></i></Link>
                </div>

                <section className="bg-home d-flex align-items-center" style={{ background: "#ffffff" ,marginTop: "0px"}}>
                {/* <section className="bg-home d-flex align-items-center" style={{ backgroundImage: `url(${user01})` }}> */}
                    <Container><br />
                        <Row className="justify-content-center">
                           

                            <Col lg={5} className="mt-0 mt-md-5 pt-0 pt-md-5">
                                <Card className="login-page border-0 sp1451" style={{ zIndex: "1" }} style={{ marginTop: "-100px"}}>
                                    <CardBody  style={{ padding: "0px" }}>
                                      <center> <h6 className="display-6">To continue, login </h6> </center>

                                        
                                        <AvForm className="llogin-form" onSubmit={this.formSubmit}  style={{ marginTop: "0px" }}>
                                            <Row>



                                                <Col lg={12}>
                                                    <FormGroup className="position-relative">
                                                        <Label htmlFor="email">Email address<span className="text-danger">*</span></Label>
                                                        <i><FeatherIcon icon="user" className="fea icon-sm icons" /></i>
                                                        <AvField type="text" className="form-control pl-5" value={this.state.email} onChange={this.handleChange} name="email" id="email" placeholder="Email address" required
                                                            
                                                        />
                                                        <span style={{ color: "red", fontSize: "13px", display : "none" }} id="errorId"></span>
                                                    </FormGroup>
                                                </Col>

                                                <Col lg={12}>
                                                    <FormGroup className="position-relative">
                                                        <Label htmlFor="password">Password<span className="text-danger">*</span></Label>
                                                        
                                                        <i><FeatherIcon icon="lock" className="fea icon-sm icons" /></i>
                                                        <AvField type="password" className="form-control pl-5" value={this.state.password} onChange={this.handleChange} name="password" id="password" placeholder="Enter password" 
                                                            errorMessage=""
                                                            validate={{
                                                                minLength: {value: 6, errorMessage: 'Your password must be between 6 and 8 characters'},
                                                                maxLength: {value: 16, errorMessage: 'Your password must be between 6 and 8 characters'}
                                                            }}
                                                        />

                                                    </FormGroup>

                                                </Col>


                                                <Col lg={12} >
                                                    <center> <img src={loding} alt="Loading" id="Loading" height="60" style={{ display : "none"}} /> </center>
                                                </Col>

                                                <Col lg={12} className="mb-0">
                                                    <Button color="primary" block style={{ backgroundColor: "#e54b4b", color:"#ffffff", fontSize : "13px"}}>Sign in</Button>
                                                </Col>
                                                
                                               
                                            </Row>
                                           
                                        </AvForm>
                                    </CardBody>
                                </Card> 
                            </Col>
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        );
    }
}
export default PageCoverLogin;
