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
    }
    render(){
        return(
            <img class="Image" src={this.props.name}></img>
        );
    }
}
class Button extends React.Component{
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
            <button class="Button" onClick={()=>this.switch()}>
                <Image name={this.props.name} path={this.props.path}></Image>
                <p class="Texts">{this.props.names}</p>
            </button>
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
                <Button name={home} names="Home" path="/"></Button>
                <Button name={math} names="Math" path="/Math"></Button>
                <Button name={science} names="Science" path="/Science"></Button>
                <Button name={accomplishments} names="Accomplishments" path="/Accomplishments"></Button>
            </div>
        )
    }
}
export default withRouter(Header);