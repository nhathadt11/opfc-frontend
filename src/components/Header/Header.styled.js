import styled from 'styled-components';
import { Button } from 'antd';

export const UserIconGroupStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  > * {
    margin: 5px;
  }
`;

export const CreateAProfileButtonStyled = styled(Button)`
  height: 40px;
`;

export const LogoStyled = styled.img`
  height: 68px;
`;
