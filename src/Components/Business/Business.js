import {React, useState, useEffect} from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import './Business.css';
import "aos/dist/aos.css";
function Business(){
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    useEffect(()=>{
        function handleResize(){
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener("resize", handleResize);
          };
    })
    const cardStyle1={
        height:"350px",
        backgroundColor:"black",
        borderColor:"#FFFFFF",
        borderWidth:"2px",
        overflowY:"auto"
    };
    const cardStyle2={
        height:"100px",
        backgroundColor:"black",
        borderColor:"#FFFFFF",
        borderWidth:"2px",
        overflowY:"auto"
    };
    const textStyle={
        fontFamily:"Menlo",
        color:"#29FE13"
    }
    return(
        <Container style={{height:height}}>
            <div class="header-text" data-aos="fade-right">
                Business/Entrepreneurship
            </div>
            <Row style={{marginTop:"100px"}}>
                <Col>
                    <div data-aos="fade-right">
                        <Card style={cardStyle1}>
                            <Card.Header/>
                            <Card.Title style={textStyle}>
                                DECA
                            </Card.Title>
                            <Card.Body style={textStyle}>

                            </Card.Body>
                        </Card>
                    </div>
                </Col>
                <Col>
                    <div data-aos="fade-left">
                        <Card style={cardStyle1}>
                            <Card.Header/>
                            <Card.Title style={textStyle}>
                                VC Assist
                            </Card.Title>  
                            <Card.Body style={textStyle}>

                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>
            <Row style={{marginTop:"20px"}}>
                <div data-aos="fade-up">
                    <Card style={cardStyle2}>
                        <Card.Header/>
                        <Card.Title style={textStyle}>
                            Management and Technology Summer Institute
                        </Card.Title>
                        <Card.Body style={textStyle}>

                        </Card.Body>  
                    </Card>
                </div>
            </Row>
        </Container>
    )
}
export default Business;