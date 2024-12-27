// styled imports
import styled from 'styled-components';

// theme imports
import { theme } from '../../../themes/theme';

interface ContainerProps {
	width?: string;
	fontSize?: string;
	radius?: string;
}

export const Default = styled.button<ContainerProps>`
    width: 100%;
    max-width: ${({ width }) => (width ? width : '200px')};
    background-color: ${theme.colors.bluishGrayTheme.bluishGray70};
    border: 1px solid ${theme.colors.bluishGrayTheme.bluishGray50};
    border-radius: ${({ radius }) => (radius ? radius : '30px')};
    padding: 10px 20px;
    color: ${theme.colors.neutralTheme.neutral00};
    font-family: ${theme.font.family.dmSans};
    font-weight: ${theme.font.weight.medium};
    font-size:${({ fontSize }) => (fontSize ? fontSize : theme.font.size.md)};
    cursor: pointer;
    transition: .3s ease;
  

    &:hover{
        background-color: ${theme.colors.purpleTheme.purple50};
    }

    &:disabled {
        background-color: ${theme.colors.bluishGrayTheme.bluishGray60};
        cursor: not-allowed;
    }
`;

export const Active = styled.button<ContainerProps>`
    width: 100%;
    max-width: ${({ width }) => (width ? width : '200px')};
    background-color: ${theme.colors.purpleTheme.purple50};
    border: none;
    border-radius: ${({ radius }) => (radius ? radius : '30px')};
    padding: 10px 20px;
    color: ${theme.colors.neutralTheme.neutral00};
    font-family: ${theme.font.family.dmSans};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.size.md};
    cursor: pointer;
    transition: .3s ease;
  

    &:hover{
        background-color: ${theme.colors.purpleTheme.purple70};
    }

    &:disabled {
        background-color: ${theme.colors.bluishGrayTheme.bluishGray60};
        border: none;
        cursor: not-allowed;
    }
`;

export const Outline = styled.button<ContainerProps>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    max-width: ${({ width }) => (width ? width : '200%')};
    background: none;
    border: 2px solid ${theme.colors.neutralTheme.neutral00};
    border-radius: ${({ radius }) => (radius ? radius : '30px')};
    padding: 10px 20px;
    color: ${theme.colors.neutralTheme.neutral00};
    font-family: ${theme.font.family.dmSans};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.size.md};
    cursor: pointer;
    transition: .3s ease;
  

    &:hover{
        background: ${theme.colors.purpleTheme.purple50};
        border: 2px solid ${theme.colors.purpleTheme.purple50};
    }

    &:disabled {
        background-color: ${theme.colors.bluishGrayTheme.bluishGray60};
        cursor: not-allowed;
    }
`;
