import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import NavBar from "../NavBar";

describe("NavBar", () => {
  const setup = propOverrides => {
    const props = {
      items: [
        {
          label: "Home",
          url: "/"
        },
        {
          label: "Technology",
          url: "/topic/technology"
        },
        {
          label: "Science",
          url: "/topic/science"
        }
      ],
      ...propOverrides
    };

    const wrapper = shallow(<NavBar {...props} />);

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
