import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { separateByComma } from "../helpers/formatter";
import Button from "../components/Button";

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Container = styled.div`
  flex: 1;
  padding: 24px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  cursor: pointer;
`;

const Label = styled.h1`
  font-family: Roboto;
  font-size: 32px;
  color: #333;
  margin-top: 0px;
  margin-bottom: 8px;
`;

const Total = styled.p`
  font-family: Roboto;
  font-size: 16px;
  color: #aaa;
  margin-top: 0px;
  margin-bottom: 32px;
`;

const CategoryCard = ({
  label,
  totalStories,
  href,
  isChosen,
  withoutButton,
  onClickChoose
}) => (
  <StyledLink to={href}>
    <Container>
      <Label>{label}</Label>
      <Total>{separateByComma(totalStories)} stories</Total>
      {!withoutButton && (
        <Button
          caption={isChosen ? "Chosen" : "Choose"}
          onClick={event => {
            event.preventDefault();
            onClickChoose();
          }}
          isOutlined={!isChosen}
        />
      )}
    </Container>
  </StyledLink>
);

CategoryCard.propTypes = {
  label: PropTypes.string,
  totalStories: PropTypes.number,
  href: PropTypes.string,
  isChosen: PropTypes.bool,
  withoutButton: PropTypes.bool,
  onClickChoose: PropTypes.func
};

export default CategoryCard;
