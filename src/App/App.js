import './App.css';
import About from '../About/About.js';
import Math from '../Math/Math.js';
import Science from '../Science/Science.js';
import Accomplishments from '../Accomplishments/Accomplishments.js';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import React from 'react';
class Bar extends React.Component{
  
}
class App extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={About}/>
          <Route path='/Math' exact component={Math}/>
          <Route path='/Science' exact component={Science}/>
          <Route path='/Accomplishments' exact component={Accomplishments}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
