import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import GlobalStyle from './Styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import Theme from './Styles/Theme';

ReactDOM.render(
  <>
    <GlobalStyle />
    <ThemeProvider theme={Theme}>
      <Routes />
    </ThemeProvider>
  </>,
  document.getElementById('root')
);
