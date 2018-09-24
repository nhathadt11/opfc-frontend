import React from 'react';
import { Layout } from 'antd';
import BrandProfileHeader from '../../components/BrandProfileHeader/BrandProfileHeader';
import BrandProfileContent from '../../components/BrandProfileContent/BrandProfileContent';

const BrandProfile = () => (
  <Layout>
    <BrandProfileHeader />
    <BrandProfileContent />
  </Layout>
);

export default BrandProfile;
