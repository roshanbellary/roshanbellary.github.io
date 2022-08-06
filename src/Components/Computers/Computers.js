import React from 'react';
import {Container, Card, Row, Col, Collapse} from 'react-bootstrap';
import "./Computers.css";
import "aos/dist/aos.css";
class Computer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cardbgcolor:["#000000","#000000","#000000"]
        }
    }
    render(){
        let cardStyles = [
            {
                backgroundColor:this.state.cardbgcolor[0],
                borderColor:"#FFFFFF",
                borderWidth:"2px"
            },
            {
                backgroundColor:this.state.cardbgcolor[1],
                borderColor:"#FFFFFF",
                borderWidth:"2px"
            },
            {
                backgroundColor:this.state.cardbgcolor[2],
                borderColor:"#FFFFFF",
                borderWidth:"2px"
            }
        ];
        const textStyle={
            fontFamily: "Menlo",
            color:"#29FE13",
        };
        let poss = [
            ["#FFFFFF","#000000","#000000"],
            ["#000000","#FFFFFF","#000000"],
            ["#000000","#000000","#FFFFFF"],
            ["#000000","#000000","#000000"]
        ];
        return(
            <Container style={{height:window.innerHeight}}>
                <div class="header-text">
                    Programming
                </div>
                <div data-aos="fade-up">
                    <Row style={{height:"100px", marginTop:"100px"}}>
                        <Col>
                            <Card style={cardStyles[0]} onMouseEnter={() => this.setState({cardbgcolor:poss[0]})} onMouseLeave={()=> this.setState({cardbgcolor:poss[3]})}>
                                <Card.Body>
                                    <div style={textStyle}>
                                        Data Analysis
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={cardStyles[1]} onMouseEnter={() => this.setState({cardbgcolor:poss[1]})} onMouseLeave={()=> this.setState({cardbgcolor:poss[3]})}>
                                <Card.Body>
                                    <div style={textStyle}>
                                        Frontend Development
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={cardStyles[2]} onMouseEnter={() => this.setState({cardbgcolor:poss[2]})} onMouseLeave={()=> this.setState({cardbgcolor:poss[3]})}>
                                <Card.Body>
                                    <div style={textStyle}>
                                        Competitive Programming
                                    </div>                                   
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>
        )
    }
}
export default Computer;