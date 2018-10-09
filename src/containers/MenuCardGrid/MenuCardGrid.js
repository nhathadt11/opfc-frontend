import React, { Component } from 'react';
import { map } from 'lodash';
import { Row, Col } from 'antd';
import { arrayOf, shape, number } from 'prop-types';
import MenuCard from '../../components/MenuCard/MenuCard';

class MenuCardGrid extends Component {
  static propTypes = {
    dataList: arrayOf(shape({
      id: number,
    })).isRequired,
  }

  state = {
    loading: true,
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 400);
  }

  render() {
    const { dataList } = this.props;
    const { loading } = this.state;

    return (
      <Row type="flex" gutter={24}>
        {
          map(dataList, (_, index) => <Col key={index} style={{ margin: '12px 0' }}><MenuCard loading={loading} /></Col>)
        }
      </Row>
    );
  }
}

export default MenuCardGrid;
