// React Basic and Bootstrap
import React, { Component } from 'react';
import { useParams } from "react-router-dom";

function withMyHook(Component) {
    return function WrappedComponent(props) {
      const paramValue = useParams();
      return <Component {...props} paramValue={paramValue} />;
    }
}

export default withMyHook;