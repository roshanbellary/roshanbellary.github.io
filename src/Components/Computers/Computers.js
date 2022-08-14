import {React, useState, useEffect} from 'react';
import {Container, Card, Row, Col, Collapse, CloseButton} from 'react-bootstrap';
import "./Computers.css";
import Typewriter from "typewriter-effect";
import Poster from './Resources/poster.png';
import Paper from './Resources/Research_Paper.pdf';
import Usaco from './Resources/usaco.png';
import "aos/dist/aos.css";
function Computer(){
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [cardbgcolor, setCardBgColor] = useState(["#000000","#000000","#000000"]);
    const [show, setShow] = useState([false, false, true]);
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
    function AnalystOnClick(){
        setShow([false,false,false]);
        setShow([true,false,false]);
    }
    function DeveloperOnClick(){
        setShow([false,false,false]);
        setShow([false,true,false]);
    }
    function ProgrammerOnClick(){
        setShow([false,false,false]);
        setShow([false,false,true]);
    }
    let cardStyles = [
        {
            backgroundColor:cardbgcolor[0],
            borderColor:"#FFFFFF",
            borderWidth:"2px"
        },
        {
            backgroundColor:cardbgcolor[1],
            borderColor:"#FFFFFF",
            borderWidth:"2px"
        },
        {
            backgroundColor:cardbgcolor[2],
            borderColor:"#FFFFFF",
            borderWidth:"2px"
        }
    ];
    const textStyle={
        fontFamily: "Menlo",
        color:"#29FE13",
    };
    const descripStyle={
        height:"350px",
        width:"100%",
        backgroundColor:"black",
        borderColor:"#FFFFFF",
        borderWidth:"2px",
        overflowY:"auto"
    };
    let poss = [
        ["#FFFFFF","#000000","#000000"],
        ["#000000","#FFFFFF","#000000"],
        ["#000000","#000000","#FFFFFF"],
        ["#000000","#000000","#000000"]
    ];
    return(
        <Container style={{height:height}}>
            <div class="header-text" data-aos="fade-right">
                Computer Science
            </div>
            <Col>
                <Row style={{height:"100px", marginTop:"20px"}}>
                    <Col>
                        <div data-aos="fade-right">
                            <Card style={cardStyles[0]} onMouseEnter={() => setCardBgColor(poss[0])} onMouseLeave={()=> setCardBgColor(poss[3])} onClick={AnalystOnClick}>
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
                            <Card style={cardStyles[1]} onMouseEnter={() => setCardBgColor(poss[1])} onMouseLeave={()=> setCardBgColor(poss[3])} onClick={DeveloperOnClick}>
                                <Card.Body>
                                    <div style={textStyle}>
                                        Web Development
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col>
                        <div data-aos="fade-left">
                            <Card style={cardStyles[2]} onMouseEnter={() => setCardBgColor(poss[2])} onMouseLeave={()=> setCardBgColor(poss[3])} onClick={ProgrammerOnClick}>
                                <Card.Body>
                                    <div style={textStyle}>
                                        Competitive Programming
                                    </div>                                   
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <div>
                    <Row>
                        <div>
                            <Collapse in={show[0]} dimension="width" timeout={500}>
                                <Card style={descripStyle}>
                                    <Card.Header/>
                                    <Card.Title>
                                        <div style={textStyle}>
                                            <Typewriter onInit={(typewriter) => {
                                                typewriter.typeString('Data Analysis')
                                                .start();
                                            }}/>
                                        </div>
                                    </Card.Title>
                                    <Card.Body style={{fontFamily:"Menlo", color:"#29FE13", textAlign:"left"}}>
                                            With my experience in R and Python, my team and I conducted a data analysis project on the Ukraine-Russia conflict studying
                                        global sentiment surrounding the war using natural language processing, sentiment analysis and tweet geolocation data to classify a dataset of 5000 tweets in the earlier
                                        days of the conflict among 5 different emotions. We wrote a research paper and a poster
                                        detailing the results which we sent to the American Statistical Association Poster Competition.
                                        In addition to the data analysis research, I have also taken AP Statistics and Advanced Data Analysis at VCHS,
                                        the former of which I received a 5 in.
                                        <Row style={{marginTop:"10px"}}>
                                            <Col style={{textAlign:"center", color:"#29FE13"}}>
                                                <a href={Poster} target="_blank" rel="noreferrer" style={{textAlign:"center", color:"#29FE13"}}>
                                                    <b>Poster</b>
                                                </a>
                                            </Col>
                                            <Col style={{textAlign:"center", color:"#29FE13"}}>
                                                <a href={Paper} target="_blank" rel="noreferrer" style={{textAlign:"center", color:"#29FE13"}}>
                                                    <b>Research Paper</b>
                                                </a>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Collapse>
                        </div>
                        <div>
                            <Collapse in={show[1]} dimension="width" timeout={500}>
                                <Card style={descripStyle}>
                                    <Card.Header/>
                                    <Card.Title>
                                        <div style={textStyle}>
                                            <div style={textStyle}>
                                                <Typewriter onInit={(typewriter) => {
                                                    typewriter.typeString('Website Development')
                                                    .start();
                                                }}/>
                                            </div>
                                        </div>
                                    </Card.Title>
                                    <Card.Body style={{fontFamily:"Menlo", color:"#29FE13", textAlign:"left"}}>
                                        Utilizing my knowledge of Javascript and ReactJS and
                                        my experience with HTML and CSS, I've worked on sites for 2 organizations, VC DECA and VC Assist. For VC DECA, I developed
                                        a scheduling feature which handled reminding members about important meetings and 
                                        tracked attendance of members. For VC Assist,
                                        I worked with a team to develop its marketing website. In addition, I also developed this site!
                                        <Row style={{marginTop:"10px"}}>
                                            <Col style={{textAlign:"center"}}>
                                                <b>Sites I worked on:</b>
                                            </Col>
                                        </Row>
                                        <Row style={{marginTop:"10px"}}>
                                            <Col style={{textAlign:"center", color:"#29FE13"}}>
                                                <a href="http://mydeca.org/" rel="noreferrer" target="_blank" style={{textAlign:"center", color:"#29FE13"}}>
                                                    <b>mydeca.org</b>
                                                </a>
                                            </Col>
                                            <Col style={{textAlign:"center", color:"#29FE13"}}>
                                                <a href="https://www.vcassist.org/" rel="noreferrer" target="_blank" style={{textAlign:"center", color:"#29FE13"}}>
                                                    <b>vcassist.org</b>
                                                </a>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Collapse>
                        </div>
                        <div>
                            <Collapse in={show[2]} dimension="width" timeout={500}>
                                <Card style={descripStyle}>
                                    <Card.Header/>
                                    <Card.Title>
                                        <div style={textStyle}>
                                            <Typewriter onInit={(typewriter) => {
                                                typewriter.typeString('Competitive Programming')
                                                .start();
                                            }}/>
                                        </div>
                                    </Card.Title>
                                    <Card.Body style={{fontFamily:"Menlo", color:"#29FE13", textAlign:"left"}}>
                                        Through reading books on algorithms and extensive practice with algorithmic problems, I've attained 
                                        <span style={{color:"gold"}}> Gold</span> ranking in the USA Computing Olympiad, Specialist ranking on Codeforces,
                                        and 5 kyu on Atcoder. At VCHS, I serve as the president of the Competitive Programming Club
                                        where my officers and I teach members important concepts in CS and the world of algorithms
                                        to prepare them for contests like USACO and ACSL.
                                        <Row style={{marginTop:"10px"}}>
                                            <Col style={{textAlign:"center", color:"#29FE13"}}>
                                                <a href="https://codeforces.com/profile/robell" rel="noreferrer" target="_blank" style={{textAlign:"center", color:"#29FE13"}}>
                                                    <b>Codeforces</b>
                                                </a>
                                            </Col>
                                            <Col style={{textAlign:"center", color:"#29FE13"}}>
                                                <a href="https://atcoder.jp/users/robell" rel="noreferrer" target="_blank" style={{textAlign:"center", color:"#29FE13"}}>
                                                    <b>Atcoder</b>
                                                </a>
                                            </Col>
                                            <Col style={{textAlign:"center", color:"#29FE13"}}>
                                                <a href={Usaco} rel="noreferrer" target="_blank" style={{textAlign:"center", color:"#29FE13"}}>
                                                    <b>USACO</b>
                                                </a>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Collapse>
                        </div>
                    </Row>
                </div>
            </Col>
        </Container>
    )
}
export default Computer;