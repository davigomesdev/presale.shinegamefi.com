// styled imports
import styled from 'styled-components';

// theme imports
import { theme } from '../../../themes/theme';

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: ${theme.utils.zIndices.modal};
    backdrop-filter: blur(1px);
    padding: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Background = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: ${theme.colors.neutralTheme.neutral100};
    opacity: ${theme.utils.opacity.medium};
`;

export const Content = styled.div`
    width: 100%;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px 20px;
    border-radius: 20px;
    border: 1px solid ${theme.colors.bluishGrayTheme.bluishGray50};
    background-color: ${theme.colors.bluishGrayTheme.bluishGray80};
    position: relative;

    h1 {
        font-family: ${theme.font.family.dmSans};
        color: ${theme.colors.neutralTheme.neutral00};
        font-weight: ${theme.font.weight.bold};
        font-size: ${theme.font.size.lg};
        text-align: center;
        margin-bottom: 10px;
    }

    p {
        font-family: ${theme.font.family.dmSans};
        color: ${theme.colors.neutralTheme.neutral00};
        font-weight: ${theme.font.weight.light};
        font-size: ${theme.font.size.sm};
        text-align: center;
    }

    svg {
        color: ${theme.colors.redTheme.red50};
        font-size: 60px;
        margin-bottom: 20px;
    }

    button {
        margin-top: 20px;
    }
`;
