import React from "react";
import { storiesOf, action } from "@storybook/react";

import LikeButton from "../LikeButton";

storiesOf("LikeButton", module)
  .add("default", () => <LikeButton onClick={action("clicked")} />)
  .add("is liked", () => <LikeButton onClick={action("clicked")} isLiked />);
