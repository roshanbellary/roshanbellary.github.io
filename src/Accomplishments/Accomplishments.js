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
                <h1 class="Push"> HI</h1>
                <Footer></Footer>
            </div>
        );
    }
}
export default Accomplishments;