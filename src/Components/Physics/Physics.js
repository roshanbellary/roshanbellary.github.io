import React from 'react';
import {Container} from 'react-bootstrap';
class Physics extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Container style={{height:window.innerHeight}}>
                <div class="header-text">
                    Physics
                </div>
            </Container>
        )
    }
}
export default Physics;