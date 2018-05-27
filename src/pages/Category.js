import React, { Component } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import axios from "axios";
import { map, flatten, compose } from "lodash/fp";

import CategoryCard from "../components/CategoryCard";

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

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: []
    };

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try {
      const byCategory = categoryID => story => story.category === categoryID;
      const getData = item => item.data;
      const getStories = compose(flatten, map(getData));

      const resCategories = await axios.get("/categories");
      const categories = resCategories.data;
      const promiseStories = categories.map(category =>
        axios.get(`/stories?categoryID=${category._id}`)
      );
      const resStories = await Promise.all(promiseStories);
      const stories = getStories(resStories);

      this.setState({
        categories: categories.map((category, index) => {
          const totalStories = stories.filter(byCategory(category._id)).length;

          return {
            ...category,
            totalStories
          };
        })
      });
    } catch (error) {
      console.error(error);
      alert("Unable to fetch data !");
    }
  }

  render() {
    const { categories } = this.state;
    const totalCategories = categories.length;
    const categoriesPerRow = 3;
    const totalRows = Math.ceil(totalCategories / categoriesPerRow);

    const isMatchRow = (rowIndex, categoriesPerRow) => (
      category,
      categoryIndex
    ) => {
      const currentRowIndex = Math.floor(categoryIndex / categoriesPerRow);
      return currentRowIndex === rowIndex;
    };

    const getCategoriesInRow = (categories, rowIndex, categoriesPerRow) => {
      const isMatch = isMatchRow(rowIndex, categoriesPerRow);
      return categories.filter(isMatch);
    };

    const getPosition = (categoryIndex, categoriesPerRow) => {
      let position = "center";

      if (categoryIndex === 0) {
        position = "left";
      } else if (categoryIndex === categoriesPerRow - 1) {
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
          <Title>Categories</Title>
          <Caption>{categories.length} categories found</Caption>
          {!isNaN(totalRows) &&
            [...Array(totalRows)].map((row, rowIndex) => {
              const currentCategories = getCategoriesInRow(
                categories,
                rowIndex,
                categoriesPerRow
              );
              const totalColumnLeft =
                categoriesPerRow - currentCategories.length;

              return (
                <Row key={rowIndex}>
                  {currentCategories.map((category, categoryIndex) => {
                    const position = getPosition(
                      categoryIndex,
                      categoriesPerRow
                    );

                    return (
                      <Column key={category._id} position={position}>
                        <CategoryCard
                          label={category.name}
                          totalStories={category.totalStories}
                          href={`/category/${category.name.toLowerCase()}`}
                          withoutButton
                        />
                      </Column>
                    );
                  })}
                  {currentCategories.length < categoriesPerRow &&
                    [...Array(totalColumnLeft)].map((column, columnIndex) => {
                      const position = getPosition(
                        columnIndex,
                        categoriesPerRow
                      );

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

export default Category;
