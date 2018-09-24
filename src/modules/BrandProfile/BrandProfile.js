import React from 'react';
import BrandProfileHeader from './components/BrandProfileHeader/BrandProfileHeader';
import BrandProfileContent from './components/BrandProfileContent/BrandProfileContent';
import { BrandProfileStyled } from './BrandProfile.styled';

const BrandProfile = () => (
  <BrandProfileStyled>
    <BrandProfileHeader />
    <BrandProfileContent />
  </BrandProfileStyled>
);

export default BrandProfile;
