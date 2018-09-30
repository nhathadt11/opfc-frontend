import React from 'react';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';
import Header from '../components/Header/Header';
import BreadCrumb from '../components/BreadCrumb/BreadCrumb';
import MenuFilterSider from '../components/MenuFilterSider/MenuFilterSider';
import MenuCardGrid from './MenuCardGrid/MenuCardGrid';
import './MainLayout.css';
import BrandProfile from '../modules/BrandProfile/BrandProfile';
import MenuDetail from '../components/MenuDetail/MenuDetail';
import EventPlanner from '../modules/EventPlanner/EventPlanner';

const { Footer, Content, Sider } = Layout;

const Home = props => (
  <Layout {...props}>
    <Sider theme="light" width={280}>
      <MenuFilterSider />
    </Sider>
    <Content className="opfc-main-content">
      <MenuCardGrid />
    </Content>
  </Layout>
);

const MainLayout = () => (
  <Layout className="container">
    <Header />

    <Layout>
      <BreadCrumb />
    </Layout>

    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/profile/brand" component={BrandProfile} />
      <Route path="/menus/:id" component={MenuDetail} />
      <Route path="/profile/event-planner" component={EventPlanner} />
    </Switch>

    <Footer>Footer</Footer>
  </Layout>
);

export default MainLayout;
