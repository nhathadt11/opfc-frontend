import React from 'react';
import { Layout } from 'antd';
import Header from '../components/Header/Header';
import BreadCrumb from '../components/BreadCrumb/BreadCrumb';

const { Footer, Content } = Layout;

const MainLayout = () => (
  <Layout>
    <Header />
    <Content>
      <BreadCrumb />
    </Content>
    <Footer>Footer</Footer>
  </Layout>
);

export default MainLayout;
