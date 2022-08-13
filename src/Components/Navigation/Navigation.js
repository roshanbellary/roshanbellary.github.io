import React, {useState, useEffect} from 'react';
import {Col,Row} from 'react-bootstrap';
import Social from '../Social/Social.js';
import "./Navigation.css";
class Circle extends React.Component{
    constructor(props){
        super(props);// current which indicates whether or not we're on page, number which indicates which circle it is
    }
    clickPage(n){
        window.scrollTo({top:window.innerHeight*n,left:0});
    }
    render(){
        if (this.props.current){
            const style={
                width:28,
                height:28,
                borderRadius:28,
                backgroundColor:"#29FE13" 
            }
            return(
                <div style={style} onClick={()=>{this.clickPage(this.props.number)}}/>
            )
        }else{
            const style={
                width:28,
                height:28,
                borderRadius:28,
                backgroundColor:"black",
                border: "1px solid white"
            }
            return(
                <div style={style} onClick={()=>{this.clickPage(this.props.number)}}/>
            )
        }
    }
}
function Navigation(){
    const [pages, setPage] = useState([true, false,false,false,false]);
    useEffect(() => {
        const checkPosition = () => {
            const position = window.pageYOffset;
            let nstate = [false,false,false,false,false];
            if (position<window.innerHeight/2) nstate[0]=true;
            else{
                let p = Math.floor((position+window.innerHeight/2)/window.innerHeight);
                nstate[p]=true;
            }
            setPage(nstate);
        }
        window.addEventListener("scroll", checkPosition, { passive: true });
        return () => window.removeEventListener("scroll", checkPosition);
    }, [pages]);
    let compList = [];
    let i = 0;
    for (let v of pages){
        let style={
            marginTop:"10px",
            alignItems:"center",
            width:"28px",
            marginRight:"0px"
        };
        if (i==0) style={};
        compList.push(
            <Row style={style}>
                 <Circle current={v} number={i}/>
            </Row>
        );
        i=i+1;
    }
    const barStyle = {
        height: "100%",
        position: "absolute",
        zIndex: -1,
        backgroundColor: "white",
        width: "1px"
    };
    return(
        <div>
            <Social/>
            <Col id="navbar-vert">
                <div style={barStyle}/>
                {compList}
            </Col>
        </div>
    )
}
export default Navigation;