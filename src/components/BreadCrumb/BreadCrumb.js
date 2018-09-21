import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import './BreadCrumb.css';

const routeConfigs = [{
  path: 'index',
  breadcrumbName: 'home',
}, {
  path: 'first',
  breadcrumbName: 'first',
}, {
  path: 'second',
  breadcrumbName: 'second',
}];

const itemRender = (route, params, routes, paths) => {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? <Breadcrumb.Item>{route.breadcrumbName}</Breadcrumb.Item> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
};

// export default props => <Breadcrumb {...props} itemRender={itemRender} routes={routeConfigs} />;
export default () => (
  <Breadcrumb separator=">" className="opfc-breadcrumb">
    <Breadcrumb.Item>Home</Breadcrumb.Item>
    <Breadcrumb.Item href="">Desserts</Breadcrumb.Item>
    <Breadcrumb.Item href="">Strawberry</Breadcrumb.Item>
  </Breadcrumb>
);
