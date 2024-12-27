//styled imports
import styled from 'styled-components';

//theme imports
import { theme } from '../../../themes/theme';

export const Container = styled.nav`
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: ${theme.colors.bluishGrayTheme.bluishGray80};
    border-bottom: 1px solid ${theme.colors.bluishGrayTheme.bluishGray50};
    top: 0;
`;

export const Content = styled.div`
    width: 100%;
    max-width: ${theme.utils.dimensions.maxContainer};
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

export const Logo = styled.div`
    width: 100px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;

    img {
        width: 100%;
        object-fit: cover;
    }
`;
