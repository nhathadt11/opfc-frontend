import React, { Component } from 'react';
import { Layout, Pagination } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  shape, arrayOf, func, string, number,
} from 'prop-types';
import MenuCardGrid from '../MenuCardGrid/MenuCardGrid';
import MenuFilterSider from '../../components/MenuFilterSider/MenuFilterSider';
import { fetchMenuManyRequest, changeMenuManyPage } from '../../modules/General/actions/general';
import { PaginationContainerStyled } from './Home.styled';

const { Sider, Content } = Layout;

class Home extends Component {
  static propTypes = {
    menuList: arrayOf(shape({})).isRequired,
    fullTextSearchValue: string.isRequired,
    fetchMenuManyRequestAction: func.isRequired,
    changeMenuManyPageAction: func.isRequired,
    page: number.isRequired,
    total: number.isRequired,
  }

  componentDidMount() {
    const { fetchMenuManyRequestAction, fullTextSearchValue } = this.props;
    fetchMenuManyRequestAction(fullTextSearchValue);
  }

  changePage = (page) => {
    const { changeMenuManyPageAction } = this.props;
    changeMenuManyPageAction(page);
  }

  render() {
    const { menuList, page, total } = this.props;

    return (
      <Layout>
        <Sider theme="light" width={280}>
          <MenuFilterSider />
        </Sider>
        <Content className="opfc-main-content">
          <MenuCardGrid dataList={menuList} />
          <PaginationContainerStyled>
            <Pagination pageSize={20} current={page} total={total} onChange={this.changePage} />
          </PaginationContainerStyled>
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  menuList: state.generalReducer.menuList,
  fullTextSearchValue: state.generalReducer.fullTextSearchValue,
  page: state.generalReducer.fullTextSearch.page,
  total: state.generalReducer.fullTextSearch.total,
});

const mapDispatchToProps = {
  fetchMenuManyRequestAction: fetchMenuManyRequest,
  changeMenuManyPageAction: changeMenuManyPage,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Home);
