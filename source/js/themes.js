import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import createTheme from 'styled-components-theme';

const defaultTheme = {
  gutterPx: '5px',
}
const black = 'rgb(0, 0, 0)';
const white = 'rgb(256, 256, 256)';
const grey1 = 'rgb(13, 13, 13)';
const grey2 = 'rgb(51, 51, 51)';
const grey3 = 'rgb(64, 64, 64)';
const grey4 = 'rgb(77, 77, 77)';
const grey5 = 'rgb(102, 102, 102)';
const grey6 = 'rgb(128, 128, 128)';
const grey7 = 'rgb(192, 192, 192)';
const grey8 = 'rgb(230, 230, 230)';

const colors = {
  dark1: {
    bgColor: black,
    bgAccent: grey4,
    textColor: white,
    textAccent: grey8,
    borderColor: white,
    upColor: (perc = 0.35) => (`rgba(50, 256, 50, ${ perc })`),
    downColor: (perc = 0.35) => (`rgba(256, 50, 50, ${perc})`),
  },
  light1: {
    bgColor: white,
    bgAccent: grey8,
    textColor: black,
    textAccent: grey2,
    borderColor: black,
    upColor: (perc = 0.35) => (`rgba(50, 256, 50, ${perc})`),
    downColor: (perc = 0.35) => (`rgba(256, 50, 50, ${perc})`),
  },
};

export const withTheme = (WrappedComponent) => {
  @connect(state => ({
    themeName: state.app.themeName,
  }))
  class ThemeWrapper extends Component {
    render() {
      return (
        <ThemeProvider theme={ { ...defaultTheme, ...colors[this.props.themeName] } } >
          <WrappedComponent 
            theme={{ ...defaultTheme, ...colors[this.props.themeName] }} 
            { ...this.props } />
        </ThemeProvider>
      )
    }
  }
  return ThemeWrapper;
};
