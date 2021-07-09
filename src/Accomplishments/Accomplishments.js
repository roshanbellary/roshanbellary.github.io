import React from 'react';
import './Accomplishments.css';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
class Accomplishments extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <Header></Header>
                <h1 class="Push"> Accomplishments</h1>
                <p>
                    I am a 2 time AIME qualifier and have participated in USACO 
                    and F=Ma(Trying to make camp lol)
                </p>
                <Footer></Footer>
            </div>
        );
    }
}
export default Accomplishments;