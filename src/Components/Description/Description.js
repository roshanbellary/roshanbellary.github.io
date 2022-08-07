import React from 'react';
import {Container} from 'react-bootstrap';
import "./Description.css";
import "aos/dist/aos.css";
class Description extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const barStyle = {
            height: "50px",
            margin:"auto",
            backgroundColor: "white",
            width: "2px"
        };
        const textStyle = {
            fontFamily: "Menlo",
            color:"#29FE13",
            fontSize:"20px",
            marginBottom:"0px"
        }
        const containerStyle = {
            margin: "0",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
        };
        return(
            <Container style={{height:window.innerHeight}}>
                <div class="typewriter">
                    <div key={Math.random()} class="typewriter-text">
                        Roshan Bellary
                    </div>
                </div>
                <div style={containerStyle} data-aos="fade-right">
                    <p style={textStyle}>
                        Programmer
                    </p>
                    <div style={barStyle}/>
                    <p style={textStyle}>
                        Mathematician
                    </p>
                    <div style={barStyle}/>
                    <p style={textStyle}>
                        Researcher
                    </p>
                </div>
            </Container>
        )
    }
}
export default Description;