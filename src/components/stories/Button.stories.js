import React from "react";
import { storiesOf, action } from "@storybook/react";

import Button from "../Button";

storiesOf("Button", module)
  .add("default", () => <Button caption="Follow" onClick={action("clicked")} />)
  .add("with outline", () => (
    <Button caption="Follow" onClick={action("clicked")} isOutlined />
  ));
