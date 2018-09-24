import React, { Fragment } from 'react';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';
import Header from '../components/Header/Header';
import BreadCrumb from '../components/BreadCrumb/BreadCrumb';
import MenuFilterSider from '../components/MenuFilterSider/MenuFilterSider';
import MenuCardGrid from './MenuCardGrid/MenuCardGrid';
import './MainLayout.css';
import BrandProfile from '../modules/BrandProfile/BrandProfile';

const { Footer, Content, Sider } = Layout;

const Home = props => (
  <Fragment>
    <Layout>
      <BreadCrumb />
    </Layout>

    <Layout {...props}>
      <Sider theme="light" width={280}>
        <MenuFilterSider />
      </Sider>
      <Content className="opfc-main-content">
        <MenuCardGrid />
      </Content>
    </Layout>
  </Fragment>
);

const MainLayout = () => (
  <Layout className="container">
    <Header />

    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/profile/brand" component={BrandProfile} />
    </Switch>

    <Footer>Footer</Footer>
  </Layout>
);

export default MainLayout;
