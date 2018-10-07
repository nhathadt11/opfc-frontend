import React, { Fragment } from 'react';
import MenuCardGrid from '../../../../../containers/MenuCardGrid/MenuCardGrid';
import CreateMenuModal from '../../Menu/components/CreateMenuModal/CreateMenuModal';

const MenuTab = () => (
  <Fragment>
    <MenuCardGrid dataList={Array.from(Array(12))} />
    <CreateMenuModal />
  </Fragment>
);

export default MenuTab;
