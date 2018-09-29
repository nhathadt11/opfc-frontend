import styled, { css } from 'styled-components';

export const OrderDetailEventNameStyled = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

export const EventStartTimeStyled = styled.span`
  font-size: 12px;
  color: #999;
  margin-left: 7px;
  
`;

export const OrderDetailDateStyled = styled.div`
  font-size: 12px;
  color: #9d9d9d;
`;

export const OrderDetailStatusOverallStyled = styled.span`
  font-weight: 600;
  margin-left: 7px;

  ${props => props.success && css`
    color: #52c41a;
  `}
`;

export const OverallStyled = styled.span`
  font-style: italic;
  font-size: 13px;
  margin-left: 7px;
  color: #999;
`;

export const OrderDetailStatusOverallWrapperStyled = styled.span`
  margin-left: 25px;
`;

export const MenuNameStyled = styled.div`

`;

export const ByBrandNameStyled = styled.section`
  font-size: 11px;
  color: #9d9d9d;
  margin-bottom: 10px;
  font-style: italic;
`;

export const OrderDetailStatusWrapperStyled = styled.div`
  text-align: right;
  margin-top: 7px;
`;

export const OrderDetailStatusStyled = styled.span`
  font-size: 13px;
  margin-left: 7px;

  ${props => props.success && css`
    color: #52c41a;
  `}
`;

export const OrderItemPriceLabel = styled.span`
  font-size: 12px;
  color: #9d9d9d;
  margin-right: 7px;
`;

export const OrderItemShippingFeeLabel = styled.span`
  font-size: 12px;
  color: #9d9d9d;
  margin-right: 7px;
`;

export const OrderItemSubTotalLabel = styled.span`
  font-weight: 600;
  margin-right: 7px;
`;

export const OrderItemSubTotalPriceStyled = styled.span`
  font-weight: 600;
`;

export const OrderItemTotalLabel = styled.span`
  font-size: 18px;
`;
