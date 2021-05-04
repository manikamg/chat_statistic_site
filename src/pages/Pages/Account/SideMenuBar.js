import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import {Row, Col } from "reactstrap";
import Params from '../../Params/Params';
import axios from 'axios';

import { CircularProgressbar, CircularProgressbarWithChildren  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './style.css'

import Crmuser from "../../../assets/images/crmuser.jpg";


class SideMenuBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirectToLogin : false,
            activeMenu : '',
            user_firstname : '',
            user_lastname : '',
            user_email : '',
            user_mobile : '',
            user_id:'',
            updateEmail: '',
            profileProgress:0,
            image:'',
            photo:'',

            userPhoto:'',
        }
        this.handelChange = this.handelChange.bind(this);
    }
    componentDidMount() {       
        document.body.classList = "";
        document.getElementById('topnav').classList.add('nav-sticky');
        if(!localStorage.getItem('currentUser')){
            document.getElementById('buyButton').className="btn btn-light";
        }
        
        if(localStorage.getItem('currentUser')){
            let user_data = JSON.parse(localStorage.getItem('currentUser'));
            this.getData();
            this.setState({
                redirectToLogin : false,
                user_firstname : user_data.name,
                activeMenu: window.location.pathname
            })
        }
        else{
            this.setState({
                redirectToLogin : false
            })
        }

        let pathName =  ''+window.location.pathname.split('/')+''
       
      }
    
  
      getData = async () => {
        try {
            let user_data = JSON.parse(localStorage.getItem('currentUser'));
            
        } catch (error) {
            console.warn(error);
        }
    }

    handelChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    changeImage = () => {
        document.getElementById('takePic').click();
     }
   


    //  -------------------------

    render() {
        if(this.state.redirectToLogin){
            return ( <Redirect to={'/login'} />);
        }
        return (
            <React.Fragment>
                <Col lg="3" md="4" className="shadow-lg side-sticky-bar p-5" xs="12" style={{  backgroundColor: "#F5F9F9", paddingTop: "20px", marginTop: "-40px", height:"100vh" }}>

                    <Row className="align-items-center">
                        <Col lg="12" md="12" className="text-md-left text-center" style={{cursor:"pointer"}}>

                            <img src={Crmuser} className="avatar avatar-large rounded-circle shadow d-block mx-auto" alt="" style={{ height: "80px", width: "80px" }} />
                            

                            <input type="file" name="userPhoto" id="takePic" value={this.state.userPhoto} onChange={this.updatePhoto} style={{display:"none"}}/>
                        </Col>

                        <Col md="12" className="text-md-center text-center mt-4 mt-sm-0">
                            <h6 className="title mt-2 mb-0">{this.state.user_firstname}</h6>
                           <hr />
                        </Col>



                        <Col md="12" className="text-md-center ">

                            <Col lg="12" sm="12" className="text-md-center text-center" style={{textAlign:"center"}} >
                               
                            </Col>
                        </Col>
                    </Row>



                    <div className="sidebar sticky-bar py-4 rounded" style={{height:"100vh" }}>
                        <ul className="side-bar" style={{ height:"100vh" }}>
                           <li className={ this.state.activeMenu == "/my-report" ? "active-link" : null}><Link to="#" className={ this.state.activeMenu == "/my-report" ? "active-text" : null}>My Report</Link></li>
                        </ul>
                    </div>
                </Col>
            </React.Fragment>
        );
    }
}

export default Params(SideMenuBar); 