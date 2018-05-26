import React, { Component } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import image from "../assets/images/dummy1.jpeg";
import StoryHead from "../components/StoryHead";
import LikeButton from "../components/LikeButton";

const Container = styled.div`
  min-height: 100vh;
`;

const Wrapper = styled.div`
  width: 65%;
  padding: 48px 0px;
  padding-bottom: 128px;
  margin: auto;
`;

const Title = styled.h1`
  font-family: Roboto;
  font-size: 48px;
  color: #333;
  margin-top: 16px;
  margin-bottom: 64px;
  text-align: center;
`;

const Content = styled.div`
  font-family: Roboto;
  font-size: 18px;
  color: #333;
  line-height: 1.5em;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
`;

const Intro = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
`;

const DarkLayer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1));
`;

const Info = styled.div`
  position: relative;
  margin: auto;
  width: 45%;
  padding: 32px;
  background: white;
`;

const Category = styled.p`
  font-family: Roboto Slab;
  font-size: 18px;
  color: #e74c3c;
  margin: 0px;
  text-align: center;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LikeCaption = styled.p`
  font-family: Roboto;
  font-size: 14px;
  color: #aaa;
  margin-right: 16px;
`;

class SingleStory extends Component {
  render() {
    const { match } = this.props;

    return (
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Storyline / Share your stories</title>
        </Helmet>
        <Intro>
          <Thumbnail src={image} />
          <DarkLayer />
          <Info>
            <Category>Technology</Category>
            <Title>Introduce to React Development</Title>
            <Row>
              <StoryHead
                avatar={image}
                href="http://storyline.com/@brendan"
                name="Brendan Eich"
                description="Javascript Inventor at Mozilla"
                date="Jan 01, 2018"
                onClickFollow={() => {}}
              />
              <Row>
                <LikeCaption>1,931 likes</LikeCaption>
                <LikeButton />
              </Row>
            </Row>
          </Info>
        </Intro>
        <Wrapper>
          <Content>
            <p>
              Getting Real delivers better results because it forces you to deal
              with the actual problems you’re trying to solve instead of your
              ideas about those problems. It forces you to deal with reality.
              Getting Real delivers better results because it forces you to deal
              with the actual problems you’re trying to solve instead of your
              ideas about those problems. It forces you to deal with reality.
            </p>
            <p>
              Getting Real delivers better results because it forces you to deal
              with the actual problems you’re trying to solve instead of your
              ideas about those problems. It forces you to deal with reality.
              Getting Real delivers better results because it forces you to deal
              with the actual problems you’re trying to solve instead of your
              ideas about those problems. It forces you to deal with reality.
            </p>
            <p>
              Getting Real delivers better results because it forces you to deal
              with the actual problems you’re trying to solve instead of your
              ideas about those problems. It forces you to deal with reality.
              Getting Real delivers better results because it forces you to deal
              with the actual problems you’re trying to solve instead of your
              ideas about those problems. It forces you to deal with reality.
            </p>
            <p>
              Getting Real delivers better results because it forces you to deal
              with the actual problems you’re trying to solve instead of your
              ideas about those problems. It forces you to deal with reality.
              Getting Real delivers better results because it forces you to deal
              with the actual problems you’re trying to solve instead of your
              ideas about those problems. It forces you to deal with reality.
            </p>
            <p>
              Getting Real delivers better results because it forces you to deal
              with the actual problems you’re trying to solve instead of your
              ideas about those problems. It forces you to deal with reality.
              Getting Real delivers better results because it forces you to deal
              with the actual problems you’re trying to solve instead of your
              ideas about those problems. It forces you to deal with reality.
            </p>
          </Content>
        </Wrapper>
      </Container>
    );
  }
}

export default SingleStory;
