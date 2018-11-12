import React from 'react';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';
import Header from '../components/Header/Header';
import BreadCrumb from '../components/BreadCrumb/BreadCrumb';
import './MainLayout.css';
import BrandProfile from '../modules/BrandProfile/BrandProfile';
import MenuDetail from '../components/MenuDetail/MenuDetail';
import EventPlanner from '../modules/EventPlanner/EventPlanner';
import Checkout from '../modules/Checkout/containers/Checkout/Checkout';
import Cart from '../modules/Cart/containers/Cart/Cart';
import RoleChoiceModal from '../modules/Account/components/RoleChoice/RoleChoice';
import CreateBrandModal from './CreateBrandModal/CreateBrandModal';
import CreateEventPlannerModal from '../modules/Account/components/CreateEventPlannerModal/CreateEventPlannerModal';
import LoginModal from '../modules/Account/components/LoginModal/LoginModal';
import RatingModal from '../modules/EventPlanner/components/RatingModal/RatingModal';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import Home from './Home/Home';
import BrandSettings from '../modules/BrandSettings/containers/BrandSettings';

const { Footer } = Layout;

const MainLayout = () => (
  <Layout className="container">
    <Header />

    <Layout>
      <BreadCrumb />
    </Layout>

    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/brand/:id" component={BrandProfile} />
      <Route path="/menus/:id" component={MenuDetail} />
      <PrivateRoute path="/profile/event-planner" component={EventPlanner} />
      <PrivateRoute path="/profile/brand" component={props => <BrandProfile {...props} profiling />} />
      <PrivateRoute path="/profile/settings/account" component={BrandSettings} />
      <PrivateRoute path="/cart" component={Cart} />
      <PrivateRoute path="/checkout" component={Checkout} />
    </Switch>

    <RoleChoiceModal />
    <CreateBrandModal />
    <CreateEventPlannerModal />
    <LoginModal />
    <RatingModal />

    <Footer>Footer</Footer>
  </Layout>
);

export default MainLayout;
