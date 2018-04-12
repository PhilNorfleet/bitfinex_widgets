import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Header from './Header';


const Wrapper = styled.div`
  padding: var(--gutterPx);
  border: 1px var(--borderColor) solid;
  margin-bottom: var(--gutterPx);
  display: flex;
  flex-direction: column;
  max-height: 100%;
  ${ props => props.style }
`;
const Body = styled.div`
  overflow-y: auto;
`;
export const WidgetFactory = (WrappedComponent, options) => {
  return class WidgetWrapper extends React.Component {
    static propTypes = {
      dispatch: PropTypes.func,
    }
    constructor(props) {
      super(props);
      this.state = {
        open: true,
      };
    }
    handleHeaderClick = () => {
      this.setState({ open: !this.state.open });
    }
    render() {
      const opts = options || {};
      return (
        <Wrapper style={ opts.style }>
          { opts.header &&
            <Header
              onClick={ opts.collapsable && this.handleHeaderClick }
              open={ this.state.open }
              { ...options }
            />
          }
          { this.state.open &&
            <Body>
              <WrappedComponent { ...this.props } />
            </Body>
          }
        </Wrapper>
      );
    }
  };
};
export default WidgetFactory;
