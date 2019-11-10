import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from 'reactstrap';
import {connect} from 'react-redux';
import {onSignIn, onSignUp, onToggleSignInModal, onToggleSignUpModal} from '../actions'
import {isAuthModalOpen, getAuthButtonText} from '../selectors';

class AuthModal extends Component {
  state = {
    username: '',
    password: ''
  }

  render() {
    return (
     <Modal
       isOpen={this.props.isAuthModalOpen}
       toggle={
         this.props.showSignInModal
         ? this.props.onToggleSignInModal
         : this.props.onToggleSignUpModal
       }
       className={this.props.className}
      >
       <ModalHeader
         toggle={this.props.showSignInModal ? this.props.onToggleSignInModal : this.props.onToggleSignUpModal}
       >
         {this.props.getAuthButtonText}
       </ModalHeader>
       <ModalBody>
         <Form onSubmit={e => {
           e.preventDefault()
           this.props.showSignInModal
            ? this.props.onSignIn(this.state.username, this.state.password)
            : this.props.onSignUp(this.state.username, this.state.password)
         }}>
           <FormGroup>
             <Label for="username">Email</Label>
             <Input onChange={e => this.setState({username: e.target.value})} type="string" name="username" id="username" placeholder="enter a username" />
           </FormGroup>
           <FormGroup>
             <Label for="password">Password</Label>
             <Input onChange={e => this.setState({password: e.target.value})} type="password" name="password" id="password" placeholder="enter a password" />
           </FormGroup>
           <Button type="submit">{this.props.authButtonText}</Button>
           {this.props.message !== '' && <Alert color="danger">{this.props.message}</Alert>}
         </Form>
       </ModalBody>
     </Modal>
    )
  }
}

const mapStateToProps = state => ({
  message: state.authMessage,
  showSignInModal: state.showSignInModal,
  showSignUpModal: state.showSignUpModal,
  isAuthModalOpen: isAuthModalOpen(state),
  authButtonText: getAuthButtonText(state)
})

const mapDispatchToProps = dispatch => ({
  onSignIn: (username, password) => dispatch(onSignIn(username, password)),
  onSignUp: (username, password) => dispatch(onSignUp(username, password)),
  onToggleSignInModal: () => dispatch(onToggleSignInModal()),
  onToggleSignUpModal: () => dispatch(onToggleSignUpModal())
})

AuthModal.propTypes = {
  message: PropTypes.string.isRequired,
  showSignInModal: PropTypes.bool.isRequired,
  showSignUpModal: PropTypes.bool.isRequired,
  onSignIn: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
  onToggleSignInModal: PropTypes.func.isRequired,
  onToggleSignUpModal: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal);
