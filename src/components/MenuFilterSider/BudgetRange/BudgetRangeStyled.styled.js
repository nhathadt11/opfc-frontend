import styled from 'styled-components';

export const BudgetLimitStyled = styled.div`
  margin-top: 20px;

  > :last-child {
    margin-left: 30px;

    ::before {
      content: "-";
      position: absolute;
      left: -17px;
      font-size: 17px;
    }
  }

  > .ant-input-number {
    width: calc(50% - 15px)
  }
`;
