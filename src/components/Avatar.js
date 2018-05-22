import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Image = styled.img`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 100%;
`;

const Avatar = ({ className, src, size, alt }) => (
  <Image src={src} size={size} alt={alt} className={className} />
);

Avatar.propTypes = {
  src: PropTypes.string,
  size: PropTypes.number,
  alt: PropTypes.string,
  className: PropTypes.string
};

Avatar.defaultProps = {
  size: 64
};

export default Avatar;
