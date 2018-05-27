import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import CategoryCard from "../CategoryCard";
import Button from "../Button";

describe("CategoryCard", () => {
  const setup = propOverrides => {
    const props = {
      label: "Technology",
      totalStories: 15326,
      href: "/category/technology",
      onClickChoose: jest.fn(),
      ...propOverrides
    };

    const wrapper = shallow(<CategoryCard {...props} />);

    return {
      props,
      wrapper
    };
  };

  it("should renders default", () => {
    const { wrapper } = setup();

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should renders without button", () => {
    const { wrapper } = setup({ withoutButton: true });

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should renders as chosen", () => {
    const { wrapper } = setup({ isChosen: true });

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should call 'onClickChoose' callback when choose button pressed", () => {
    const { wrapper, props } = setup();
    const event = {
      preventDefault: () => {}
    };

    wrapper.find(Button).simulate("click", event);

    expect(props.onClickChoose).toBeCalled();
  });
});
