import React, { Component } from 'react';

class User extends Component {

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
    this.props.setUser(user);
   });
  }

  signIn() {
    this.props.firebase.auth().signInWithPopup(
       new this.props.firebase.auth.GoogleAuthProvider()
     )
  }

  signOut() {
    this.props.firebase.auth().signOut();
  }

    render() {
      return (
        <section className="user-login">
          <button
          className="sign-in"
          onClick={(e) => this.signIn()}>
            Sign in
          </button>
          <button
          className="sign-out"
          onClick={(e) => this.signOut()}>
            Sign out
          </button>
          <section className="user-greeting">
          Hello, { this.props.user ? this.props.user.displayName : " Guest" }
          </section>
        </section>
      );
    }
  }

export default User;
