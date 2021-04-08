import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App.js';
import './index.css';

class Website extends React.Component{
  render(){
      return(
        <div>
        <span><App></App></span>
        </div>
      )
    }
  }
ReactDOM.render(
    <Website />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
