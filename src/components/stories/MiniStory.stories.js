import React from "react";
import { storiesOf } from "@storybook/react";
import styled from "styled-components";
import { MemoryRouter } from "react-router-dom";

import MiniStory from "../MiniStory";
import image from "../../../assets/images/dummy1.jpeg";

const Container = styled.div`
  width: 30%;
`;

storiesOf("MiniStory", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>
      <Container>{story()}</Container>
    </MemoryRouter>
  ))
  .add("default", () => (
    <MiniStory
      index={1}
      image={image}
      title="Introduction to React Navigation"
      author="Brendan Eich"
      date="Jan 01, 2017"
      href="#"
    />
  ));
