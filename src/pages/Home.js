import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import Story from "../components/Story";
import MiniStory from "../components/MiniStory";

const Container = styled.div`
  min-height: 100vh;
`;

const Wrapper = styled.div`
  width: 85%;
  padding: 48px 0px;
  margin: auto;
  display: flex;
`;

const Content = styled.div`
  flex: 3;
  margin-right: 64px;
`;

const Sidebar = styled.aside`
  flex: 1;
`;

const Row = styled.div`
  display: flex;
`;

const DistributedRow = Row.extend`
  justify-content: space-between;
  margin-bottom: 48px;
`;

const Label = styled.h2`
  font-family: Roboto Slab;
  font-size: 18px;
  text-transform: uppercase;
  color: #e74c3c;
  margin-top: 0px;
`;

const Stories = [...Array(3)].map(() => (
  <Story
    image={require("../assets/images/dummy1.jpeg")}
    title="Introduction to React Navigation"
    author="Brendan Eich"
    date="Jan 01, 2017"
    href="#"
  />
));

const Home = () => {
  return (
    <Container>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Storyline / Share your stories</title>
      </Helmet>
      <Wrapper>
        <Content>
          <Label>Technology</Label>
          <DistributedRow>{Stories}</DistributedRow>
          <Label>Psychology</Label>
          <DistributedRow>{Stories}</DistributedRow>
          <Label>Criminal</Label>
          <DistributedRow>{Stories}</DistributedRow>
        </Content>
        <Sidebar>
          <Label>Most Popular</Label>
          {[...Array(5)].map((_, index) => (
            <MiniStory
              index={index + 1}
              image={require("../assets/images/dummy1.jpeg")}
              title="Introduction to React Navigation"
              author="Brendan Eich"
              date="Jan 01, 2017"
              href="#"
            />
          ))}
        </Sidebar>
      </Wrapper>
    </Container>
  );
};

export default Home;
