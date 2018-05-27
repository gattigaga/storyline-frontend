import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { separateByComma } from "../helpers/formatter";

const Label = styled.p`
  font-family: Roboto Slab;
  font-size: 18px;
  color: #e74c3c;
  margin: 0px;
  text-align: center;
`;

const Value = styled.p`
  font-family: Roboto;
  font-size: 32px;
  color: #333;
  margin: 0px;
  text-align: center;
`;

const Stat = ({ label, value }) => (
  <div>
    <Value>{separateByComma(value)}</Value>
    <Label>{label}</Label>
  </div>
);

Stat.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number
};

Stat.defaultProps = {
  value: 0
};

export default Stat;
