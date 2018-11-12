import React from 'react';
import { Switch } from 'react-router-dom';
import { Layout } from 'antd';
import BrandSettingsSider from '../components/BrandSettingsSider/BrandSettingsSider';
import PrivateRoute from '../../../components/PrivateRoute/PrivateRoute';
import { BrandSettingsTabContentStyled } from '../components/BrandSettingsSider/BrandSettingsSider.styled';
import BrandAccount from '../components/BrandAccount/BrandAccount';
import './BrandSettings.css';

const BrandSettings = () => (
  <Layout className="opfc-brand-settings">
    <BrandSettingsSider />
    <BrandSettingsTabContentStyled>
      <Switch>
        <PrivateRoute path="/profile/settings/account" component={BrandAccount} />
      </Switch>
    </BrandSettingsTabContentStyled>
  </Layout>
);

export default BrandSettings;
