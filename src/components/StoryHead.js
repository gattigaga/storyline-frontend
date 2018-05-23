import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

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

const Name = styled.p`
  font-size: 12px;
  font-family: Roboto;
  font-weight: bold;
  color: #333;
  margin: 0px;
  margin-right: 8px;
`;

const Description = Name.extend`
  color: #aaa;
  font-weight: normal;
  margin-bottom: 12px;
`;

const Date = Name.extend`
  color: #e74c3c;
  font-weight: normal;
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
  isFollowed
}) => (
  <Container className={className}>
    <Avatar src={avatar} />
    <Info>
      <Row>
        <Name>{name}</Name>
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
  isFollowed: PropTypes.bool
};

export default StoryHead;
