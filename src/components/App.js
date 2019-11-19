import React, { Component } from "react";
import { firestore } from "../firebase";
import { collectIdsAndDocs } from "../utilities";

import Posts from "./Posts";

class Application extends Component {
  state = {
    posts: []
  };

  getPosts = async () => {
    const snapshot = await firestore.collection("posts").get();

    const posts = snapshot.docs.map(collectIdsAndDocs);

    this.setState({
      posts
    });

    // console.log({ snapshot });
  };

  componentDidMount() {
    this.getPosts();
  }

  handleCreate = async post => {
    const docRef = await firestore.collection("posts").add(post);
    const doc = await docRef.get();

    const newPost = collectIdsAndDocs(doc);

    this.setState({ posts: [newPost, ...this.state.posts] });
  };

  handleRemove = async id => {
    const allPosts = this.state.posts;

    await firestore.doc(`posts/${id}`).delete();

    const posts = allPosts.filter(post => post.id !== id);
    this.setState(
      {
        posts
      },
      () => console.log(this.state.posts)
    );
  };

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Blog</h1>
        <Posts
          posts={posts}
          remove={this.handleRemove}
          onCreate={this.handleCreate}
        />
      </main>
    );
  }
}

export default Application;
