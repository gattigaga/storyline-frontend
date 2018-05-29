import React, { Component } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import axios from "axios";
import {
  slice,
  shuffle,
  keys,
  filter,
  find,
  map,
  compose,
  flatten,
  groupBy,
  uniqBy
} from "lodash/fp";
import { format } from "date-fns";

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

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popularStories: [],
      storyPacks: []
    };

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  /**
   * Fetch main data from database
   *
   * @memberof Home
   */
  async fetchData() {
    try {
      const getData = item => item.data;
      const getStoryPromise = category => {
        const url = `/stories?categoryID=${category._id}&take=3&sort=desc`;
        return axios.get(url);
      };
      const getUserPromise = story => axios.get(`/users/${story.user}`);
      const getStoryPack = data => categoryID => {
        const { stories, categories, users } = data;
        const getCurrentCategory = find(item => item._id === categoryID);
        const getCurrentStories = filter(item => item.category === categoryID);
        const relateWithUser = story => ({
          ...story,
          user: users.find(user => user._id === story.user)
        });
        const getStories = compose(map(relateWithUser), getCurrentStories);

        return {
          category: getCurrentCategory(categories).name,
          data: getStories(stories)
        };
      };
      const byLength = length => items => items.length >= length;
      const getDeepData = compose(flatten, filter(byLength(3)), map(getData));
      const getRandomCategories = compose(
        slice(0, 3),
        shuffle,
        keys,
        groupBy("category")
      );
      const getUniqueUserPromises = compose(
        map(getUserPromise),
        uniqBy("user")
      );

      const resCategories = await axios.get("/categories");
      const categories = resCategories.data;

      const promiseStories = categories.map(getStoryPromise);
      const resStories = await Promise.all(promiseStories);
      const stories = getDeepData(resStories);

      const promiseUsers = getUniqueUserPromises(stories);
      const resUsers = await Promise.all(promiseUsers);
      const users = resUsers.map(getData);

      const getRandomStoryPacks = map(
        getStoryPack({
          stories,
          categories,
          users
        })
      );
      const randomCategories = getRandomCategories(stories);
      const randomStoryPacks = getRandomStoryPacks(randomCategories);

      this.setState({
        storyPacks: randomStoryPacks
      });
    } catch (error) {
      console.error(error);
      alert("Unable to fetch data !");
    }
  }

  render() {
    const { storyPacks } = this.state;

    return (
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Storyline / Share your stories</title>
        </Helmet>
        <Wrapper>
          <Content>
            {storyPacks.map(storyPack => (
              <div>
                <Label>{storyPack.category}</Label>
                <DistributedRow>
                  {storyPack.data.map(story => (
                    <Story
                      image={require("../assets/images/dummy1.jpeg")}
                      title={story.title}
                      author={story.user.name}
                      date={format(story.createdAt, "MMM DD, YYYY")}
                      href={`/@${story.user.username}/${story.slug}`}
                    />
                  ))}
                </DistributedRow>
              </div>
            ))}
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
  }
}

export default Home;
