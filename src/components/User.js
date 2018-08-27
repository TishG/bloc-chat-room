import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
    this.props.setUser(this.state.username);
   });
  }

  signInWithPopup(e) {
    e.preventDefault();
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOut(e) {
    e.preventDefault();
    this.props.firebase.auth().signOut();
  }

retrieveUsername() {
 const acct = this.props.GoogleSignIn.getLastSignedInAccount(this.props.getActivity());
  if (acct != null) {
    acct.getDisplayName();
  }
}

    render() {
      return (
        <section className="user-login">
          <button
          className="sign-in"
          onClick={(e) => this.signInWithPopup(e)}>
            Sign in
          </button>
          <button
          className="sign-out"
          onClick={(e) => this.signOut(e)}>
            Sign out
          </button>
          <section className="user-greeting">
          Hello, {this.props.user != null ? (e) => this.retrieveUsername() : " Guest" }
          </section>
        </section>
      );
    }
  }

export default User;
