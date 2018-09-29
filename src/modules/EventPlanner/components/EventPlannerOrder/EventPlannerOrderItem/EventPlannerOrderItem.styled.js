import styled, { css } from 'styled-components';

export const LabelStyled = styled.span`
  color: #999;
`;

export const OrderStatusStyled = styled.span`
  margin-left: 7px;

  ${props => props.success && css`
    color: #52c41a;
  `}
`;

export const PriceAndMenuStyled = styled.div`
  margin-top: 15px;
`;

export const OrderNoteStyled = styled.div`
  margin-top: 15px;
`;
