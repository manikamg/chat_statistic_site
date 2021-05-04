import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { 
    Container, Row,  Col, 
    Form, FormGroup, Input, Label, Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";

//Import Icons
import FeatherIcon from 'feather-icons-react';
import { HashLink } from 'react-router-hash-link';
import axios from 'axios';

import './TopMenuCss.css';
import './top.css';
import './css/custom-style.css';
import './css/submenu.scss'
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';

import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'react-web-tabs/dist/react-web-tabs.css'

import Logo from "../../assets/images/Chat.png"
import Crmuser from "../../assets/images/crmuser.jpg";
class Topbar extends Component {

    constructor(props) {
    
        super(props);
        this.state = { 
            time: '',
            isLoggedIn : false,
            menu : false, 
            isOpen : false, 
            user_firstname: null,
            modal : false,


            hamburgermenustatus:false,

            userimage:'',
            photo:'',

            // Contdown timer
            
            navLinks : [
                { id : 0, title : "Home", link : "/" }, 
            ]


         };
         
        this.toggleLine = this.toggleLine.bind(this);
        this.toggle = this.toggle.bind(this);
        this.openBlock.bind(this);
        this.openNestedBlock.bind(this);
        this.togglemodal.bind(this);
        this.signOut = this.signOut.bind(this); 
    }
    toggle() {
        this.setState(prevState => ({
            menu: !prevState.menu
        }));
    }

    hamburgermenutoggle = () => {
        this.setState({
            hamburgermenustatus: !this.state.hamburgermenustatus
        })
        if(this.state.hamburgermenustatus){
            document.getElementById('hamburgermenu').style.display = 'block'
        }
        else{
            document.getElementById('hamburgermenu').style.display = 'none'
        }
    }

    toggleLine() {
        this.setState(prevState => ({  isOpen: !prevState.isOpen }));
    }

    togglemodal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    componentDidMount() {                
        var matchingMenuItem = null;
        var ul = document.getElementById("top-menu");
        // var items = ul.getElementsByTagName("a");
        // for (var i = 0; i < items.length; ++i) {
        //     if (this.props.location.pathname === items[i].pathname) {
        //         matchingMenuItem = items[i];
        //         break;
        //     }
        // }
        // if (matchingMenuItem) {
        // this.activateParentDropdown(matchingMenuItem);
        // }  
        if(localStorage.getItem('currentUser')){
            this.setState({
            isLoggedIn:true
        })

        let user_data = JSON.parse(localStorage.getItem('currentUser'));
        if(user_data){
           
            
           
        }

    }
     
    }

  
    activateParentDropdown = (item) => {
          const parent = item.parentElement;
          if (parent) {
              parent.classList.add('active'); // li
              const parent1 = parent.parentElement;
              parent1.classList.add('active'); // li
              if (parent1) {
                  const parent2 = parent1.parentElement;
                  parent2.classList.add('active'); // li
                  if (parent2) {
                    const parent3 = parent2.parentElement;
                    parent3.classList.add('active'); // li
                    if (parent3) {
                        const parent4 = parent3.parentElement;
                        parent4.classList.add('active'); // li
                 }
             }
         }
    }
    }

    openBlock = (level2_id) => {
        var tmpLinks = this.state.navLinks;
        tmpLinks.map((tmpLink) =>
        //Match level 2 id
           tmpLink.id === level2_id ?
                tmpLink.isOpenSubMenu = !tmpLink.isOpenSubMenu
            :
                false 
            
        )
        this.setState({navLinks : tmpLinks});
    }

    openNestedBlock = (level2_id, level3_id) => {
        var tmpLinks = this.state.navLinks;
        tmpLinks.map((tmpLink) =>
        //Match level 2 id
           tmpLink.id === level2_id ?
                tmpLink.child.map((tmpchild) =>
                    //if level1 id is matched then match level 3 id
                    tmpchild.id === level3_id ?
                        //if id is matched then update status(level 3 sub menu will be open)
                        tmpchild.isOpenNestedSubMenu = !tmpchild.isOpenNestedSubMenu
                    :
                        tmpchild.isOpenNestedSubMenu = false
                )
            :
                false 
            
        )
        this.setState({navLinks : tmpLinks});
    }
  
    signOut(){
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('login-success');
        
        this.props.history.push('/login');
    }

// ---------------------------------- #2E2E54
    render() {
        
        return (
            <React.Fragment>
                
                <header id="topnav" className="defaultscroll sticky menu-header" style={{height:'80px'}}>
                        <div style={{color:"#1F618D"}}>
                            {
                                this.state.isLoggedIn ? 
                                <Link className="logo" to="/" style={{ fontSize: "16px", marginTop:"4px", color:"#ffffff" }}>
                                    <img src={Logo} id="brandLogo" height="44" alt=""/>  
                                </Link>
                                :
                                <Link className="logo" to="/index" style={{ fontSize: "16px", marginTop:"4px", color:"#ffffff" }}>
                                    <img src={Logo} id="brandLogo" height="44" alt=""/>  
                                </Link>
                            }
                           
                        </div> 
                       
                        <div className="buy-button">
                    
                        <Dropdown isOpen={this.state.menu} toggle={this.toggle} className="d-inline-block" >
                            <DropdownToggle className="btn header-item waves-effect" id="page-header-user-dropdown" tag="button">
                               <img src={Crmuser} className="avatar rounded-circle shadow d-block mx-auto" alt="" width="30" style={{marginTop:"6px"}}/>
                                <i className="mdi mdi-chevron-down d-none d-xl-inline-block" style={{position:"absolute", marginLeft:"25px", marginTop:"-25px"}}></i>
                            </DropdownToggle>
                            <DropdownMenu right>                          
                                <Link to="#" className="dropdown-item" onClick={ (e) => e.preventDefault(), this.signOut }  style={{height:"30px"}}>
                                    <span style={{position:"absolute",top:"-10px"}}>Logout</span>
                                </Link>
                            </DropdownMenu>
                        </Dropdown>

                        </div>
                        <div className="menu-extras">
                            <div className="menu-item">
                                <Link to="#" onClick={ this.toggleLine } className={this.state.isOpen ? "navbar-toggle open" : "navbar-toggle" } >
                                    <div className="lines">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div id="navigation" style={{ display : this.state.isOpen ? "block" : "none" }}>
                            <div className="buy-menu-btn d-none">
                                <div style={{marginLeft:"0px", paddingLeft:"0px"}}>
                                    <ul className="navigation-menu" id="active" style={{marginLeft:"0px", paddingLeft:"0px"}}>
                                    
                                    </ul>
                                    <Link to="#"  onClick={ (e) => e.preventDefault(), this.signOut } rel="noopener noreferrer" id="buyButton" className="btn" style={{marginLeft:"-20px", backgroundColor: '#c54b4b', color: '#ffffff' }}>Logout</Link>
                                    <br /><br />
                                </div>
                            </div>
                        </div>
                    {/* </Container> */}
                </header>

            </React.Fragment>
        );

        
    }
}



export default withRouter(Topbar);