import React from "react";
import { storiesOf } from "@storybook/react";
import styled from "styled-components";
import { MemoryRouter } from "react-router-dom";

import Story from "../Story";
import image from "../../../assets/images/dummy.png";

const Container = styled.div`
  display: flex;
  width: 65%;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

storiesOf("Story", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>
      <Container>
        <Column>{story()}</Column>
        <Column />
        <Column />
      </Container>
    </MemoryRouter>
  ))
  .add("default", () => (
    <Story
      image={image}
      title="Introduction to React Navigation"
      author="Gattigaga Hayyuta Dewa"
      date="Jan 01, 2017"
      href="#"
    />
  ));
