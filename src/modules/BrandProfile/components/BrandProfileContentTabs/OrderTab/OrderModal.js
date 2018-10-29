import React from 'react';
import {
  Modal, Table, Button, Icon,
} from 'antd';
import {
  bool, func, arrayOf, shape,
} from 'prop-types';
import { ActionGroupStyled } from './OrderTab.styled';

const columns = [{
  title: 'Menu Name',
  dataIndex: 'menuName',
  key: 'menuName',
}, {
  title: 'Note',
  dataIndex: 'note',
  key: 'note',
}, {
  title: 'Price',
  dataIndex: 'price',
  key: 'price',
}, {
  title: 'Status',
  dataIndex: 'status',
  key: 'status',
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

const OrderModal = ({
  visible, onOk, onCancel, orderLineList,
}) => (
  <Modal
    title="Order #32"
    visible={visible}
    onOk={onOk}
    onCancel={onCancel}
    footer={null}
    width={700}
  >
    <Table columns={columns} dataSource={orderLineList} pagination={false} />
  </Modal>
);

OrderModal.propTypes = {
  visible: bool.isRequired,
  onOk: func.isRequired,
  onCancel: func.isRequired,
  orderLineList: arrayOf(shape({})).isRequired,
};

export default OrderModal;
