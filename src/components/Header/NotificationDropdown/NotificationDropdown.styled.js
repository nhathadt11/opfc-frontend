import styled, { css } from 'styled-components';

export const NotificationItemStyled = styled.div`
  display: block;
`;

export const NotificationContentStyled = styled.span`
  :not(:last-child) {
    margin-right: 5px;
  }
  :not(:first-child) {
    margin-left: 5px;
  }

  ${props => props.bold && css`
    font-weight: 600;
  `}
`;

export const NotificationTimeStyled = styled.div`
  color: #90949c;
`;
