import React from "react";

import AllPosts from "../components/AllPosts";

const Home = () => (
  <>
    <div className="bg-light p-5">
      <h2>Home</h2>
      <p className="lead">Browse all posts</p>
    </div>
    <div className="container">
      <AllPosts />
    </div>
  </>
);

export default Home;
