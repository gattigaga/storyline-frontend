import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 8px 0px;
`;

export const Index = styled.span`
  font-size: 32px;
  font-weight: bold;
  font-family: Roboto;
  color: #aaa;
`;

const Thumbnail = styled.img`
  width: 72px;
  height: 96px;
  object-fit: cover;
  margin: 0px 12px;
`;

const Detail = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-family: Roboto;
  font-weight: bold;
  font-size: 16px;
  color: #333;
  margin-top: 0px;
  margin-bottom: 12px;
`;

const Author = styled.p`
  font-family: Roboto;
  font-size: 12px;
  color: #aaa;
  margin: 0px;
`;

const Date = styled.p`
  font-family: Roboto;
  font-size: 12px;
  color: #e74c3c;
  margin: 0px;
`;

const MiniStory = ({ index, image, title, href, author, date }) => {
  const indexLabel = index < 10 ? `0${index}` : `${index}`;

  return (
    <StyledLink to={href}>
      <Container>
        <Index>{indexLabel}</Index>
        <Thumbnail src={image} />
        <Detail>
          <Date>{date}</Date>
          <Title>{title}</Title>
          <Author>by {author}</Author>
        </Detail>
      </Container>
    </StyledLink>
  );
};

MiniStory.propTypes = {
  index: PropTypes.number,
  image: PropTypes.string,
  title: PropTypes.string,
  href: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string
};

MiniStory.defaultProps = {
  index: 0,
  href: "#"
};

export default MiniStory;
