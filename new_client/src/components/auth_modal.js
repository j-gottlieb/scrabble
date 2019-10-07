import React, {Component} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  Input
} from 'reactstrap';

class AuthModal extends Component {
  state = {
    username: '',
    password: ''
  }

  render() {
    return (
     <Modal isOpen={this.props.showAuthModal} toggle={this.props.onCloseAuthModal} className={this.props.className}>
       <ModalHeader toggle={this.props.onCloseAuthModal}>{this.props.isSignIn ? 'Sign In' : 'Sign Up'}</ModalHeader>
       <ModalBody>
         <Form onSubmit={e => {
           e.preventDefault()
           this.props.authSubmission(this.state.username, this.state.password)
         }}>
           <FormGroup>
             <Label for="username">Email</Label>
             <Input onChange={e => this.setState({username: e.target.value})} type="string" name="username" id="username" placeholder="enter a username" />
           </FormGroup>
           <FormGroup>
             <Label for="password">Password</Label>
             <Input onChange={e => this.setState({password: e.target.value})} type="password" name="password" id="password" placeholder="enter a password" />
           </FormGroup>
           <Button type="submit">{this.props.isSignIn ? 'Sign In' : 'Sign Up'}</Button>
         </Form>
       </ModalBody>
     </Modal>
    )
  }
}

export default AuthModal;


// <ModalFooter>
//   <Button onClick={this.props.onCloseSignupModal} color="secondary">Cancel</Button>{' '}
//   <Button onClick={() => this.props.authSubmission(this.state.username, this.state.password)} color="primary">{this.props.isSignIn ? 'Sign In' : 'Sign Up'}</Button>
// </ModalFooter>
