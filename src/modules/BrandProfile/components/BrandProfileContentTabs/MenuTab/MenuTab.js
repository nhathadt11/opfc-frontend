import React, { Fragment, Component } from 'react';
import {
  arrayOf, shape, string, number, func,
} from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import MenuCardGrid from '../../../../../containers/MenuCardGrid/MenuCardGrid';
import CreateMenuModal from '../../Menu/components/CreateMenuModal/CreateMenuModal';
import { fetchMenuManyRequest } from '../../../actions/menu';

class MenuTab extends Component {
  static propTypes = {
    menuList: arrayOf(shape({
      id: number,
      menuName: string,
      description: string,
      servingNumber: number,
    })).isRequired,
    fetchMenuManyRequestAction: func.isRequired,
  }

  componentDidMount() {
    const { fetchMenuManyRequestAction } = this.props;
    fetchMenuManyRequestAction();
  }

  render() {
    const { menuList } = this.props;

    return (
      <Fragment>
        <MenuCardGrid dataList={menuList} />
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
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(MenuTab);
