import React from 'react';
import {Col} from 'react-bootstrap';
import Discord from './Resources/discord.png';
import Instagram from './Resources/instagram.png';
import Linkedin from './Resources/linkedin.png';
import Email from './Resources/email.png';
import Github from './Resources/github.png';
import {Popover, OverlayTrigger} from 'react-bootstrap';
import Typewriter from "typewriter-effect";
import './Social.css';
function Social(){
    const popover = (
        <Popover style={{backgroundColor:"#000000", border:"solid 2px #29FE13"}}>
          <Popover.Body style={{color:"#29FE13", fontFamily:"Menlo"}}>
            <Typewriter onInit={(typewriter) => {
                typewriter.typeString('robell#9022')
                .start();
            }}/>
          </Popover.Body>
        </Popover>
    );
    return(
        <div style={{position:"fixed", left:"96.25%",top:"5%"}}>
            <Col style={{width:"28px"}}>
                <a href="https://github.com/roshanbellary" target="_blank" rel="noreferrer">
                    <img className="disc" src={Github} style={{width:"28px", height:"auto"}}/>
                </a>
                <OverlayTrigger trigger="click" placement="left" overlay={popover}>
                    <img className="disc" src={Discord} style={{width:"28px", height:"auto", marginTop:"10px"}}/>
                </OverlayTrigger>
                <a href="https://instagram.com/roshan.bellary/" target="_blank" rel="noreferrer">
                    <img className="disc" src={Instagram} style={{width:"28px", height:"auto", marginTop:"10px"}}/>
                </a>
                <a href="https://www.linkedin.com/in/roshanbellary/" target="_blank" rel="noreferrer">
                    <img className="disc" src={Linkedin} style={{width:"28px", height:"auto", marginTop:"10px"}}/>
                </a>
                <a href="mailto:roshan.bellary@gmail.com">
                    <img className="disc" src={Email} style={{width:"28px", height:"auto", marginTop:"10px"}}/>
                </a>
            </Col>
        </div>
    )
}
export default Social;