import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

export const Widget = (WrappedComponent, options) => {
  return class Wrapper extends React.PureComponent {
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
          const regExp = /\(([^)]+)\)/;
          const widgetClass = regExp.exec(WrappedComponent.displayName)[1];
          return (
            <div className={ `WidgetWrapper-${ widgetClass }` }>
              <div className='Widget'>
                { opts.header &&
                  <Header
                    onClick={ options.collapsable && this.handleHeaderClick }
                    { ...options }
                  />
                }
                { this.state.open &&
                  <div className='Body'>
                    <WrappedComponent { ...this.props } />
                  </div>
                }
              </div>
            </div>
          );
        }
  };
};
export default Widget;
