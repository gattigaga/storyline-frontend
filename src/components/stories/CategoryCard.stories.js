import React from "react";
import { storiesOf, action } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import CategoryCard from "../CategoryCard";

storiesOf("CategoryCard", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("default", () => (
    <CategoryCard
      label="Technology"
      totalStories={1324}
      href="/category/technology"
      onClickChoose={action("click")}
    />
  ))
  .add("is chosen", () => (
    <CategoryCard
      label="Technology"
      totalStories={1324}
      href="/category/technology"
      onClickChoose={action("click")}
      isChosen
    />
  ));
