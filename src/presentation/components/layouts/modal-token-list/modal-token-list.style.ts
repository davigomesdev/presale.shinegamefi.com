//styled imports
import styled from 'styled-components';

//theme imports
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
    padding: 25px;
    border-radius: 20px;
    border: 1px solid ${theme.colors.bluishGrayTheme.bluishGray50};
    background-color: ${theme.colors.bluishGrayTheme.bluishGray80};
    position: relative;

    h1 {
        font-family: ${theme.font.family.dmSans};
        color: ${theme.colors.neutralTheme.neutral00};
        font-weight: ${theme.font.weight.regular};
        font-size: ${theme.font.size.lg};
        text-align: center;
        margin-bottom: 20px;
    }
`;

export const List = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const Item = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    background-color: ${theme.colors.bluishGrayTheme.bluishGray90};
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    transition: all .3s ease;

    span {
        width: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    img {
        width: 100%;
    }

    p {
        font-family: ${theme.font.family.dmSans};
        color: ${theme.colors.neutralTheme.neutral00};
    }

    &:hover {
        background-color: ${theme.colors.purpleTheme.purple50};
    }
`;
