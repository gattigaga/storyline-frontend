import React from "react";
import { storiesOf, action } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import StoryHead from "../StoryHead";
import image from "../../assets/images/dummy1.jpeg";

storiesOf("StoryHead", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("default", () => (
    <StoryHead
      avatar={image}
      href="http://storyline.com/@brendan"
      name="Brendan Eich"
      description="Javascript Inventor at Mozilla"
      date="Jan 01, 2018"
      onClickFollow={action("clicked")}
    />
  ))
  .add("with followed author", () => (
    <StoryHead
      avatar={image}
      href="http://storyline.com/@brendan"
      name="Brendan Eich"
      description="Javascript Inventor at Mozilla"
      date="Jan 01, 2018"
      onClickFollow={action("clicked")}
      isFollowed
    />
  ))
  .add("from author point of view", () => (
    <StoryHead
      avatar={image}
      href="http://storyline.com/@brendan"
      name="Brendan Eich"
      description="Javascript Inventor at Mozilla"
      date="Jan 01, 2018"
      isAuthor
    />
  ));
