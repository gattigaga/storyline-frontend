import React from "react";
import { storiesOf } from "@storybook/react";

import Avatar from "../Avatar";
import image from "../../../assets/images/dummy.png";

storiesOf("Avatar", module)
  .add("default", () => <Avatar src={image} alt="Buyer" />)
  .add("with custom size", () => <Avatar src={image} alt="Buyer" size={96} />);
