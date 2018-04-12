import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Chevron from './Chevron';

const Row = styled.div`
  display: flex;
  flex: 1 0;
`; 
const Name = styled.div``;
const Symbol = styled.div`
  border-left: 1px var(--borderColor) solid;
  margin-left: var(--gutterPx);
  padding-left: var(--gutterPx); 
`;

@connect(state => ({
  symbol: state.app.symbol,
}))
export default class Header extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    symbol: PropTypes.string,
    showSymbol: PropTypes.bool,
    onClick: PropTypes.func,
    open: PropTypes.bool,
  }
  render() {
    const { onClick, name, symbol, showSymbol, open } = this.props;
    return (
      <Row onClick={ onClick } >
        <Chevron open={ open } />
        <Name>{ name }</Name>
        { showSymbol && 
          <Symbol>
            { symbol && `${ symbol.slice(0, 3) } / ${ symbol.slice(-3) }` }
          </Symbol>
        }
      </Row>
    );
  }
}
