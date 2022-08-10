import {React,useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
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
        </Container>
    )
}
export default Resume;