import React, { Component } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import Story from "../components/Story";

const Container = styled.div`
  min-height: 100vh;
`;

const Wrapper = styled.div`
  width: 85%;
  padding: 48px 0px;
  margin: auto;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 48px;
`;

const Title = styled.h1`
  font-family: Roboto Slab;
  font-size: 64px;
  text-transform: uppercase;
  color: #e74c3c;
  margin: 0px;
`;

const Caption = styled.p`
  font-family: Roboto;
  font-size: 18px;
  color: #aaa;
  margin-top: 0px;
  margin-bottom: 96px;
`;

const Stories = [...Array(4)].map(() => (
  <Story
    image={require("../assets/images/dummy1.jpeg")}
    title="Introduction to React Navigation"
    author="Brendan Eich"
    date="Jan 01, 2017"
    href="#"
  />
));

class SingleCategory extends Component {
  render() {
    const { match } = this.props;

    return (
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Storyline / Share your stories</title>
        </Helmet>
        <Wrapper>
          <Title>{match.params.categoryName}</Title>
          <Caption>12 stories found</Caption>
          <Row>{Stories}</Row>
          <Row>{Stories}</Row>
          <Row>{Stories}</Row>
        </Wrapper>
      </Container>
    );
  }
}

export default SingleCategory;
