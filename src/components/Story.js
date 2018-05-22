import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Container = styled.div`
  width: 144px;
`;

const Thumbnail = styled.img`
  width: 144px;
  height: 192px;
  object-fit: cover;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-family: Roboto;
  font-weight: bold;
  font-size: 18px;
  color: #333;
  margin-top: 0px;
  margin-bottom: 20px;
`;

const Author = styled.p`
  font-family: Roboto;
  font-size: 14px;
  color: #aaa;
  margin: 0px;
`;

const Date = styled.p`
  font-family: Roboto;
  font-size: 14px;
  color: #e74c3c;
  margin: 0px;
`;

const Story = ({ image, title, href, author, date }) => (
  <StyledLink to={href}>
    <Container>
      <Thumbnail src={image} />
      <Date>{date}</Date>
      <Title>{title}</Title>
      <Author>by {author}</Author>
    </Container>
  </StyledLink>
);

Story.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  href: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string
};

Story.defaultProps = {
  href: "#"
};

export default Story;
