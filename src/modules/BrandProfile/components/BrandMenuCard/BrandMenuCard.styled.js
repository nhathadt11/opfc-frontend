import styled, { css } from 'styled-components';

export const MenuInfoTitleStyled = styled.span`
  font-size: 13px;
  color: #999;
  margin-right: 7px;
`;

export const MenuInfoValueStyled = styled.span`
  font-weight: 600;
  
  ${props => props.desc && css`
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `}
`;
