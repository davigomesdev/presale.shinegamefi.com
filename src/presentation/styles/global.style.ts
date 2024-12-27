// styled imports
import { createGlobalStyle } from 'styled-components';

// theme imports
import { theme } from '../themes/theme';

const globalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        list-style: none;
    }

    body {
        background-color: ${theme.colors.bluishGrayTheme.bluishGray80};
    }

    a {
        text-decoration: none;
    }
`;

export default globalStyle;
