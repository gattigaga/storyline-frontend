import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import MiniStory, { Index } from "../MiniStory";

describe("MiniStory", () => {
  const setup = propOverrides => {
    const props = {
      image: "dummy.png",
      title: "Introduction to React",
      author: "Gattigaga Hayyuta Dewa",
      date: "Jan 01, 2017",
      index: 5,
      ...propOverrides
    };

    const wrapper = shallow(<MiniStory {...props} />);

    return {
      props,
      wrapper
    };
  };

  it("should renders default", () => {
    const { wrapper } = setup();

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should renders with double digit index", () => {
    const { wrapper } = setup({ index: 17 });

    expect(wrapper.find(Index).prop("children")).toEqual("17");
  });
});
