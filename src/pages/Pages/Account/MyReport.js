import React, { Component } from 'react';
import { 
    Container,  Row,  Col,  UncontrolledTooltip,  Progress,  
    Card,  CardBody,  Media,  TabContent, 
    TabPane,  Nav,  NavItem,  NavLink,
    Alert, Button, Input, FormGroup 
} from "reactstrap";
import { MDBContainer, MDBRow, MDBCol, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBIcon } from
"mdbreact";
import { MDBDataTable } from "mdbreact";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//Import Icons
import FeatherIcon from 'feather-icons-react';
import '../../../assets/css/common.css';

import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';

import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'react-web-tabs/dist/react-web-tabs.css'
import axios from 'axios';
import './style.css';

import SideMenuBar from './SideMenuBar';


// Redux
// import { connect } from 'react-redux';
import { withRouter, Link, Redirect } from 'react-router-dom';
// import {  } from '../../../store/actions';


class MyLearning extends Component {

    constructor(props){
        super(props);
        this.state = {
            redirectToLogin : false,
            
            user_firstname : '',
            user_lastname : '',
            user_email : '',
            user_mobile : '',
            activeItem: "1",
                      
            isOpen : false,
            imgUrl:process.env.REACT_APP_BACKEND_BASE_IMAGE_API_URL,
            videos:[],
            videoId:'',
            title:'',
            description:'',
            youtubeUrlId:'',
            token:'',

            reports: [],
            tableRows:[],  

            startDate: new Date(),
            endDate: new Date(),
            
        }

        this.handelChange = this.handelChange.bind(this);
        this.setStartDate = this.setStartDate.bind(this);

        
        
    }

    getCourse = () => {
       
        let token = localStorage.getItem('token');

        let url = process.env.REACT_APP_BACKEND_BASE_API_URL+'get-report';
        axios.get(url,
            {headers:{
                'x-access-token' : localStorage.getItem('token')
            }})
        .then((response) => {
            
            this.setState({
                reports:response.data.data
            })
            
        })
        .then(async() => {

            this.setState({ tableRows:this.assemblePosts(), isLoading:false })
           
         })
        .catch( err => {
            console.log(err);
        })

    }

    getDataWithDatarange = () => {
       
        let token = localStorage.getItem('token');

        var startDate = this.state.startDate;
        var endDate = this.state.endDate;

        let url = process.env.REACT_APP_BACKEND_BASE_API_URL+'get-report-with-date-range/'+startDate+'/'+endDate;
        axios.get(url,
            {headers:{
                'x-access-token' : localStorage.getItem('token')
            }})
        .then((response) => {
            console.log(response.data.data)
            this.setState({
                reports:response.data.data
            })
            
        })
        .then(async() => {

            this.setState({ tableRows:this.assemblePosts(), isLoading:false })
           
         })
        .catch( err => {
            console.log(err);
        })

    }

    componentDidMount() {
     
        if(localStorage.getItem('currentUser')){
            this.getCourse();
            
        }
        else{
            this.setState({
                redirectToLogin : true
            })
        }
    }

    setStartDate(date){
        this.setState({
            startDate: date
        })
    }

    setEndDate(date){
        this.setState({
            endDate: date
        })
    }

    handelChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    toggle = tab => () => {
        if (this.state.activeItem !== tab) {
        this.setState({
          activeItem: tab
        });
        }
    }

    nextVideo = e => {
        if(localStorage.getItem('nextVideo')){
            localStorage.removeItem('nextVideo');
            localStorage.setItem('nextVideo', e);
        }
        else{
            localStorage.setItem('nextVideo', e);
        }
    }


    
    assemblePosts= () => {
        // answer.split(',');

        let reports =this.state.reports.map((report) => {

          return (
    
            {
    
                websiteid: report.websiteId,

                chats: report.chats,

                missedChats: report.missedChats,

    
            }
    
          )
    
        });
    
        return reports;
    
      }

// --------------------------------------------------------------
    render() {
        if(this.state.redirectToLogin){
            return ( <Redirect to={'/login'} />);
        }

        const data = {
            columns: [
              
              {
                label: "Website Id",
                field: "websiteid",
                sort: "asc",
                width: 30
              },
             
              {
                label: "Chats",
                field: "chats",
                sort: "asc",
                width: 30
              },
              {
                label: "Missed Chats",
                field: "missedChats",
                sort: "asc",
                width: 30
              }
            ],
            rows:this.state.tableRows,
            }
        
        return (
            <React.Fragment>
                <section className="section mt-60" style={{marginTop:"80px"}}>
                    <div className="mt-lg-3 container-fluid">
                        <Row>
                            <SideMenuBar />
                            <Col lg="9" md="7" xs="12" className="mt-4 mt-sm-0 pt-2 pt-sm-0 sticky-field">
                                <div className="pb-4"> {/* border-bottom  */}
                                    <Row>
                                        <Col lg={12} md={12} className="mb-2"><h3>Filter with date range</h3></Col>
                                        <Col lg={4} md={4} className="mb-2">
                                            <label>Start Date</label>
                                            <DatePicker selected={this.state.startDate} dateFormat="MMMM d, yyyy h:mm aa" onChange={date => this.setStartDate(date)} className="form-control"/>
                                        </Col>
                                        <Col lg={4} md={4} className="mb-2">
                                            <label>End Date</label>
                                            <DatePicker selected={this.state.endDate} dateFormat="MMMM d, yyyy h:mm aa" onChange={date => this.setEndDate(date)} className="form-control"/>
                                        </Col>
                                        <Col lg={4} md={4} className="mb-2">
                                        <label>.</label>
                                            <button className="btn btn-info btn-block" onClick={this.getDataWithDatarange} >Filter</button>
                                        </Col>
                                        <Col lg="12" md="12" sx="12">
                                            <Card >
                                                <CardBody>
                                                    <MDBDataTable responsive striped bordered data={data}> </MDBDataTable>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

export default MyLearning;
