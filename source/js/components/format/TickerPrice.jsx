import React from 'react';
import styled, { keyframes } from 'styled-components';
import transition, { css } from 'styled-transition-group';
import { withTheme } from 'themes';
import formatNumber from 'utils/formatNumber';

class TickerPrice extends React.Component {
  state = { direction: null };
  style = {  };
  componentWillReceiveProps = (nextProps) => {
    // if (this.flashTimeout) clearTimeout(this.flashTimeout);
    if (nextProps.price !== this.props.price) {
      if (nextProps.price > this.props.price) {
        this.setState({ direction: 'up' });
          
      } else if (nextProps.price < this.props.price) {
        this.setState({ direction: 'down' });
      }
    } else if (this.state.direction !== null) {
      this.setState({ direction: null });
    }
  }
  
  render() {

    const flash = keyframes`
      0% {
        color: ${ this.state.direction ? this.props.theme[`${this.state.direction}Color`](1) : this.props.theme.textColor};
      }
      100% {
        color: ${ this.props.theme.textColor};
      }`;

    const Price = styled.span`animation: ${flash} 2s 1;`;
    return (
      <Price key={this.props.price} direction={ this.state.direction } theme={ this.props.theme }>
        {formatNumber(this.props.price, {
          precision: 5,
          minLength: 5,
        })}
      </Price>
    );
  }
}
export default withTheme(TickerPrice);
