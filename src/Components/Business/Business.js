import {React, useState, useEffect} from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import Deca from './Resources/deca.png';
import Education from './Resources/education.png';
import Pitch from './Resources/pitch.png';
import Web from './Resources/web.png';
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
        height:"415px",
        backgroundColor:"black",
        borderColor:"#FFFFFF",
        borderWidth:"2px",
        overflowY:"auto"
    };
    const cardStyle2={
        height:"175px",
        backgroundColor:"black",
        borderColor:"#FFFFFF",
        borderWidth:"2px",
        overflowY:"auto"
    };
    const textStyle={
        fontFamily:"Menlo",
        color:"#29FE13",
    }
    return(
        <Container style={{height:height}}>
            <div class="header-text" data-aos="fade-right">
                Business/Entrepreneurship
            </div>
            <Row style={{marginTop:"20px"}}>
                <Col>
                    <div data-aos="fade-right">
                        <Card style={cardStyle1}>
                            <Card.Header/>
                            <Card.Title style={textStyle}>
                                DECA
                            </Card.Title>
                            <Card.Body style={{fontFamily:"Menlo", color:"#29FE13", textAlign:"left"}}>
                                <Card.Img src={Deca} style={{height:"100px", width:"auto", marginLeft:"auto", marginRight:"auto", display:"block"}}/>
                                <p style={{marginTop:"10px"}}>
                                    I served as a Software and Operations officer for the VCHS DECA Chapter(180+ members) managing mock conferences and 
                                    registration for DECA conferences along with working on VC DECA's website and app.
                                </p>
                                <Col style={{textAlign:"center"}}>
                                    <b><u>DECA Awards</u></b>
                                </Col>
                                <Row style={{textAlign:"center"}}>
                                    <Col style={{textAlign:"center"}}>
                                        Top 10 Overall<br/>
                                        PFL<br/>
                                        @ SCDC 2021
                                    </Col>
                                    <Col style={{textAlign:"center"}}>
                                        Top 10 Overall<br/>
                                        PFL<br/>
                                        @ SCDC 2022
                                    </Col>
                                    <Col style={{textAlign:"center"}}>
                                        2nd Place Overall<br/>
                                        PFL<br/>
                                        @ SCDC 2022
                                    </Col>
                                </Row>
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
                            <Card.Body style={{fontFamily:"Menlo", color:"#29FE13", textAlign:"left"}}>
                                <Card.Img src={Education} style={{height:"100px", width:"auto", marginLeft:"auto", marginRight:"auto", display:"block"}}/>
                                <p style={{marginTop:"10px"}}>
                                    I work as a frontend developer at VC Assist, a startup at my school with 1000+ customers. 
                                </p>
                                <Row>
                                    <p style={{textAlign:"center"}}>
                                        <b><u>My Work</u></b>
                                    </p>
                                    <Row>
                                        <Col style={{textAlign:"center"}}>
                                            <Card.Img src={Pitch} style={{height:"40px", width:"auto", marginRight:"auto", marginLeft:"auto", display:"block"}}/>
                                            Pitching to<br/>
                                            Investors &<br/>
                                            Donators
                                        </Col>
                                        <Col style={{textAlign:"center"}}>
                                            <Card.Img src={Web} style={{height:"40px", width:"auto", marginRight:"auto", marginLeft:"auto", display:"block"}}/>
                                            Developing<br/>
                                            Website &<br/>
                                            Portals
                                        </Col>
                                    </Row>
                                </Row>
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
                        <Card.Body style={{textAlign:"left",fontFamily:"Menlo",color:"#29FE13"}}>
                            At M&TSI, I learned both entrepreneurship and engineering culminating in
                            a product that I created with my team called, TagBag. We won best overall 
                            for our product and business plan. 
                            <p style={{textAlign:"center"}}>
                                <a href="https://devpost.com/software/tagbag" target="_blank" rel="noreferrer" style={textStyle}>
                                    TagBag
                                </a>
                            </p>
                        </Card.Body>  
                    </Card>
                </div>
            </Row>
        </Container>
    )
}
export default Business;