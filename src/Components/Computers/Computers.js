import {React, useState, useEffect} from 'react';
import {Container, Card, Row, Col, Collapse, CloseButton} from 'react-bootstrap';
import "./Computers.css";
import "aos/dist/aos.css";
function Computer(){
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [cardbgcolor, setCardBgColor] = useState(["#000000","#000000","#000000"]);
    const [show, setShow] = useState([false, false, false]);
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
        let on = show[0]|show[1]|show[2];
        if (on){
            return;
        }else{
            setShow([true,false,false])
        }
    }
    function DeveloperOnClick(){
        let on = show[0]|show[1]|show[2];
        if (on){
            return;
        }else{
            setShow([false,true,false])
        }
    }
    function ProgrammerOnClick(){
        let on = show[0]|show[1]|show[2];
        if (on){
            return;
        }else{
            setShow([false,false,true])
        }
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
        <Container style={{height:height}}>
            <div class="header-text" data-aos="fade-right">
                Computer Science
            </div>
            <Row style={{height:"100px", marginTop:"100px"}}>
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
                                    Frontend Development
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
            <Row className="display-flex">
                <Collapse in={show[0]} dimension="width" timeout={500}>
                    <Card style={descripStyle}>
                        <Card.Header>
                            <CloseButton variant="white" onClick={()=>setShow([false,false,false])} style={{marginLeft:"100%", marginRight:"0%"}}/>
                        </Card.Header>
                        <Card.Title>
                            <p style={textStyle}>
                                Data Analyst
                            </p>
                        </Card.Title>
                        <Card.Body>
                            
                        </Card.Body>
                    </Card>
                </Collapse>
                <Collapse in={show[1]} dimension="width" timeout={500}>
                    <Card style={descripStyle}>
                        <Card.Header>
                            <CloseButton variant="white" onClick={()=>setShow([false,false,false])} style={{marginLeft:"100%", marginRight:"0%"}}/>
                        </Card.Header>
                        <Card.Title>
                            <p style={textStyle}>
                                Frontend Developer
                            </p>
                        </Card.Title>
                        <Card.Body>
                            
                        </Card.Body>
                    </Card>
                </Collapse>
                <Collapse in={show[2]} dimension="width" timeout={500}>
                    <Card style={descripStyle}>
                        <Card.Header>
                            <CloseButton variant="white" onClick={()=>setShow([false,false,false])} style={{marginLeft:"100%", marginRight:"0%"}}/>
                        </Card.Header>
                        <Card.Title>
                            <p style={textStyle}>
                                Competitive Programmer
                            </p>
                        </Card.Title>
                        <Card.Body>
                            
                        </Card.Body>
                    </Card>
                </Collapse>
            </Row>
        </Container>
    )
}
export default Computer;