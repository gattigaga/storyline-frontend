import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Content = styled.button`
  padding: 12px 16px;
  background: ${({ isOutlined }) => (isOutlined ? "white" : "#e74c3c")};
  color: ${({ isOutlined }) => (isOutlined ? "#e74c3c" : "white")};
  border: 1px solid ${({ isOutlined }) => (isOutlined ? "#e74c3c" : "white")};
  font-family: Roboto;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  outline: none;
`;

const Button = ({ className, caption, isOutlined, onClick }) => (
  <Content className={className} isOutlined={isOutlined} onClick={onClick}>
    {caption}
  </Content>
);

Button.propTypes = {
  caption: PropTypes.string,
  isOutlined: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func
};

Button.defaultProps = {
  caption: "Caption"
};

export default Button;
