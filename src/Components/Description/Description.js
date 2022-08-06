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
            height: "100%",
            position: "absolute",
            left: "50%",
            zIndex: -1,
            backgroundColor: "white",
            width: "10px"
        };
        const textStyle = {
            fontFamily: "Menlo",
            color:"#29FE13",
            fontSize:"20px"
        }
        return(
            <Container style={{height:window.innerHeight}}>
                <div class="typewriter">
                    <div key={Math.random()} class="typewriter-text">
                        Roshan Bellary
                    </div>
                </div>
                <div style={{marginTop:"220px"}} data-aos="fade-right">
                    <div style={barStyle}/>
                    <p style={textStyle}>
                        Programmer
                    </p>
                    <p style={textStyle}>
                        Mathematician
                    </p>
                    <p style={textStyle}>
                        Researcher
                    </p>
                </div>
            </Container>
        )
    }
}
export default Description;