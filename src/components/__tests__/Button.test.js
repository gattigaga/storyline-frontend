import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import Button from "../Button";

describe("Button", () => {
  const setup = propOverrides => {
    const props = {
      caption: "Login",
      onClick: jest.fn(),
      ...propOverrides
    };

    const wrapper = shallow(<Button {...props} />);

    return {
      props,
      wrapper
    };
  };

  it("should renders default", () => {
    const { wrapper } = setup();

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should renders with outline", () => {
    const { wrapper } = setup({ isOutlined: true });

    expect(wrapper.props().isOutlined).toEqual(true);
  });

  it("should call 'onClick' callback when pressed", () => {
    const { wrapper, props } = setup();

    wrapper.simulate("click");

    expect(props.onClick).toBeCalled();
  });
});
