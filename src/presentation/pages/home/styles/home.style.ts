// styled imports
import styled from 'styled-components';

// theme imports
import { theme } from '../../../themes/theme';

export const Container = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Content = styled.div`
    width: 100%;
    max-width: 500px;
    padding: 17px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-top: 40px;
`;

interface ProgessBarProps {
	status: number;
}

export const ProgessBar = styled.div<ProgessBarProps>`
    width: 100%;
    height: 30px;
    border-radius: 10px;
    background-color: ${theme.colors.bluishGrayTheme.bluishGray90};
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;

    span {
        width: ${({ status }) => `${status}%`};
        height: 100%;
        background: linear-gradient(90deg, ${theme.colors.purpleTheme.purple50} 0%, ${theme.colors.purpleTheme.purple70} 100%);
        position: absolute;
        left: 0;
        transition: all .3s ease;
    }

    p {
        font-family: ${theme.font.family.dmSans};
        color: ${theme.colors.neutralTheme.neutral00};
        position: relative;
    }
`;

export const Form = styled.form`
    width: 100%;
    padding: 20px;
    border-radius: 20px;
    border: 1px solid ${theme.colors.bluishGrayTheme.bluishGray50};
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 15px;

    .buttons {
        margin-top: 10px;
        width: 100%;
    }
`;

export const Header = styled.div`
    width: 100%;
    padding: 20px;
    border-bottom: 1px solid ${theme.colors.bluishGrayTheme.bluishGray50};

    h1 {
        font-size: ${theme.font.size.lg};
        font-family: ${theme.font.family.dmSans};
        color: ${theme.colors.neutralTheme.neutral00};
        text-align: center;
    }
`;

export const Shape = styled.span`
    background-color: ${theme.colors.bluishGrayTheme.bluishGray90};
    width: 33px;
    height: 33px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;

    svg {
        font-size: 20px;
        color: ${theme.colors.neutralTheme.neutral00};
    }
`;

export const Claims = styled.form`
    width: 100%;
    padding: 20px;
    border-radius: 20px;
    border: 1px solid ${theme.colors.bluishGrayTheme.bluishGray50};
    display: flex;
    align-items: center;
    flex-direction: column;


    p {
        font-size: ${theme.font.size.sm};
        font-family: ${theme.font.family.dmSans};
        color: ${theme.colors.neutralTheme.neutral20};
        text-align: center;
        margin-top: 10px;
    }
`;

export const Claim = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${theme.colors.bluishGrayTheme.bluishGray50};
    padding: 10px 0;
    
    div {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
    
    h2 {
        font-size: ${theme.font.size.md};
        font-family: ${theme.font.family.dmSans};
        font-weight: ${theme.font.weight.medium};
        color: ${theme.colors.neutralTheme.neutral00};
        text-align: center;
    }

    p {
        font-size: ${theme.font.size.xs};
        font-family: ${theme.font.family.dmSans};
        font-weight: ${theme.font.weight.extraLight};
        color: ${theme.colors.neutralTheme.neutral00};
        text-align: center;
        margin-top: 0;
    }

    span {
        width: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    span img {
        width: 100%;
    }

    button {
        padding: 3px;
    }

    &:last-child {
        border: none;
    }
`;
