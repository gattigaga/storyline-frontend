import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import { apiURL } from "./config/app";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import SingleCategory from "./pages/SingleCategory";
import SingleStory from "./pages/SingleStory";
import Profile from "./pages/Profile";
import Category from "./pages/Category";
import NotFound from "./pages/NotFound";

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

axios.defaults.baseURL = apiURL;

const App = () => (
  <Container>
    <Router>
      <div>
        <NavBar items={menuItems} />
        <Route path="/" component={Home} exact />
        <Route path="/category" component={Category} exact />
        <Route path="/category/:categoryName" component={SingleCategory} />
        <Route path="/@:username" component={Profile} exact />
        <Route path="/@:username/:slug" component={SingleStory} />
        <Route component={NotFound} />
      </div>
    </Router>
  </Container>
);

export default App;
