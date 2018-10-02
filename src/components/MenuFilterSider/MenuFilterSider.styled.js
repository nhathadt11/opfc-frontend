import styled, { css } from 'styled-components';

export const MenuFilterItemStyled = styled.div`
  padding: 30px;
  :not(:first-child) {
    padding-top: 0;
  }
`;

export const MenuFilterItemTitleStyled = styled.h4`
  text-transform: uppercase;
  font-weight: 600;
`;

export const NumberRangeStyled = styled.div`
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

  ${props => props.servingNumber && css`
    margin-top: 0;
  `}
`;
