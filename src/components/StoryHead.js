import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Avatar from "./Avatar";
import Button from "./Button";

const Container = styled.div`
  display: flex;
  margin-bottom: 32px;
`;

const Info = styled.div`
  flex: 1;
  margin-left: 16px;
`;

const Name = styled(Link)`
  font-size: 12px;
  font-family: Roboto;
  font-weight: bold;
  color: #333;
  margin: 0px;
  margin-right: 8px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Description = styled.p`
  font-size: 12px;
  font-family: Roboto;
  font-weight: normal;
  color: #aaa;
  margin: 0px;
  margin-bottom: 12px;
`;

const Date = Description.extend`
  color: #e74c3c;
  font-weight: normal;
  margin: 0px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

export const MiniButton = styled(Button)`
  padding: 2px 12px;
  font-size: 10px;
`;

const StoryHead = ({
  className,
  avatar,
  name,
  description,
  date,
  onClickFollow,
  isFollowed,
  href
}) => (
  <Container className={className}>
    <Link to={href}>
      <Avatar src={avatar} />
    </Link>
    <Info>
      <Row>
        <Name to={href}>{name}</Name>
        <MiniButton
          caption={isFollowed ? "Unfollow" : "Follow"}
          onClick={onClickFollow}
          isOutlined={!isFollowed}
        />
      </Row>
      <Description>{description}</Description>
      <Date>{date}</Date>
    </Info>
  </Container>
);

StoryHead.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  className: PropTypes.string,
  onClickFollow: PropTypes.func,
  isFollowed: PropTypes.bool,
  href: PropTypes.string
};

StoryHead.defaultProps = {
  href: "#"
};

export default StoryHead;
