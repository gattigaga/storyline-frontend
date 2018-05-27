import React, { Component } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import Avatar from "../components/Avatar";
import Story from "../components/Story";
import Button from "../components/Button";
import Stat from "../components/Stat";

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
  margin-bottom: 64px;
`;

const DistributedRow = Row.extend`
  justify-content: space-between;
`;

const SpreadRow = DistributedRow.extend`
  flex: 0.5;
  justify-content: space-between;
`;

const Detail = styled.div`
  margin: 0px 32px;
  flex: 1;
`;

const Name = styled.h1`
  font-family: Roboto;
  font-size: 32px;
  color: #333;
  margin: 0px;
`;

const Username = Name.withComponent("p").extend`
  font-size: 18px;
  color: #aaa;
  margin-bottom: 18px;
`;

const Description = Username.extend`
  color: #333;
  margin: 0px;
  margin-bottom: 16px;
`;

const Label = styled.h2`
  font-family: Roboto Slab;
  font-size: 18px;
  text-transform: uppercase;
  color: #e74c3c;
  margin-top: 0px;
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

class Profile extends Component {
  render() {
    return (
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Storyline / Share your stories</title>
        </Helmet>
        <Wrapper>
          <Row>
            <Avatar src={require("../assets/images/dummy1.jpeg")} size={160} />
            <Detail>
              <Name>Brendan Eich</Name>
              <Username>@brendan</Username>
              <Description>Javascript Developer work at Mozilla</Description>
              <Button caption="Follow" isOutlined />
            </Detail>
            <SpreadRow>
              <Stat label="Stories" value={125} />
              <Stat label="Followers" value={10} />
              <Stat label="Followed" value={21} />
            </SpreadRow>
          </Row>
          <Label>Stories</Label>
          <DistributedRow>{Stories}</DistributedRow>
          <DistributedRow>{Stories}</DistributedRow>
        </Wrapper>
      </Container>
    );
  }
}

export default Profile;
