// styled imports
import styled from 'styled-components';

// theme imports
import { theme } from '../../../themes/theme';

export const Group = styled.div`
  width: 100%;
  background-color: ${theme.colors.bluishGrayTheme.bluishGray90};
  padding: 17px 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  
  span {
    font-weight: ${theme.font.weight.medium};
  }
`;

export const Label = styled.label`
  font-size: ${theme.font.size.xs};
  font-weight: ${theme.font.weight.regular};
  font-family: ${theme.font.family.dmSans};
  color: ${theme.colors.neutralTheme.neutral00};
  display: flex;
  justify-content: space-between;
  gap: 3px;
`;

interface ContainerProps {
	isValid: boolean;
}

export const Content = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

export const Container = styled.input<ContainerProps>`
  width: 100%;
  padding: 5px;
  border-radius: 20px;
  outline: none;
  border: none;
  background: none;

  font-size:  ${theme.font.size.sm};
  font-weight: ${theme.font.weight.regular};
  font-family: ${theme.font.family.dmSans};
  color: ${theme.colors.neutralTheme.neutral00};

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const MaxButton = styled.button`
  border: 1px solid ${theme.colors.bluishGrayTheme.bluishGray50};
  background: none;
  font-size:  ${theme.font.size.sm};
  font-weight: ${theme.font.weight.bold};
  font-family: ${theme.font.family.dmSans};
  color: ${theme.colors.bluishGrayTheme.bluishGray50};
  cursor: pointer;
  padding: 0 7px;
  border-radius: 7px;
  transition: all .3s ease;
  
  &:hover {
    background: ${theme.colors.purpleTheme.purple50};
    color: ${theme.colors.neutralTheme.neutral00}
  }
`;

export const SelectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background-color: ${theme.colors.bluishGrayTheme.bluishGray70};
  padding: 5px 7px;
  border: none;
  cursor: pointer;
  border-radius: 30px;
  color: ${theme.colors.neutralTheme.neutral00};
  transition: all .3s ease;

  &:hover {
    background: ${theme.colors.purpleTheme.purple50};
  }

  span {
    width: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 100%;
  }
`;
