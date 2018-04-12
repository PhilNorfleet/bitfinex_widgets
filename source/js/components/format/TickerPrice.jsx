import React from 'react';
import styled, { keyframes } from 'styled-components';
import transition, { css } from 'styled-transition-group';
import formatNumber from 'utils/formatNumber';

const duration = 1100;

const upColor = 'rgb(var(--upColor))';
const downColor = 'rgb(var(--downColor))';
const textColor = 'var(--textColor)';
// ${ props => (props.direction === 'up' ? upColor : downColor) };
// ${ textColor };
const flash = keyframes`
  0% {
    color: ${ props => (props.direction === 'up' ? upColor : downColor) };
  }
  100% {
    color: ${ textColor };
  }
`;

const Price = styled.span`
  animation: ${ flash } 2s;
`;

class TickerPrice extends React.Component {
  state = { direction: null };
  
  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if (this.flashTimeout) clearTimeout(this.flashTimeout);
    if (nextProps.price !== this.props.price) {
      if (nextProps.price > this.props.price) {
        this.setState({ direction: 'up' });
          
      } else if (nextProps.price < this.props.price) {
        this.setState({ direction: 'down' });
      }
    } else if (this.state.direction !== null) {
      this.setState({ direction: null });
    }
    this.flashTimeout = setTimeout(() => {
      this.setState({ direction: null });
    }, 1000);
  }

  UNSAFE_componentWillUnmount = () => {
    clearTimeout(this.flashTimeout)
  }

  render() {
    return (
      <span
        className={ this.state.direction }
        direction={ this.state.direction }
      >
        {formatNumber(this.props.price, {
          precision: 7,
          max: 8,
        })}
      </span>
    );
  }
}
export default TickerPrice;
