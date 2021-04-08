import math from './resources/math.png';
import science from './resources/science.png';
import accomplishments from './resources/accomplishments.png';
import React from 'react';
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";
import "./Header.css";
import home from './resources/home.png';
class Image extends React.Component{
    constructor(props){
        super(props);
        this.state = { redirect: null };
    }
    switch(){
        this.setState({ redirect: this.props.path});
    }
    render(){
        if (this.state.redirect) {
            return (<Redirect to={this.state.redirect} />);
        }
        return(
            <img class="Image" onClick={()=>this.switch()} src={this.props.name}></img>
        );
    }
}
class Header extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="Header">
                <Image name={home} path="/"></Image>
                <Image name={math} path="/Math"></Image>
                <Image name={science} path="/Science"></Image>
                <Image name={accomplishments} path="/Accomplishments"></Image>
            </div>
        )
    }
}
export default withRouter(Header);