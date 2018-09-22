import React from 'react';
import { Layout } from 'antd';
import Header from '../components/Header/Header';
import BreadCrumb from '../components/BreadCrumb/BreadCrumb';
import MenuFilterSider from '../components/MenuFilterSider/MenuFilterSider';
import MenuCardGrid from './MenuCardGrid/MenuCardGrid';
import './MainLayout.css';

const { Footer, Content, Sider } = Layout;

const MainLayout = () => (
  <Layout>
    <Header />

    <Layout>
      <BreadCrumb />
    </Layout>

    <Layout>
      <Sider theme="light" width={350}>
        <MenuFilterSider />
      </Sider>
      <Content className="opfc-main-content">
        <MenuCardGrid />
      </Content>
    </Layout>

    <Footer>Footer</Footer>
  </Layout>
);

export default MainLayout;
