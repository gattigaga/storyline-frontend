import React, { Component } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import axios from "axios";
import { format } from "date-fns";

import dummyImage from "../assets/images/dummy1.jpeg";
import { apiURL } from "../config/app";
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

const Column = styled.div`
  flex: 1;
  box-sizing: border-box;
  padding-left: ${props => (props.position === "left" ? "0px" : "32px")};
  padding-right: ${props => (props.position === "right" ? "0px" : "32px")};
  margin-bottom: 32px;
`;

class SingleCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: []
    };

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  /**
   * Fetch main data from database
   *
   * @memberof SingleCategory
   */
  async fetchData() {
    const { match } = this.props;
    const { params } = match;

    try {
      const getData = item => item.data;
      const getUserPromise = story => axios.get(`/users/${story.user}`);
      const byName = name => item => {
        const pattern = new RegExp(item.name, "i");
        return pattern.test(name);
      };
      const relateWithUser = users => story => {
        const user = users.find(user => user._id === story.user);
        return { ...story, user };
      };

      const resCategories = await axios.get("/categories");
      const categories = resCategories.data;
      const category = categories.find(byName(params.categoryName));

      const resStories = await axios.get(`/stories?categoryID=${category._id}`);
      const stories = resStories.data;

      const promiseUsers = stories.map(getUserPromise);
      const resUsers = await Promise.all(promiseUsers);
      const users = resUsers.map(getData);

      this.setState({ stories: stories.map(relateWithUser(users)) });
    } catch (error) {
      console.error(error);
      alert("Unable to load data !");
    }
  }

  render() {
    const { match } = this.props;
    const { stories } = this.state;
    const totalStories = stories.length;
    const storiesPerRow = 4;
    const totalRows = Math.ceil(totalStories / storiesPerRow);

    const isMatchRow = (rowIndex, storiesPerRow) => (story, storiesIndex) => {
      const currentRowIndex = Math.floor(storiesIndex / storiesPerRow);
      return currentRowIndex === rowIndex;
    };

    const getStoriesInRow = (categories, rowIndex, storiesPerRow) => {
      const isMatch = isMatchRow(rowIndex, storiesPerRow);
      return categories.filter(isMatch);
    };

    const getPosition = (categoryIndex, storiesPerRow) => {
      let position = "center";

      if (categoryIndex === 0) {
        position = "left";
      } else if (categoryIndex === storiesPerRow - 1) {
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
          <Title>{match.params.categoryName}</Title>
          <Caption>{stories.length} stories found</Caption>
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
                          author={story.user.name}
                          date={format(story.createdAt, "MMM DD, YYYY")}
                          href={`/@${story.user.username}/${story.slug}`}
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

export default SingleCategory;
