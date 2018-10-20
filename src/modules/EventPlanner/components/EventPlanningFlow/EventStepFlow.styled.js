import styled from 'styled-components';

export const EventStepContentStyled = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

export const ActionButtonGroupStyled = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  background-color: #fff;
  > button:not(:first-child) {
    margin-left: 15px;
  }
`;
