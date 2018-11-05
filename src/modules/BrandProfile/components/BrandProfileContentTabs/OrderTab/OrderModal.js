import React from 'react';
import { Modal, Table } from 'antd';
import {
  bool, func, arrayOf, shape,
} from 'prop-types';

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
