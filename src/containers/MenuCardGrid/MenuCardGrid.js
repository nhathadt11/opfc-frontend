import React, { Component } from 'react';
import { map } from 'lodash';
import { Row, Col } from 'antd';
import MenuCard from '../../components/MenuCard/MenuCard';

class MenuCardGrid extends Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }

  render() {
    const { loading } = this.state;

    return (
      <Row type="flex" gutter={24} style={{ margin: 'auto 24px' }}>
        {
          map(Array.from(Array(12)), (_, index) => <Col key={index} style={{ margin: '12px 0' }}><MenuCard loading={loading} /></Col>)
        }
      </Row>
    );
  }
}

export default MenuCardGrid;
