import React from 'react';
import {
  SiderItemTitleStyled, SiderItemValueStyled,
  StepPickMenuSiderStyled, StepPickMenuSiderItemStyled,
} from './StepMenuSider.styled';

const StepPickMenuSider = () => (
  <StepPickMenuSiderStyled>
    <StepPickMenuSiderItemStyled>
      <SiderItemTitleStyled>Event Name</SiderItemTitleStyled>
      <SiderItemValueStyled>ABC</SiderItemValueStyled>
    </StepPickMenuSiderItemStyled>
    <StepPickMenuSiderItemStyled>
      <SiderItemTitleStyled>Event Type</SiderItemTitleStyled>
      <SiderItemValueStyled>Birthday</SiderItemValueStyled>
    </StepPickMenuSiderItemStyled>
    <StepPickMenuSiderItemStyled>
      <SiderItemTitleStyled>Budget</SiderItemTitleStyled>
      <SiderItemValueStyled>$23.60</SiderItemValueStyled>
    </StepPickMenuSiderItemStyled>
    <StepPickMenuSiderItemStyled>
      <SiderItemTitleStyled>Serving Number</SiderItemTitleStyled>
      <SiderItemValueStyled>12</SiderItemValueStyled>
    </StepPickMenuSiderItemStyled>
    <StepPickMenuSiderItemStyled>
      <SiderItemTitleStyled>Time Range</SiderItemTitleStyled>
      <SiderItemValueStyled>Sept 12th, 10:00 pm - 12:00pm</SiderItemValueStyled>
    </StepPickMenuSiderItemStyled>
    <StepPickMenuSiderItemStyled>
      <SiderItemTitleStyled>Address</SiderItemTitleStyled>
      <SiderItemValueStyled>123 New York</SiderItemValueStyled>
    </StepPickMenuSiderItemStyled>
  </StepPickMenuSiderStyled>
);

export default StepPickMenuSider;
