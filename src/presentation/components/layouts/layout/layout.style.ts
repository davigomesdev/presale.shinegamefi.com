// styled imports
import styled from 'styled-components';
import { theme } from '../../../themes/theme';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
`;

export const Connect = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  h1 {
    font-family: ${theme.font.family.dmSans};
    color: ${theme.colors.neutralTheme.neutral00};
    font-weight: ${theme.font.weight.regular};
    font-size: ${theme.font.size['2xl']};
  }
`;
