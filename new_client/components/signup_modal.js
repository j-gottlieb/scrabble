import React, {Component} from 'react';
import {Modal, Button} from 'reactstrap';

class SignupModal extends Component {
  state = {
    username: '',
    password: ''
  }

  handleSignup = () => {
    this.props.onSignup(this.state.username, this.state.password)
  }

  render() {
    return (
<h1>Hello</h1>
    )
  }
}

export default SignupModal;

//   <Modal.Dialog>
//   <Modal.Header onClick={this.props.onCloseSignupModal} closeButton>
//     <Modal.Title>Sign Up</Modal.Title>
//   </Modal.Header>
//
//   <Modal.Body>
//     <div>
//       <label>username</label>
//       <input onChange={e => this.setState({username: e.target.value})} />
//     </div>
//     <div>
//       <label>passwprd</label>
//       <input onChange={e => this.setState({password: e.target.value})} />
//     </div>
//     <div>
//       <Button onClick={this.props.onCloseSignupModal} variant="secondary">Cancel</Button>
//       <Button onClick={() => this.props.onSignup(this.state.username, this.state.password)} variant="primary">Sign Up</Button>
//     </div>
//   </Modal.Body>
// </Modal.Dialog>
