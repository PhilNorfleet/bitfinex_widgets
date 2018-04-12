import React from 'react';
import Bids from 'containers/Bids';
import Asks from 'containers/Asks';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;
const Orderbook = () => {
  return (
    <Wrapper>
      <Bids />
      <Asks />
    </Wrapper>
  );
};

export default Orderbook;
