import {React,useEffect, useState} from 'react';
import {Container, Row, Col, Modal, Card} from 'react-bootstrap';
import Typewriter from "typewriter-effect";
import ReactCardFlip from 'react-card-flip';
import physics from './Resources/physics.png';
import flip from './Resources/flip.png'
import "./Physics.css"
function Physics(){
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [earthBorderWidth, setearthBorderWidth] = useState(0);
    const [moonBorderWidth, setMoonBorderWidth] = useState(0);
    const [moonWidth, setMoonWidth] = useState(30);
    const [showIss, setIss] = useState(false);
    const [showComp, setComp] = useState(false);
    const [mKey, setMKey] = useState(Math.random());
    const [flipUsapho, setUsapho] = useState(false);
    const [flipComp, setCompet] = useState(false);
    const [flipFuel, setFuel] = useState(false);
    const [flipFerro, setFerro] = useState(false);
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
    const handleCloseIss = () => setIss(false);
    const handleCloseComp = () => setComp(false);
    function mouseEnter(){
        setearthBorderWidth(3);
    }
    function mouseLeave(){
        setearthBorderWidth(0);
    }
    function moonMouseEnter(){
        setMoonBorderWidth(3);
        setMoonWidth(30*1.5);
    }
    function moonMouseLeave(){
        setMoonBorderWidth(0);
        setMoonWidth(30);
    }
    return(
        <Container style={{height:height}}>
            <Col>
                <Row>
                    <div class="header-text" data-aos="fade-right">
                        Physics
                    </div>
                </Row>
                <Row data-aos="fade-right" id="planet row" style={{marginTop:window.innerHeight/2-75-window.innerWidth*(0.2), padding:"0px"}}>
                    <div class="orbit" style={{width:window.innerWidth*(0.4), height:window.innerWidth*(0.4)}}>
                        <div class="moon" key={mKey} style={{marginLeft:window.innerWidth*(0.2)-moonWidth/2, borderWidth:moonBorderWidth.toString()+"px", borderColor:"#FFFFFF", borderStyle:"solid", transform:"translateY(-50%)"}} onMouseEnter={moonMouseEnter} onMouseLeave={moonMouseLeave} onClick={()=>setComp(true)}/>
                    </div>
                </Row>
                <div data-aos="fade-right" class="earth" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} onClick={()=>{setIss(true)}} style={{top:3.5*height-25, left:0.5*width-25, borderWidth:earthBorderWidth.toString()+"px", borderColor:"#FFFFFF", borderStyle:"solid"}}/>
            </Col>
            <Modal className="special-modal" show={showIss} onHide={handleCloseIss} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Typewriter onInit={(typewriter) => {
                            typewriter.typeString('My Foray Into Theoretical Physics')
                            .start();
                        }}/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <ReactCardFlip isFlipped={flipUsapho} flipDirection="horizontal">
                                <Card style={{backgroundColor:"black", borderWidth:"2px", border:"solid", height:"450px", overflowY:"auto"}} onMouseEnter={()=>{setUsapho(true);setCompet(false);}}>
                                    <Card.Header/>
                                    <Card.Title style={{textAlign:"center"}}>
                                        <b>Competitive Physics</b>
                                    </Card.Title>
                                    <Card.Body>
                                        <Card.Img src={physics} className="image-card"/>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Card.Img src={flip} style={{height:"30px", width:"30px", marginLeft:"auto", marginRight:"auto", display:"block", transform:"translateY(-50%)"}}/>
                                    </Card.Footer>
                                </Card>
                                <Card style={{backgroundColor:"black", borderWidth:"2px", border:"solid", height:"450px", overflowY:"auto"}} onMouseLeave={()=>{setUsapho(false);}}>
                                    <Card.Body style={{color:"#29FE13", textAlign:"center"}}>
                                        I placed in the <b>top 100 students</b> in the nation in the USA Physics Olympiad attaining a <span style={{color:"#CD7F32"}}> Bronze</span> medal.
                                        In addition, I've also participated in other physics competitions such as the Online Physics Olympiad and Physics Bowl.
                                        At VCHS, I co-founded and served as an officer for the USAPHO club which teaches members concepts in competitive physics
                                        and prepares them for physics competitions. As an officer, I helped develop handouts
                                        which broke up difficult to understand physics concepts into bite-sized chunks.
                                    </Card.Body>
                                </Card>
                            </ReactCardFlip>
                        </Col>
                        <Col>
                            <ReactCardFlip isFlipped={flipComp} flipDirection="horizontal">
                                <Card style={{backgroundColor:"black", borderWidth:"2px", border:"solid", height:"450px", overflowY:"auto"}} onMouseEnter={()=>{setCompet(true); setUsapho(false);}}>
                                    <Card.Header/>
                                    <Card.Title style={{textAlign:"center"}}>
                                        <b>Academic Physics</b>
                                    </Card.Title>
                                    <Card.Body>
                                        <Card.Img src={physics} className="image-card"/>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Card.Img src={flip} style={{height:"30px", width:"30px", marginLeft:"auto", marginRight:"auto", display:"block", transform:"translateY(-50%)"}}/>
                                    </Card.Footer>
                                </Card>
                                <Card style={{backgroundColor:"black", borderWidth:"2px", border:"solid", height:"450px", overflowY:"auto"}} onMouseLeave={()=>{setCompet(false);}}>
                                    <Card.Body style={{textAlign:"center"}}>
                                        To deepen my knowledge of physics, I've done a combination of online courses,
                                        regular courses and read through physics books. I first studied physics through MIT's
                                        online OCW courses where I've gone through everything from Mechanics up to E&M.
                                        At VCHS, I've taken Ap Physics C E&M and Mechanics and received a 5 on both AP tests. Finally, I've read physics
                                        books such as Feynman's lectures, Resnick and Halliday, and my personal favorite <em>Introduction to Mechanics</em> by David Morin.
                                    </Card.Body>
                                </Card>
                            </ReactCardFlip>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
            <Modal className="special-modal" show={showComp} onHide={handleCloseComp} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Typewriter onInit={(typewriter)=>{
                            typewriter.typeString('Physics Research In Space')
                            .start();
                        }}/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <ReactCardFlip isFlipped={flipFuel}>
                                <Card style={{backgroundColor:"black", borderWidth:"2px", border:"solid", height:"450px"}} onMouseEnter={()=>{setFuel(true);setFerro(false);}}>
                                    <Card.Header/>
                                    <Card.Title style={{textAlign:"center"}}>
                                        <b>Microgravity MFC</b>
                                    </Card.Title>
                                    <Card.Body>
                                        <Card.Img src={physics} className="image-card"/>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Card.Img src={flip} style={{height:"30px", width:"30px", marginLeft:"auto", marginRight:"auto", display:"block", transform:"translateY(-50%)"}}/>
                                    </Card.Footer>
                                </Card>
                                <Card style={{backgroundColor:"black", borderWidth:"2px", border:"solid", height:"450px", overflowY:"auto"}} onMouseLeave={()=>{setFuel(false);}}>
                                    <Card.Body style={{textAlign:"center", overflowY:"auto"}}>
                                        I led the development and research of an experiment which studied the efficacy of
                                        a biofilm microbial fuel cell in microgravity. Using a S. Oneidensis(an electroactive bacteria) biofilm on the anodic side of the cell, 
                                        we constructed and sent a fully functioning microgravity microbial fuel cell up 
                                        to the International Space Station to test its voltage production over time.
                                        We are currently in the middle of publishing our research paper detailing our results.
                                    </Card.Body>
                                </Card>
                            </ReactCardFlip>
                        </Col>
                        <Col>
                            <ReactCardFlip isFlipped={flipFerro}>
                                <Card style={{backgroundColor:"black", borderWidth:"2px", border:"solid", height:"450px", overflowY:"auto"}} onMouseEnter={()=>{setFerro(true);setFuel(false);}}>
                                    <Card.Header/>
                                    <Card.Title style={{textAlign:"center"}}>
                                        <b>Ferrofluid Energy Transfer</b>
                                    </Card.Title>
                                    <Card.Body>
                                        <Card.Img src={physics} className="image-card"/>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Card.Img src={flip} style={{height:"30px", width:"30px", marginLeft:"auto", marginRight:"auto", display:"block", transform:"translateY(-50%)"}}/>
                                    </Card.Footer>
                                </Card>
                                <Card style={{backgroundColor:"black", borderWidth:"2px", border:"solid", height:"450px", overflowY:"auto"}} onMouseLeave={()=>{setFerro(false);}}>
                                    <Card.Body style={{textAlign:"center", overflowY:"auto"}}>
                                        I worked as the deputy lead of a team which studied the efficacy of using
                                        ferrofluid as a method of energy transfer in microgravity. 
                                        We developed and sent a chamber to the ISS which heated ferrofluid on one end and used electromagnets to propel the fluid
                                        to the other side of the chamber whereupon the temperature was measured. Sadly due to a failure in the microcontroller
                                        system for our experiment, we were unable to receive a significant amount of data.
                                    </Card.Body>
                                </Card>
                            </ReactCardFlip>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </Container>
    )
}
export default Physics;