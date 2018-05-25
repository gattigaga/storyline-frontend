import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";

const Container = styled.div``;

const menuItems = [
  {
    label: "Home",
    url: "/"
  },
  {
    label: "Technology",
    url: "/"
  },
  {
    label: "Science",
    url: "/"
  },
  {
    label: "More",
    url: "/"
  }
];

const App = () => (
  <Container>
    <Router>
      <div>
        <NavBar items={menuItems} />
        <Route path="/" component={Home} />
      </div>
    </Router>
  </Container>
);

export default App;
