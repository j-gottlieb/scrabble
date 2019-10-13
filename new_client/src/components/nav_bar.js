import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

const NavBar = props => (
  <div>
       <Navbar color="light" light expand="md">
         <NavbarBrand href="/">fLexicon</NavbarBrand>
         {props.username && <h3>{`Welcome, ${props.username}`}</h3>}
           <Nav className="ml-auto" navbar>
             <NavItem>
               <NavLink onClick={props.newGame}>Start New Game</NavLink>
             </NavItem>
             <NavItem>
               <NavLink onClick={props.submitMove}>Submit Move</NavLink>
             </NavItem>
             <NavItem>
               <NavLink onClick={props.toggleSignIn}>Sign In</NavLink>
             </NavItem>
             <NavItem>
               <NavLink onClick={props.toggleSignUp}>Sign Up</NavLink>
             </NavItem>
           </Nav>
       </Navbar>
     </div>
);

export default NavBar
