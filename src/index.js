import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import GlobalStyle from './Styles/globalStyle';
import { ThemeProvider } from 'styled-components';
import Theme from './Style/Theme';

ReactDOM.render(
  <>
    <GlobalStyle />
    <ThemeProvider theme={Theme}>
      <Routes />
    </ThemeProvider>
  </>,
  document.getElementById('root')
);
