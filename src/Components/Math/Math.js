import React from 'react';
import {Container} from 'react-bootstrap';
class Math extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Container style={{height:window.innerHeight}}>
                <div class="header-text" data-aos="fade-right">
                    Mathematics
                </div>
            </Container>
        )
    }
}
export default Math;