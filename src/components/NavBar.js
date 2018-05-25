import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 48px;
  background: white;
  border-bottom: 1px solid #ddd;
  z-index: 999;
`;

const Wrapper = styled.div`
  width: 85%;
  display: flex;
  align-items: center;
  margin: auto;
`;

const Title = styled.h1`
  font-family: Roboto Slab;
  font-weight: bold;
  font-size: 24px;
  margin: 0px;
  color: #333;
`;

const List = styled.ul``;

const ListItem = styled.li`
  display: inline;
  margin-right: 24px;
`;

const StyledLink = styled(Link)`
  color: #333;
  font-family: Roboto Slab;
  font-size: 14px;
  text-decoration: none;

  &:hover {
    color: #e74c3c;
  }
`;

const NavBar = ({ items }) => (
  <Container>
    <Wrapper>
      <Title>STORYLINE</Title>
      <List>
        {items.map((item, index) => (
          <ListItem key={index}>
            <StyledLink to={item.url}>{item.label}</StyledLink>
          </ListItem>
        ))}
      </List>
    </Wrapper>
  </Container>
);

NavBar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string
    })
  )
};

export default NavBar;
