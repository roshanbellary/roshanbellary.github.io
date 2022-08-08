import React from 'react';
import {Container, Card, Row, Col, Collapse} from 'react-bootstrap';
import "./Computers.css";
import "aos/dist/aos.css";
class Computer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cardbgcolor:["#000000","#000000","#000000"],
            show:[false, false, false]
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
        const descripStyle={
            height:"400px",
            width:"100%",
            backgroundColor:"black",
            borderColor:"#FFFFFF",
            borderWidth:"2px"
        };
        let poss = [
            ["#FFFFFF","#000000","#000000"],
            ["#000000","#FFFFFF","#000000"],
            ["#000000","#000000","#FFFFFF"],
            ["#000000","#000000","#000000"]
        ];
        return(
            <Container style={{height:window.innerHeight}}>
                <div class="header-text" data-aos="fade-right">
                    Programming
                </div>
                <Row style={{height:"100px", marginTop:"100px"}}>
                    <Col>
                        <div data-aos="fade-right">
                            <Card style={cardStyles[0]} onMouseEnter={() => this.setState({cardbgcolor:poss[0]})} onMouseLeave={()=> this.setState({cardbgcolor:poss[3]})} onClick={()=>{this.setState({show:[true,false,false]})}}>
                                <Card.Body>
                                    <div style={textStyle}>
                                        Data Analysis
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col>
                        <div data-aos="fade-up">
                            <Card style={cardStyles[1]} onMouseEnter={() => this.setState({cardbgcolor:poss[1]})} onMouseLeave={()=> this.setState({cardbgcolor:poss[3]})} onClick={()=>{this.setState({show:[false,true,false]})}}>
                                <Card.Body>
                                    <div style={textStyle}>
                                        Frontend Development
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col>
                        <div data-aos="fade-left">
                            <Card style={cardStyles[2]} onMouseEnter={() => this.setState({cardbgcolor:poss[2]})} onMouseLeave={()=> this.setState({cardbgcolor:poss[3]})} onClick={()=>{this.setState({show:[false,false,true]})}}>
                                <Card.Body>
                                    <div style={textStyle}>
                                        Competitive Programming
                                    </div>                                   
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row className="display-flex">
                    <Collapse in={this.state.show[0]} dimension="width" timeout="500">
                        <Card style={descripStyle} onClick={()=>this.setState({show:[false,false,false]})}>
                            <Card.Title>

                            </Card.Title>
                            <Card.Body>
                                <p>
                                    HI!
                                </p>
                            </Card.Body>
                        </Card>
                    </Collapse>
                    <Collapse in={this.state.show[1]} dimension="width" timeout="500">
                        <Card style={descripStyle} onClick={()=>this.setState({show:[false,false,false]})}>
                            <Card.Body>
                                <p>
                                    HI!
                                </p>
                            </Card.Body>
                        </Card>
                    </Collapse>
                    <Collapse in={this.state.show[2]} dimension="width" timeout="500">
                        <Card style={descripStyle} onClick={()=>this.setState({show:[false,false,false]})}>
                            <Card.Body>
                                <p>
                                    HI!
                                </p>
                            </Card.Body>
                        </Card>
                    </Collapse>
                </Row>
            </Container>
        )
    }
}
export default Computer;