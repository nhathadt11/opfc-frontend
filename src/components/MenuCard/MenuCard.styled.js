import styled from 'styled-components';

export const MenuCardTitleStyled = styled.a`
  font-size: 16px;
  font-weight: 300;
  margin-top: 5px;
  overflow: hidden;
  line-height: 18px;
  color: #f68b40;
  max-height: 48px;
  cursor: pointer;
`;

export const MenuCardContentStyled = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 13px;
`;

export const CatergoryLabelStyled = styled.div`
  min-width: 30px;
  max-width: 200px;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 30px;

  background: #f68b40;
  position: absolute;
  top: 17px;
  left: -5px;
  color: #fff;
  padding: 0px 10px;
  -webkit-box-shadow: 0 0 7px rgba(43,48,52,0.3);
  box-shadow: 0 0 7px rgba(43,48,52,0.3);
  font-weight: 400;
  text-shadow: 1px 1px 0px rgba(43,48,52,0.2);
  height: 30px;
  font-size: 14px;
  letter-spacing: 1px;

  &::after {
    position: absolute;
    content: "";
    right: -10px;
    top: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 15px 0 15px 10px;
    border-color: transparent transparent transparent #f68b40;
  }
`;
