import {React,useState, useEffect} from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import Roshan from './Resources/roshan.png';
import Resumes from './Resources/Roshan_Bellary_Resume.pdf';
function Resume(){
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
    return (
        <Container style={{height:height}}>
            <div class="header-text" data-aos="fade-right">
                Resume
            </div>
            <Row>
                <Col>
                    <div data-aos="fade-right">
                        <img src={Roshan} style={{height:height-75, width:"auto"}}/>
                    </div>
                </Col>
                <Col style={{height:height-75, color:"#29FE13", fontFamily:"Menlo", paddingLeft:"0px"}}>
                    <div data-aos="fade-left">
                        <Card style={{backgroundColor:"black", border:"2px white solid", overflowY:"auto"}}>
                            <Card.Header/>
                            <Card.Title>
                                <b>Bio</b>
                            </Card.Title>
                            <Card.Body style={{textAlign:"left", fontSize:"12px"}}>
                                Roshan Bellary is a web/app developer and entrepreneur currently studying at the University of Pennsylvania M&T Program. He has a passion for algorithmic
                                creation stemming from his competitive programming experience which he wants
                                to explore in both business and physics applications. His favorite hobbies
                                include 3d printing, board games, drinking copious amounts of coffee and
                                spending inordinate amounts of time on Spotify.
                            </Card.Body>
                        </Card>
                    </div>
                    <div data-aos="fade-left" style={{marginTop:"10px"}}>
                        <Card style={{backgroundColor:"black", border:"2px white solid", overflowY:"auto"}}>
                            <Card.Header/>
                            <Card.Title>
                                <b>Leadership Experience</b>
                            </Card.Title>
                            <Card.Body style={{textAlign:"left", fontSize:"12px"}}>
                                <Row>
                                    <Col>
                                        <div data-aos="fade-right">
                                            <Card style={{backgroundColor:"black", border:"2px white solid", overflowY:"auto", height:"200px"}}>
                                                <Card.Header/>
                                                <Card.Title style={{textAlign:"center", fontSize:"15px", marginBottom:"0px"}}>
                                                    Research Lead <br/>
                                                    @ VC ISS Program
                                                    <p style={{textAlign:"center", fontSize:"12px", marginTop:"5px"}}>
                                                        2022
                                                    </p>
                                                </Card.Title>
                                                <Card.Body style={{textAlign:"left", fontSize:"12px", marginTop:"0px", paddingTop:"0px"}}>
                                                    Lead research for 80+ students of VC ISS Program by editing papers
                                                    for research journals
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div data-aos="fade-up">
                                            <Card style={{backgroundColor:"black", border:"2px white solid", overflowY:"auto", height:"200px"}}>
                                                <Card.Header/>
                                                <Card.Title style={{textAlign:"center", fontSize:"15px", marginBottom:"0px"}}>
                                                    Team Lead <br/>
                                                    @ VC ISS Program
                                                    <p style={{textAlign:"center", fontSize:"12px", marginTop:"5px"}}>
                                                        2021-2022
                                                    </p>
                                                </Card.Title>
                                                <Card.Body style={{textAlign:"left", fontSize:"12px", marginTop:"0px", paddingTop:"0px"}}>
                                                    Lead team of 8 to create an experiment on microbial fuel cells
                                                    in microgravity.
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div data-aos="fade-left">
                                            <Card style={{backgroundColor:"black", border:"2px white solid", overflowY:"auto", height:"200px"}}>
                                                <Card.Header/>
                                                <Card.Title style={{textAlign:"center", fontSize:"15px", marginBottom:"0px"}}>
                                                    Software Officer <br/>
                                                    @ VC DECA
                                                    <p style={{textAlign:"center", fontSize:"12px", marginTop:"5px"}}>
                                                        2021
                                                    </p>
                                                </Card.Title>
                                                <Card.Body style={{textAlign:"left", fontSize:"12px", marginTop:"0px", paddingTop:"0px"}}>
                                                    Lead team of 3 to develop features for VC DECA website and app.
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </div>
                    <div data-aos="fade-left" style={{marginTop:"10px"}}>
                        <Card style={{backgroundColor:"black", border:"2px white solid", overflowY:"auto"}}>
                            <Card.Header/>
                            <Card.Title>
                                <b>Awards & Honors</b>
                            </Card.Title>
                            <Card.Body style={{marginBottom:"0px", paddingBottom:"0px"}}>
                                <Row>
                                    <Col>
                                        <ul style={{textAlign:"left", fontSize:"12px"}}>
                                            <li>
                                                <b>USA Computing Olympiad</b> Gold Ranking
                                            </li>
                                            <li>
                                                <b>USA Physics Olympiad</b> Bronze Medal
                                            </li>
                                            <li>
                                                <b>ASGSR</b> 2nd Place HS Project
                                            </li>
                                            <li>
                                                3x <b>AIME</b> Qualifier
                                            </li>
                                        </ul>
                                    </Col>
                                    <Col>
                                        <ul style={{textAlign:"left", fontSize:"12px"}}>
                                            <li>
                                                <b>Mathleague Nationals</b> 9th place(10th grade)
                                            </li>
                                            <li>
                                                <b>Mathleague States</b> 9th Overall
                                            </li>
                                            <li>
                                                <b>California Legislative Assembly</b> Certificate of Recognition
                                            </li>
                                        </ul>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Title style={{marginTop:"0px", paddingTop:"0px"}}>
                                <b>Programs</b>
                            </Card.Title>
                            <Card.Body style={{textAlign:"left", fontSize:"12px"}}>
                                <Row>
                                    <Col style={{textAlign:"center"}}>
                                        <u>2022</u><br/>
                                        M&TSI
                                    </Col>
                                    <Col style={{textAlign:"center"}}>
                                        <u>2021</u><br/>
                                        QCSYS<br/>
                                        Wharton Data Science Academy
                                    </Col>
                                    <Col style={{textAlign:"center"}}>
                                        <u>2020</u><br/>
                                        Mathily
                                    </Col>
                                    <Col style={{textAlign:"center"}}>
                                        <u>2019</u><br/>
                                        HSMC
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default Resume;