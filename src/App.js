import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import SingleCategory from "./pages/SingleCategory";
import SingleStory from "./pages/SingleStory";
import Profile from "./pages/Profile";

const Container = styled.div``;

const menuItems = [
  {
    label: "Home",
    url: "/"
  },
  {
    label: "Technology",
    url: "/category/technology"
  },
  {
    label: "Science",
    url: "/category/science"
  },
  {
    label: "More",
    url: "/category"
  }
];

const App = () => (
  <Container>
    <Router>
      <div>
        <NavBar items={menuItems} />
        <Route path="/" component={Home} exact />
        <Route path="/category/:categoryName" component={SingleCategory} />
        <Route path="/:username" component={Profile} exact />
        <Route path="/:username/:slug" component={SingleStory} />
      </div>
    </Router>
  </Container>
);

export default App;
