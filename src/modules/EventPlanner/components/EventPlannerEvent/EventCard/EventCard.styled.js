import styled, { css } from 'styled-components';

export const EventNameStyled = styled.h3`
  font-weight: 600;
`;

export const EventInfoLabelStyled = styled.span`
  color: #999;
  margin-right: 7px;
  text-align: right;
`;

export const EventInfoValueStyled = styled.span`
  ${props => props.planning && css`
    color: #ff9966;
  `}
  ${props => props.planned && css`
    color: #339900;
  `}
  font-weight: 600;
`;
