import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Header from './Header';


const Wrapper = styled.div`
  padding: ${ props => props.theme.gutterPx };
  border: 1px ${ props => props.theme.borderColor } solid;
  margin-bottom: ${ props => props.theme.gutterPx };
  display: flex;
  flex-direction: column;
  max-height: 100%;
  ${ props => props.widgetStyle }
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
        <Wrapper widgetStyle={ opts.style }>
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
