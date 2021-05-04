import React, { Component, Suspense } from 'react';
import { withRouter } from 'react-router-dom';

// Scroll up button
import ScrollUpButton from "react-scroll-up-button";

//Import Switcher
import ThemeSwitcher from "./ThemeSwitcher";

//Import Icons
import FeatherIcon from 'feather-icons-react';

import axios from 'axios';

// Layout Components
const Topbar = React.lazy(() => import('./Topbar'));
const Footer = React.lazy(() => import('./Footer'));
const FooterWithoutMenuLightSocialOnly = React.lazy(() => import('./FooterWithoutMenuLightSocialOnly'));

const CustomDot = () => {
  return (
    <i><FeatherIcon icon="arrow-up" className="icons" /></i>
  );
};

class Layout extends Component {

  constructor(props){
    super(props);

    this.state = {
      maintanance:false
    }
  }
 

  componentDidMount(){
    // axios.get(process.env.REACT_APP_BACKEND_BASE_API_URL+'client-side-get-maintanance-status')
    // .then( ( res ) => {
      
    //     if(res.data.success){
    //       if(res.data.data.maintananceStatus == 'Inctive'){
    //         this.setState({
    //           maintanance:false
    //         })
    //       }
    //       else{
    //         this.setState({
    //           maintanance:true
    //         })
    //       }
           
    //     }
    // } )
    // .catch( err => {
    //     console.log(err);
    // } )
    
  }

 

  render() {
    return (
      <React.Fragment>

        { this.state.maintanance ? 
        

                <div style={{ backgroundColor: '#2d2d2d', height: '100vh', color: "#c54b4b" }}>
                      
                      <div style={{ alignItems:"center", alignContent:"center",  position: "absolute", width: "800px", height: "400px", top: "50%", left:"50%", transform: 'translate(-50%, -50%)', backgroundColor: '#ffffff' }}>
                          <center>
                            <h1> <br /><br /><br />
                              COMING SOON
                            </h1>
                          </center>
                      </div>
                </div>
        

        :

                <Suspense>
                    {
                      this.props.location.pathname === "/index-onepage" ?
                      <Topbar />
                      :
                      <Topbar />
                    }
                    
                    {this.props.children}
                    {(() => {
                      if (this.props.location.pathname === "/index-marketing" || this.props.location.pathname === "/index-digital-agency" || this.props.location.pathname === "/index-modern-business" || this.props.location.pathname === "/index-services" || this.props.location.pathname === "/index-job") {
                        return (
                          <Footer isLight={true} />
                        )
                      }
                      else if (this.props.location.pathname === "/index-portfolio" || this.props.location.pathname === "/page-contact-two") {
                        return (
                          <FooterWithoutMenuLightSocialOnly class="border-0 bg-light text-dark" />
                        )
                      }
                      else if (this.props.location.pathname === "/index-personal" || this.props.location.pathname === "/helpcenter-overview" || this.props.location.pathname === "/page-invoice") {
                        return (
                          <FooterWithoutMenuLightSocialOnly class="" />
                        )
                      } 
                      
                      else if ("/my-report" === this.props.match.path) {
                        return (
                         console.log()
                        )
                      } 

                      else {
                        return (
                           <Footer />
                        )
                      }
                    })()}

                    
                    
                    {/* <div className="btn btn-icon btn-soft-primary back-to-top"> */}
                      {/* scrollup button */}
                      <ScrollUpButton ContainerClassName="classForContainer" style={{height:36, width:36}} TransitionClassName="classForTransition">
                      <CustomDot/>
                      </ScrollUpButton>
                    {/* </div> */}

                    {/* theme switcher */}
                    <ThemeSwitcher/>
                </Suspense>



        }
      </React.Fragment>
    );
  }
}

export default withRouter(Layout);
