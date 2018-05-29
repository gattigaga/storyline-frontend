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
  uniqBy,
  sortBy
} from "lodash/fp";
import { format } from "date-fns";

import dummyImage from "../assets/images/dummy1.jpeg";
import { apiURL } from "../config/app";
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

    this.fetchStoryPacks = this.fetchStoryPacks.bind(this);
    this.fetchPopularStories = this.fetchPopularStories.bind(this);
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
      const storyPacks = await this.fetchStoryPacks();
      const popularStories = await this.fetchPopularStories();

      this.setState({ storyPacks, popularStories });
    } catch (error) {
      console.error(error);
      alert("Unable to fetch data !");
    }
  }

  /**
   * Fetch story packs from database
   *
   * @memberof Home
   */
  fetchStoryPacks() {
    return new Promise(async (resolve, reject) => {
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
          const getCurrentStories = filter(
            item => item.category === categoryID
          );
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

        resolve(randomStoryPacks);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Fetch popular stories from database
   *
   * @memberof Home
   */
  fetchPopularStories() {
    return new Promise(async (resolve, reject) => {
      try {
        const getData = item => item.data;
        const getStoryPromise = storyID => axios.get(`/stories/${storyID}`);
        const getUserPromise = story => axios.get(`/users/${story.user}`);
        const relateWithUser = users => story => {
          const user = users.find(user => user._id === story.user);
          return { ...story, user };
        };
        const getPopularStoryPromises = compose(
          map(getStoryPromise),
          keys,
          groupBy("story"),
          flatten,
          slice(0, 5),
          sortBy([item => -item.length]),
          groupBy("story")
        );

        const resLikes = await axios.get("/likes");
        const likes = resLikes.data;

        const promisePopularStories = getPopularStoryPromises(likes);
        const resPopularStories = await Promise.all(promisePopularStories);
        const popularStories = resPopularStories.map(getData);

        const promiseUsers = popularStories.map(getUserPromise);
        const resUsers = await Promise.all(promiseUsers);
        const users = resUsers.map(getData);

        resolve(popularStories.map(relateWithUser(users)));
      } catch (error) {
        reject(error);
      }
    });
  }

  render() {
    const { storyPacks, popularStories } = this.state;

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
                  {storyPack.data.map(story => {
                    const thumbnail = story.photo
                      ? `${apiURL}/public/images/stories/${story.photo}`
                      : dummyImage;

                    return (
                      <Story
                        image={thumbnail}
                        title={story.title}
                        author={story.user.name}
                        date={format(story.createdAt, "MMM DD, YYYY")}
                        href={`/@${story.user.username}/${story.slug}`}
                      />
                    );
                  })}
                </DistributedRow>
              </div>
            ))}
          </Content>
          <Sidebar>
            <Label>Most Popular</Label>
            {popularStories.map((story, index) => {
              const thumbnail = story.photo
                ? `${apiURL}/public/images/stories/${story.photo}`
                : dummyImage;

              return (
                <MiniStory
                  key={story._id}
                  index={index + 1}
                  image={thumbnail}
                  title={story.title}
                  author={story.user.name}
                  date={format(story.createdAt, "MMM DD, YYYY")}
                  href={`/@${story.user.username}/${story.slug}`}
                />
              );
            })}
          </Sidebar>
        </Wrapper>
      </Container>
    );
  }
}

export default Home;
