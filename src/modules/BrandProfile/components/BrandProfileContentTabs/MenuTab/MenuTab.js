import React, { Fragment, Component } from 'react';
import {
  arrayOf, shape, string, number, func,
} from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { Row, Col } from 'antd';
import CreateMenuModal from '../../Menu/components/CreateMenuModal/CreateMenuModal';
import { fetchMenuManyRequest } from '../../../actions/menu';
import BrandMenuCard from '../../BrandMenuCard/BrandMenuCard';
import { showCreateMenuModal } from '../../../actions/modals';

class MenuTab extends Component {
  static propTypes = {
    menuList: arrayOf(shape({
      id: number,
      menuName: string,
      description: string,
      servingNumber: number,
    })),
    fetchMenuManyRequestAction: func.isRequired,
    showCreateMenuModalAction: func.isRequired,
  }

  static defaultProps = {
    menuList: [],
  }

  componentDidMount() {
    const { fetchMenuManyRequestAction } = this.props;
    fetchMenuManyRequestAction();
  }

  openEditModal = (selectedMenu) => {
    const { showCreateMenuModalAction } = this.props;
    showCreateMenuModalAction(selectedMenu);
  }

  render() {
    const { menuList } = this.props;

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
                <BrandMenuCard menu={menu} openEditModal={() => this.openEditModal(menu)} />
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
  menuList: state.brandProfileReducer.menu.menuList,
});

const mapDispatchToProps = {
  fetchMenuManyRequestAction: fetchMenuManyRequest,
  showCreateMenuModalAction: showCreateMenuModal,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(MenuTab);
