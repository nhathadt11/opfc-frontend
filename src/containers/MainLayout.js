import React from 'react';
import { Layout } from 'antd';
import Header from '../components/Header/Header';

const { Footer, Content } = Layout;

const MainLayout = () => (
  <Layout>
    <Header />
    <Content>Content</Content>
    <Footer>Footer</Footer>
  </Layout>
);

export default MainLayout;
