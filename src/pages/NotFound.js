import React from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
`;

const Wrapper = styled.div`
  width: 85%;
  padding: 48px 0px;
  margin: auto;
  display: flex;
  align-items: center;
`;

const Code = styled.h1`
  font-family: Roboto;
  font-size: 192px;
  color: #333;
`;

const Caption = styled.p`
  font-family: Roboto;
  font-weight: bold;
  font-size: 72px;
  color: #aaa;
  margin-left: 80px;
`;

const NotFound = () => {
  return (
    <Container>
      <Wrapper>
        <Code>404</Code>
        <Caption>We can't found what do you want.</Caption>
      </Wrapper>
    </Container>
  );
};

export default NotFound;
