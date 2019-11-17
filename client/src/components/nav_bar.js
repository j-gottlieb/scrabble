import React from 'react';
import PropTypes from 'prop-types';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import {connect} from 'react-redux';
import {
  onToggleSignInModal,
  onToggleSignUpModal
} from '../actions'

const NavBar = props => (
  <div>
       <Navbar color="light" light expand="md">
         <NavbarBrand href="/">fLexicon</NavbarBrand>
         {props.username && <h3>{`Welcome, ${props.username}`}</h3>}
           <Nav className="ml-auto" navbar>
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

const mapStateToProps = state => ({
  isUserLoggedIn: !!state.playerInfo.id,
  username: state.playerInfo.username
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleSignIn: () => dispatch(onToggleSignInModal()),
  toggleSignUp: () => dispatch(onToggleSignUpModal())
})

NavBar.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  username: PropTypes.string,
  toggleSignIn: PropTypes.func.isRequired,
  toggleSignUp: PropTypes.func.isRequired
}

NavBar.defaultProps = {
  username: ''
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
