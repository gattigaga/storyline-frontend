import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import IconDefault from "react-icons/lib/io/android-favorite-outline";
import IconLiked from "react-icons/lib/io/android-favorite";

const Container = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 100%;
  border: 1px solid ${({ isLiked }) => (isLiked ? "#e74c3c" : "#ccc")};
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    border: 1px solid #e74c3c;

    * {
      color: #e74c3c;
    }
  }
`;

const StyledIcon = styled(IconDefault)`
  font-size: 28px;
  color: #aaa;
  transition: all 0.2s ease-in-out;
  margin-top: 4px;
`;

const StyledIconLiked = StyledIcon.withComponent(IconLiked).extend`
  color: #e74c3c;
`;

const LikeButton = ({ isLiked, onClick }) => {
  return (
    <Container onClick={onClick} isLiked={isLiked}>
      {isLiked ? <StyledIconLiked /> : <StyledIcon />}
    </Container>
  );
};

LikeButton.propTypes = {
  isLiked: PropTypes.bool,
  onClick: PropTypes.func
};

export default LikeButton;
