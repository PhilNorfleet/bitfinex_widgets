import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

@connect(state => ({
  symbol: state.app.symbol,
}))
export default class Header extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    symbol: PropTypes.string,
    showSymbol: PropTypes.bool,
    onClick: PropTypes.func,
  }
  render() {
    const { onClick, name, symbol, showSymbol } = this.props;
    return (
      <div className='Header' onClick={ this.props.onClick } >
        <div className='HeaderItem name'>{ name }</div>
        { showSymbol && 
          <div className='HeaderItem symbol'>
            { symbol }
          </div>
        }
      </div>
    );
  }
}
