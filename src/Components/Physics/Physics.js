import {React,useEffect, useState} from 'react';
import {Container, Row, Col, Modal} from 'react-bootstrap';
import "./Physics.css"
function Physics(){
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [earthBorderWidth, setearthBorderWidth] = useState(0);
    const [moonBorderWidth, setMoonBorderWidth] = useState(0);
    const [moonWidth, setMoonWidth] = useState(30);
    const [showIss, setIss] = useState(false);
    const [showComp, setComp] = useState(false);
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
                        <div class="moon" style={{marginLeft:window.innerWidth*(0.2)-moonWidth/2, borderWidth:moonBorderWidth.toString()+"px", borderColor:"#FFFFFF", borderStyle:"solid", transform:"translateY(-50%)"}} onMouseEnter={moonMouseEnter} onMouseLeave={moonMouseLeave} onClick={()=>setComp(true)}/>
                    </div>
                </Row>
                <div data-aos="fade-right" class="earth" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} onClick={()=>{setIss(true)}} style={{top:3.5*height-25, left:0.5*width-25, borderWidth:earthBorderWidth.toString()+"px", borderColor:"#FFFFFF", borderStyle:"solid"}}/>
            </Col>
            <Modal show={showIss} onHide={handleCloseIss}>
                
            </Modal>
            <Modal show={showComp} onHide={handleCloseComp}>

            </Modal>
        </Container>
    )
}
export default Physics;