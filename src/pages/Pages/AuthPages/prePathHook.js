// React Basic and Bootstrap
import React, { Component } from 'react';
import { useParams, useHistory } from "react-router-dom";

function prePathHook(Component) {
    return function WrappedComponent(props) {
        let history = useHistory();
        let prevePath = history.entries;
      
    //   const paramValue = useParams();
      return <Component {...props} prevePath={prevePath} />;
    }
}

export default prePathHook;