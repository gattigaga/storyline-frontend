import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import Story from "../Story";

describe("Story", () => {
  const setup = propOverrides => {
    const props = {
      image: "dummy.png",
      title: "Introduction to React",
      author: "Gattigaga Hayyuta Dewa",
      date: "Jan 01, 2017",
      ...propOverrides
    };

    const wrapper = shallow(<Story {...props} />);

    return {
      props,
      wrapper
    };
  };

  it("should renders default", () => {
    const { wrapper } = setup();

    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
