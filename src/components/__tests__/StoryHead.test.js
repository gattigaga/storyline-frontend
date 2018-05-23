import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import StoryHead, { MiniButton } from "../StoryHead";

describe("StoryHead", () => {
  const setup = propOverrides => {
    const props = {
      avatar: require("../../../assets/images/dummy.png"),
      name: "Brendan Eich",
      onClickFollow: jest.fn(),
      date: "Jan 01, 2018",
      ...propOverrides
    };

    const wrapper = shallow(<StoryHead {...props} />);

    return {
      props,
      wrapper
    };
  };

  it("should renders default", () => {
    const { wrapper } = setup();

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should renders default", () => {
    const { wrapper } = setup({ isFollowed: true });

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should calls 'onClick' callback while follow button pressed", () => {
    const { wrapper, props } = setup();

    wrapper.find(MiniButton).simulate("click");

    expect(props.onClickFollow).toBeCalled();
  });
});
