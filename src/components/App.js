import React, { Component } from "react";
import Authentication from "./Authentication";
import { firestore, auth } from "../firebase";
import { collectIdsAndDocs } from "../utilities";

import Posts from "./Posts";

class Application extends Component {
  state = {
    posts: [],
    user: null
  };

  unsubscribeFromFirestore = null;
  unsubscribeFromAuth = null;

  getPosts = () => {
    this.unsubscribeFromFirestore = firestore
      .collection("posts")
      .onSnapshot(snapshot => {
        const posts = snapshot.docs.map(collectIdsAndDocs);
        this.setState({ posts });
      });
  };

  componentDidMount = () => {
    this.getPosts();
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ user });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
  };

  render() {
    const { posts, user } = this.state;

    return (
      <main className="Application">
        <h1>Blog</h1>
        <Authentication user={user} />
        <Posts posts={posts} />
      </main>
    );
  }
}

export default Application;
