import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createGlobalStyle } from 'styled-components';
import PaymentWidget from '../../containers/PaymentWidget';

const GlobalStyle = createGlobalStyle`
    html {
        height: 100vh;
    }

    body {
        height: 100%;

        #root {
            height: 100%;
        }
    }
`

const App = () => (
    <Fragment>
        <CssBaseline />
        <GlobalStyle />
        <PaymentWidget amount={5} currency="USD" />
    </Fragment>
);

export default App;