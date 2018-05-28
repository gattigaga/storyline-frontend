import React, { Component } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import axios from "axios";
import { format } from "date-fns";

import image from "../assets/images/dummy1.jpeg";
import { separateByComma } from "../helpers/formatter";
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
  constructor(props) {
    super(props);

    this.state = {
      story: {},
      author: {},
      likes: []
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

    try {
      const resStories = await axios.get(`/stories?slug=${match.params.slug}`);
      const story = resStories.data[0];

      const [resUser, resCategory, resLikes] = await Promise.all([
        axios.get(`/users/${story.user}`),
        axios.get(`/categories/${story.category}`),
        axios.get(`/likes?storyID=${story._id}`)
      ]);

      const author = resUser.data;
      const category = resCategory.data;
      const likes = resLikes.data;

      this.setState({
        story: {
          ...story,
          category: category.name
        },
        author,
        likes
      });
    } catch (error) {
      console.error(error);
      alert("Unable to fetch data !");
    }
  }

  render() {
    const { match } = this.props;
    const { story, author, likes } = this.state;

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
            <Category>{story.category}</Category>
            <Title>{story.title}</Title>
            <Row>
              <StoryHead
                avatar={image}
                href={`/@${author.username}`}
                name={author.name}
                description={author.description}
                date={format(story.createdAt, "MMM DD, YYYY")}
                onClickFollow={() => {}}
              />
              <Row>
                <LikeCaption>{separateByComma(likes.length)} likes</LikeCaption>
                <LikeButton />
              </Row>
            </Row>
          </Info>
        </Intro>
        <Wrapper>
          <Content>{story.content}</Content>
        </Wrapper>
      </Container>
    );
  }
}

export default SingleStory;
