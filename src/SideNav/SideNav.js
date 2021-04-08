import React from "react";
import styled from 'styled-components'
import './SideNav.css';
const SidebarParent = styled.div`
  background: #c34a36;
  width: 250px;
  height: 100vh;
  position:absolute;
  left:0;
  top:0;
`;
const SidebarItem = styled.div`
  padding: 16px 24px;
  transition: all 0.25s ease-in-out;
  //Change the background color if 'active' prop is received
  background: ${props => props.active ? "#b15b00" : ""};
  margin: 4px 12px;
  border-radius: 4px;

  p {
    color: white;
    font-weight: bold;
    text-decoration: none;
  }
  
  &:hover {
    cursor:pointer;
  }
  
  &:hover:not(:first-child) {
    background: #c34a36;
  }
`;
class SideNav extends React.Component {
    render(){
        return (
            <>
                <SidebarParent>
                    <SidebarItem>
                    <form method="get" action="/About">
                        <button class="buttons" type="submit">About</button>
                    </form>
                    </SidebarItem>
                    <SidebarItem>
                        <form method="get" action="/Math">
                            <button class="buttons" type="submit">Math</button>
                        </form>
                    </SidebarItem>
                    <SidebarItem>
                        <form method="get" action="/Science">
                            <button class="buttons" type="submit">Science</button>
                        </form>
                    </SidebarItem>
                    <SidebarItem>
                        <form method="get" action="/Accomplishments">
                            <button class="buttons" type="submit">Accomplishments</button>
                        </form>
                    </SidebarItem>
                </SidebarParent>
            </>
        );
    }
}

export default SideNav;