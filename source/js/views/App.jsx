import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { routeCodes } from 'constants/routes';
import styled from 'styled-components';
import { withTheme } from 'themes';
import Home from 'views/Home';
import NotFound from 'views/NotFound';

const Root = styled.div`
  background-color: ${ props => props.theme.bgColor };
  color: ${ props => props.theme.textColor };
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

class App extends Component {
  render() {
    return (
      <Root>
        <Switch>
          <Route exact path={ routeCodes.HOME } component={ Home } />
          <Route path='*' component={ NotFound } />
        </Switch>
      </Root>
    );
  }
}

export default hot(module)(withTheme(App));
