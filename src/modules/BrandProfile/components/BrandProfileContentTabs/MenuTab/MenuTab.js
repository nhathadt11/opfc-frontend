import React, { Fragment, Component } from 'react';
import {
  arrayOf, shape, string, number, func, bool,
} from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';
import CreateMenuModal from '../../Menu/components/CreateMenuModal/CreateMenuModal';
import BrandMenuCard from '../../BrandMenuCard/BrandMenuCard';
import { showCreateMenuModal } from '../../../actions/modals';
import { fetchBrandMenuManyRequest } from '../../../actions/brand';

class MenuTab extends Component {
  static propTypes = {
    menuList: arrayOf(shape({
      id: number,
      menuName: string,
      description: string,
      servingNumber: number,
    })),
    fetchBrandMenuManyRequestAction: func.isRequired,
    showCreateMenuModalAction: func.isRequired,
    match: shape({}).isRequired,
    profiling: bool.isRequired,
  }

  static defaultProps = {
    menuList: [],
  }

  componentDidMount() {
    const { fetchBrandMenuManyRequestAction, match } = this.props;
    const { params: { id } } = match;
    fetchBrandMenuManyRequestAction(id);
  }

  openEditModal = (selectedMenu) => {
    const { showCreateMenuModalAction } = this.props;
    showCreateMenuModalAction(selectedMenu);
  }

  render() {
    const { menuList, profiling } = this.props;

    return (
      <Fragment>
        <Row type="flex" gutter={24}>
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
        <CreateMenuModal />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  menuList: state.brandProfileReducer.brand.menuList,
});

const mapDispatchToProps = {
  fetchBrandMenuManyRequestAction: fetchBrandMenuManyRequest,
  showCreateMenuModalAction: showCreateMenuModal,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(MenuTab);
