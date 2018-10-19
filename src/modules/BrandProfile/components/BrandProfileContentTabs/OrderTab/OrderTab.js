import React, { Component, Fragment } from 'react';
import {
  Table, Badge, Button, Icon,
} from 'antd';
import { ActionGroupStyled, OrderNoStyled } from './OrderTab.styled';
import OrderModal from './OrderModal';

const data = [];
for (let i = 0; i < 9; i += 1) {
  data.push({
    key: i,
    orderId: Math.floor(Math.random() * 255),
    eventId: Math.floor(Math.random() * 255),
    eventName: 'Tet Holiday',
    eventTypeId: 'Conference',
    startAt: '2014-12-24 23:12:00',
    endAt: '2014-12-24 23:12:00',
    status: '',
    servingNumber: (i + 1) * 2,
    cityId: 'Ho Chi Minh',
    districtId: 'Quan 12',
    address: 'CVPM Quan Trung',
    total: (i + 1) * 5,
  });
}

class OrderTab extends Component {
  state = {
    visible: false,
  }

  openModal = () => this.setState({ visible: true })

  closeModal = () => this.setState({ visible: false })

  render() {
    const columns = [
      {
        title: 'Order No.',
        dataIndex: 'orderId',
        key: 'orderId',
        fixed: 'left',
        width: 100,
        render: text => <OrderNoStyled>#{text}</OrderNoStyled>,
      },
      { title: 'Event No.', dataIndex: 'eventId', key: 'eventId', fixed: 'left', width: 100 }, // eslint-disable-line
      { title: 'Event Name', dataIndex: 'eventName', key: 'eventName', width: 150 }, // eslint-disable-line
      { title: 'Event Type', dataIndex: 'eventTypeId', key: 'eventTypeId', width: 150 }, // eslint-disable-line
      { title: 'Start At', dataIndex: 'startAt', key: 'startAt', width: 200 }, // eslint-disable-line
      { title: 'End At', dataIndex: 'endAt', key: 'endAt', width: 200 }, // eslint-disable-line
      { title: 'Status', key: 'status', render: () => <span><Badge status="processing" />On Going</span>, width: 150 }, // eslint-disable-line
      { title: 'Serving Number', dataIndex: 'servingNumber', key: 'servingNumber', width: 150 }, // eslint-disable-line
      { title: 'City', dataIndex: 'cityId', key: 'cityId', width: 150 }, // eslint-disable-line
      { title: 'District', dataIndex: 'districtId', key: 'districtId', width: 150 }, // eslint-disable-line
      { title: 'Address', dataIndex: 'address', key: 'address', width: 150 }, // eslint-disable-line
      { title: 'Total', dataIndex: 'total', key: 'total', width: 150 }, // eslint-disable-line
      {
        title: 'Action',
        key: 'operation',
        render: () => (
          <ActionGroupStyled>
            <Button shape="circle" type="primary">
              <Icon type="check" theme="outlined" />
            </Button>
            <Button shape="circle" type="default" onClick={this.openModal}>
              <Icon type="eye" theme="outlined" />
            </Button>
          </ActionGroupStyled>
        ),
        width: 110,
        fixed: 'right',
      },
    ];
    const { visible } = this.state;

    return (
      <Fragment>
        <Table
          className="components-table-demo-nested"
          columns={columns}
          dataSource={data}
          scroll={{ x: 1850, y: 420 }}
        />
        <OrderModal visible={visible} onOk={this.closeModal} onCancel={this.closeModal} />
      </Fragment>
    );
  }
}

export default OrderTab;
