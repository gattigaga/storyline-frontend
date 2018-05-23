import React from "react";
import { storiesOf, action } from "@storybook/react";

import StoryHead from "../StoryHead";
import image from "../../../assets/images/dummy1.jpeg";

storiesOf("StoryHead", module)
  .add("default", () => (
    <StoryHead
      avatar={image}
      name="Brendan Eich"
      description="Javascript Inventor at Mozilla"
      date="Jan 01, 2018"
      onClickFollow={action("clicked")}
    />
  ))
  .add("with followed author", () => (
    <StoryHead
      avatar={image}
      name="Brendan Eich"
      description="Javascript Inventor at Mozilla"
      date="Jan 01, 2018"
      onClickFollow={action("clicked")}
      isFollowed
    />
  ));
