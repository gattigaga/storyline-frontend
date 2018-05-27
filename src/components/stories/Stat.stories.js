import React from "react";
import { storiesOf } from "@storybook/react";
import styled from "styled-components";

import Stat from "../Stat";

const Container = styled.div`
  width: 240px;
`;

storiesOf("Stat", module)
  .addDecorator(story => <Container>{story()}</Container>)
  .add("default", () => <Stat label="Follower" value={19370} />);
