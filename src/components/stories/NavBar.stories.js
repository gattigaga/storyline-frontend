import React from "react";
import { storiesOf } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import NavBar from "../NavBar";

const items = [
  {
    label: "Home",
    url: "/topic/home"
  },
  {
    label: "Technology",
    url: "/topic/technology"
  },
  {
    label: "Science",
    url: "/topic/science"
  },
  {
    label: "Psychology",
    url: "/topic/psychology"
  },
  {
    label: "Bussiness",
    url: "/topic/bussiness"
  }
];

storiesOf("NavBar", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("default", () => <NavBar items={items} />);
