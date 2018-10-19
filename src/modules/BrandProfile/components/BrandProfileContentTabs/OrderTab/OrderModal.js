import React from 'react';
import {
  Modal, Table, Button, Icon,
} from 'antd';
import { bool, func } from 'prop-types';
import { ActionGroupStyled } from './OrderTab.styled';

const columns = [{
  title: 'Menu Name',
  dataIndex: 'menuName',
  key: 'menuName',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Description',
  dataIndex: 'description',
  key: 'description',
}, {
  title: 'Price',
  dataIndex: 'price',
  key: 'price',
}, {
  title: 'Action',
  key: 'action',
  render: () => (
    <ActionGroupStyled>
      <Button shape="circle" type="primary">
        <Icon type="check" theme="outlined" />
      </Button>
      <Button shape="circle" type="danger">
        <Icon type="close" theme="outlined" />
      </Button>
    </ActionGroupStyled>
  ),
  width: 110,
}];

const data = [{
  key: '1',
  menuName: 'John Brown',
  price: Math.floor(Math.random() * 255),
  description: 'New York No. 1 Lake Park',
}, {
  key: '2',
  menuName: 'Jim Green',
  price: Math.floor(Math.random() * 255),
  description: 'London No. 1 Lake Park',
}, {
  key: '3',
  menuName: 'Joe Black',
  price: Math.floor(Math.random() * 255),
  description: 'Sidney No. 1 Lake Park',
}];

const OrderModal = ({ visible, onOk, onCancel }) => (
  <Modal
    title="Order #32"
    visible={visible}
    onOk={onOk}
    onCancel={onCancel}
    footer={null}
    width={700}
  >
    <Table columns={columns} dataSource={data} pagination={false} />
  </Modal>
);

OrderModal.propTypes = {
  visible: bool.isRequired,
  onOk: func.isRequired,
  onCancel: func.isRequired,
};

export default OrderModal;
