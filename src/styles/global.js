import { createGlobalStyle } from 'styled-components';

import 'font-awesome/css/font-awesome.css';

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0; // tira a borda dentro do botão quando é clicado (Chrome)
    }

    body {
        background: #9b65e6;
        text-rendering: optimizeLegibility !important; //deixa a font mais legivel no google chrome
        -webkit-font-smoothing: antialiased !important;
        font-family: sans-serif;
    }
`;

export default GlobalStyles;
