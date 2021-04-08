import React from 'react';
import './Science.css';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
class Science extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
            <Header></Header>
            <h1>Science </h1>
            <p>
                Computer Science and Physics are two of the main subjects that I have focused on in the sciences. I've attended
                Aops' Woot program in physics and am currently USACO gold for computer science. I hope to improve in computer science, but
                I need to work on my 
            </p>
            <Footer></Footer>
            </div>
        );
    }
}
export default Science;