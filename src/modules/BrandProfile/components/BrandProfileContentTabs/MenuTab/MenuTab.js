import React, { Fragment, Component } from 'react';
import {
  arrayOf, shape, string, number, func, bool,
} from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { Row, Col, Spin } from 'antd';
import CreateMenuModal from '../../Menu/components/CreateMenuModal/CreateMenuModal';
import BrandMenuCard from '../../BrandMenuCard/BrandMenuCard';
import { showCreateMenuModal } from '../../../actions/modals';
import { fetchBrandMenuManyRequest } from '../../../actions/brand';
import './MenuTab.css';

class MenuTab extends Component {
  static propTypes = {
    menuList: arrayOf(shape({
      id: number,
      menuName: string,
      description: string,
      servingNumber: number,
    })),
    showCreateMenuModalAction: func.isRequired,
    profiling: bool,
    fetching: bool,
  }

  static defaultProps = {
    menuList: [],
    profiling: false,
    fetching: false,
  }

  openEditModal = (selectedMenu) => {
    const { showCreateMenuModalAction } = this.props;
    showCreateMenuModalAction(selectedMenu);
  }

  render() {
    const { menuList, profiling, fetching } = this.props;

    return (
      <Fragment>
        <Spin spinning={fetching}>
          <Row type="flex" gutter={24} className="opfc-brand-menu-tab">
            {
              map(menuList, (menu, index) => (
                <Col
                  key={index}
                  xs={{ span: 24 }}
                  md={{ span: 12 }}
                  lg={{ span: 8 }}
                  style={{ marginTop: 16 }}
                >
                  <BrandMenuCard
                    menu={menu}
                    openEditModal={() => this.openEditModal(menu)}
                    profiling={profiling}
                  />
                </Col>
              ))
            }
          </Row>
        </Spin>
        <CreateMenuModal />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  menuList: state.brandProfileReducer.brand.menuList,
  fetching: state.brandProfileReducer.brand.fetchingMenu,
});

const mapDispatchToProps = {
  fetchBrandMenuManyRequestAction: fetchBrandMenuManyRequest,
  showCreateMenuModalAction: showCreateMenuModal,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(MenuTab);
