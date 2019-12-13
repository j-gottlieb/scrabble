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
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            fLexicon
          </Typography>
          <Typography variant="h6" className={classes.title}>
          {props.username && `Welcome, ${props.username}`}
          </Typography>
          <Button color="inherit" onClick={props.toggleSignIn}>Login</Button>
          <Button color="inherit" onClick={props.toggleSignUp}>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

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
