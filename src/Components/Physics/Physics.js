import {React,useEffect, useState} from 'react';
import {Container, Row, Col, Modal, Card} from 'react-bootstrap';
import Poster from './Resources/poster.pdf';
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
                <Row>
                    <div data-aos="fade-left" style={{fontSize:"12px", color:"#29FE13", fontFamily:"Menlo"}}>
                        <b>Psssst...click on the Moon and the Earth</b>
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
                                    <Card.Body style={{color:"#29FE13", textAlign:"left", textIndent:"20px"}}>
                                        <ul id="list-style">
                                            <li>Attained a <span style={{color:"#CD7F32"}}> Bronze</span> medal in the USA Physics Olympiad. Scored in top 100 in the nation
                                            </li>
                                            <li>
                                                Have participated in...
                                                <ul>
                                                    <li>USAPHO</li>
                                                    <li>F=MA</li>
                                                    <li>Opho</li>
                                                    <li>Physics Bowl</li>
                                                </ul>
                                            </li>
                                            <li>
                                                Cofounded and served as an officer for the USAPHO Club
                                                <ul>
                                                    <li>Prepared members for physics competitions</li>
                                                    <li>Worked on creating handouts which introduce hard physics concepts to members</li>
                                                </ul>
                                            </li>
                                        </ul>
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
                                    <Card.Body style={{textAlign:"left", textIndent:"20px"}}>
                                        <ul id="list-style">
                                            <li>
                                                Taken multiple online physics courses including:
                                                <ul>
                                                    <li>
                                                        Mechanics: Kinematics, Dynamics and Harmonic from MITx
                                                    </li>
                                                    <li>
                                                        Electricity and Magnetism from MITx
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                Achieved 5s in both AP Physics C Mechanics and AP Physics C E&M
                                            </li>
                                            <li>
                                                Read physics books such as:
                                                <ul>
                                                    <li>
                                                        <i>Introduction to Mechanics</i> by David Morin
                                                    </li>
                                                    <li>
                                                        <i>Feynman's Lectures</i> by Richard Feynman
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
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
                                    <Card.Body style={{textAlign:"left", overflowY:"auto", textIndent:"20px"}}>
                                        <ul>
                                            <li>
                                                Led a team of 8 to develop experiment which studied the efficacy of a biofilm microbial fuel cell(BMFC)
                                                in microgravity
                                            </li>
                                            <li>
                                                Constructred and sent the BMFC to the International Space Station to test its voltage production over time
                                            </li>
                                            <li>
                                                Presented results in a Research Poster at the American Society for Gravitational and Space Research(ASGSR) Conference
                                            </li>
                                            <li>
                                                Attained 1st Place in the high school division at ASGSR
                                            </li>
                                            <li>
                                                <b>
                                                    <a href={Poster} target="_blank" style={{color:"#29FE13"}}>
                                                        Research Poster
                                                    </a>
                                                </b>
                                            </li>
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </ReactCardFlip>
                        </Col>
                        <Col>
                            <ReactCardFlip isFlipped={flipFerro}>
                                <Card style={{backgroundColor:"black", borderWidth:"2px", border:"solid", height:"450px", overflowY:"auto"}} onMouseEnter={()=>{setFerro(true);setFuel(false);}}>
                                    <Card.Header/>
                                    <Card.Title style={{textAlign:"center"}}>
                                        <b>Astronomy Research</b>
                                    </Card.Title>
                                    <Card.Body>
                                        <Card.Img src={physics} className="image-card"/>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Card.Img src={flip} style={{height:"30px", width:"30px", marginLeft:"auto", marginRight:"auto", display:"block", transform:"translateY(-50%)"}}/>
                                    </Card.Footer>
                                </Card>
                                <Card style={{backgroundColor:"black", borderWidth:"2px", border:"solid", height:"450px", overflowY:"auto"}} onMouseLeave={()=>{setFerro(false);}}>
                                    <Card.Body style={{textAlign:"left", overflowY:"auto", textIndent:"20px"}}>
                                        <ul>
                                            <li>
                                                <b>Astrometric Observations of Double Stars</b>
                                                <ul>
                                                    <li>
                                                        Analyzed 4 double star systems 
                                                    </li>
                                                    <li>
                                                        Estimated star masses, PA, SEP, and proper motions to determine if the systems were gravitationally bound
                                                    </li>
                                                    <li>
                                                        <b>
                                                            <a href="http://www.jdso.org/volume19/number2/Angeles_189_198.pdf" style={{color:"#29FE13"}}>
                                                                Published Research Paper
                                                            </a>
                                                        </b>    
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <b>Investigation of an Eclipsing Binary</b>
                                                <ul>
                                                    <li>Formulated Light Curves and Calculated Period for Eclipsing Binary ASAS J134708-6350.3</li>
                                                    <li>
                                                        Research Paper: Coming Soon
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <b>More to Come :)</b>
                                            </li>
                                        </ul>
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