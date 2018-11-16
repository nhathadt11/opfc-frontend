import styled, { css } from 'styled-components';

export const LabelStyled = styled.span`
  color: #999;
`;

export const ValueStyled = styled.span`
  font-weight: 600;
`;

export const OrderStatusStyled = styled.span`
  margin-left: 7px;
  font-weight:600;

  ${props => props.success && css`
    color: #52c41a;
  `}
`;

export const EventDateStyled = styled.span`
  /* margin-left: 7px; */
  color: #999;
  font-style: italic;
`;

export const PriceAndMenuStyled = styled.div`
  margin-top: 15px;
`;

export const OrderNoteStyled = styled.div`
  margin-top: 15px;
`;
