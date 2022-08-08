import {React,useEffect, useCallback, useState} from 'react';
import {Container, Col} from 'react-bootstrap';
import "./Description.css";
import "aos/dist/aos.css";
function Description(){
    const barStyle = {
        height: "50px",
        margin:"auto",
        backgroundColor: "white",
        width: "2px"
    };
    const textStyle = {
        fontFamily: "Menlo",
        color:"#29FE13",
        fontSize:"20px",
        marginBottom:"0px"
    }
    let containerStyle = {
        top: "50%",
        left: "50%",
        marginTop: (parseInt(window.innerHeight/2)-170).toString()+"px"
    };
    console.log((toString(window.innerHeight/2-75)+"px"));
    const [y, setY] = useState(window.scrollY);
    const [key, setKey] = useState(Math.random());
    const handleNavigation = useCallback(
        e => {
          const window = e.currentTarget;
          if (y > window.scrollY && window.scrollY<=75) {
            setKey(Math.random());
          }
          setY(window.scrollY);
        }, [y]
      );
      useEffect(() => {
        setY(window.scrollY);
        window.addEventListener("scroll", handleNavigation);
      
        return () => {
          window.removeEventListener("scroll", handleNavigation);
        };
      }, [handleNavigation]);
    return(
        <Container style={{height:window.innerHeight}}>
            <div class="typewriter" data-aos="fade-right">
                <div key={key} class="typewriter-text">
                    Roshan Bellary
                </div>
            </div>
            <div style={containerStyle} data-aos="fade-right">
                <p style={textStyle}>
                    Programmer
                </p>
                <div style={barStyle}/>
                <p style={textStyle}>
                    Mathematician
                </p>
                <div style={barStyle}/>
                <p style={textStyle}>
                    Researcher
                </p>
            </div>
        </Container>
    )
}
export default Description;