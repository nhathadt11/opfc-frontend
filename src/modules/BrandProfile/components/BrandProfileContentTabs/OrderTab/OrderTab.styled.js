import styled from 'styled-components';

export const ActionGroupStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > *:not(:first-child) {
    margin-left: 5px;
  }
`;

export const OrderNoStyled = styled.span`
  font-weight: 800;
`;
