import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import Stat from "../Stat";

describe("Stat", () => {
  const setup = propOverrides => {
    const props = {
      label: "Followers",
      value: 32000,
      ...propOverrides
    };

    const wrapper = shallow(<Stat {...props} />);

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
