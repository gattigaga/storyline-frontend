import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import LikeButton from "../LikeButton";

describe("LikeButton", () => {
  const setup = propOverrides => {
    const props = {
      isLiked: false,
      onClick: jest.fn(),
      ...propOverrides
    };

    const wrapper = shallow(<LikeButton {...props} />);

    return {
      props,
      wrapper
    };
  };

  it("should renders default", () => {
    const { wrapper } = setup();

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should renders as liked", () => {
    const { wrapper } = setup({ isLiked: true });

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should calls 'onClick' callback while clicked", () => {
    const { wrapper, props } = setup();

    wrapper.simulate("click");

    expect(props.onClick).toBeCalled();
  });
});
