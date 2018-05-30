import React, { Component } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import axios from "axios";
import { format } from "date-fns";

import dummyImage from "../assets/images/dummy1.jpeg";
import { apiURL } from "../config/app";
import { separateByComma } from "../helpers/formatter";
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

const Column = styled.div`
  flex: 1;
  box-sizing: border-box;
  padding-left: ${props => (props.position === "left" ? "0px" : "32px")};
  padding-right: ${props => (props.position === "right" ? "0px" : "32px")};
  margin-bottom: 32px;
`;

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      stories: [],
      totalStories: 0,
      totalFollowers: 0,
      totalFollowed: 0
    };

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  /**
   * Fetch main data from database
   *
   * @memberof Profile
   */
  async fetchData() {
    const { match } = this.props;
    const { username } = match.params;

    try {
      const resUsers = await axios.get(`/users?username=${username}`);
      const users = resUsers.data;
      const user = users[0];

      const [resStories, resFollowers, resFollowed] = await Promise.all([
        axios.get(`/stories?userID=${user._id}`),
        axios.get(`/follows?followedID=${user._id}`),
        axios.get(`/follows?followerID=${user._id}`)
      ]);

      const stories = resStories.data;
      const totalStories = stories.length;
      const totalFollowers = resFollowers.data.length;
      const totalFollowed = resFollowed.data.length;

      this.setState({
        user,
        stories,
        totalStories,
        totalFollowers,
        totalFollowed
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const {
      user,
      stories,
      totalStories,
      totalFollowers,
      totalFollowed
    } = this.state;
    const storiesPerRow = 4;
    const totalRows = Math.ceil(totalStories / storiesPerRow);

    const isMatchRow = (rowIndex, storiesPerRow) => (story, storyIndex) => {
      const currentRowIndex = Math.floor(storyIndex / storiesPerRow);
      return currentRowIndex === rowIndex;
    };

    const getStoriesInRow = (stories, rowIndex, storiesPerRow) => {
      const isMatch = isMatchRow(rowIndex, storiesPerRow);
      return stories.filter(isMatch);
    };

    const getPosition = (storyIndex, storiesPerRow) => {
      let position = "center";

      if (storyIndex === 0) {
        position = "left";
      } else if (storyIndex === storiesPerRow - 1) {
        position = "right";
      }

      return position;
    };

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
              <Name>{user.name}</Name>
              <Username>@{user.username}</Username>
              <Description>{user.description}</Description>
              <Button caption="Follow" isOutlined />
            </Detail>
            <SpreadRow>
              <Stat label="Stories" value={separateByComma(totalStories)} />
              <Stat label="Followers" value={separateByComma(totalFollowers)} />
              <Stat label="Followed" value={separateByComma(totalFollowed)} />
            </SpreadRow>
          </Row>
          <Label>Stories</Label>
          {!isNaN(totalRows) &&
            [...Array(totalRows)].map((row, rowIndex) => {
              const currentStories = getStoriesInRow(
                stories,
                rowIndex,
                storiesPerRow
              );
              const totalColumnLeft = storiesPerRow - currentStories.length;

              return (
                <Row key={rowIndex}>
                  {currentStories.map((story, storyIndex) => {
                    const position = getPosition(storyIndex, storiesPerRow);
                    const thumbnail = story.photo
                      ? `${apiURL}/public/images/stories/${story.photo}`
                      : dummyImage;

                    return (
                      <Column key={story._id} position={position}>
                        <Story
                          image={thumbnail}
                          title={story.title}
                          author={user.name}
                          date={format(story.createdAt, "MMM DD, YYYY")}
                          href={`/@${user.username}/${story.slug}`}
                        />
                      </Column>
                    );
                  })}
                  {currentStories.length < storiesPerRow &&
                    [...Array(totalColumnLeft)].map((column, columnIndex) => {
                      const position = getPosition(columnIndex, storiesPerRow);
                      return <Column key={columnIndex} position={position} />;
                    })}
                </Row>
              );
            })}
        </Wrapper>
      </Container>
    );
  }
}

export default Profile;
