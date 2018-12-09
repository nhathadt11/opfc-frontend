import styled, { css } from 'styled-components';

export const OrderDetailEventNameStyled = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

export const EventStartTimeStyled = styled.span`
  font-size: 14px;
  color: #999;
  margin-left: 15px;
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
  margin-bottom: 10px;
  font-weight: 600;
`;

export const ByBrandNameStyled = styled.section`
  font-size: 15px;
  margin-bottom: 10px;
  font-weight: 600;
  text-align: left;

  > span > *:not(:first-child) {
    margin-left: 15px;
  }
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
  font-size: 14px;
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

export const EventPlannerOrderDetailLineStyled = styled.span`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const RatedStyled = styled.span`
  font-weight: normal;
  font-style: italic;
`;

export const BrandOrderStatusStyled = styled.span`
  float: right;
  ${props => props.requesting && css`
    color: #ff9966;
  `}
  ${props => props.completed && css`
    color: #339900;
  `}
  ${props => props.incompleted && css`
    color: #9b9b9b;
  `}
  ${props => props.canceled && css`
    color: #cc3300;
  `}
  ${props => props.approved && css`
    color: #3498db;
  `}
`;
