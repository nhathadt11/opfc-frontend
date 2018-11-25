import React, { Component, Fragment } from 'react';
import {
  Table, Badge, Button, Icon, Modal,
} from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  func, arrayOf, shape, bool,
} from 'prop-types';
import { ActionGroupStyled, OrderNoStyled } from './OrderTab.styled';
import OrderModal from './OrderModal';
import { fetchOrderManyRequest, cancelBrandOrderRequest, approveBrandOrderRequest } from '../../../actions/order';

class OrderTab extends Component {
  static propTypes = {
    fetchOrderManyRequestAction: func.isRequired,
    orderList: arrayOf(shape({})).isRequired,
    fetching: bool.isRequired,
    cancelBrandOrderRequestAction: func.isRequired,
    approveBrandOrderRequestAction: func.isRequired,
  }

  state = {
    visible: false,
    data: {},
  }

  componentDidMount() {
    const { fetchOrderManyRequestAction } = this.props;
    fetchOrderManyRequestAction();
  }

  openModal = data => this.setState({ visible: true, data });

  closeModal = () => this.setState({ visible: false, data: {} })

  confirmCancelBrandOrder = (orderLineId) => {
    const { cancelBrandOrderRequestAction } = this.props;

    const modal = Modal.confirm({
      title: 'Cancel order',
      content: `Are you sure to cancel order #${orderLineId}`,
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => cancelBrandOrderRequestAction(orderLineId, modal.destroy),
      maskClosable: true,
    });
  }

  confirmApproveBrandOrder = (orderLineId) => {
    const { approveBrandOrderRequestAction } = this.props;

    const modal = Modal.confirm({
      title: 'Approve order',
      content: `Are you sure to approve order #${orderLineId}`,
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => approveBrandOrderRequestAction(orderLineId, modal.destroy),
      maskClosable: true,
    });
  }

  render() {
    const columns = [
      {
        title: 'Order No.',
        dataIndex: 'orderNo',
        key: 'orderNo',
        fixed: 'left',
        width: 100,
        render: text => <OrderNoStyled>#{text}</OrderNoStyled>,
      },
      { title: 'Event No.', dataIndex: 'eventNo', key: 'eventNo', fixed: 'left', width: 100 }, // eslint-disable-line
      { title: 'Event Name', dataIndex: 'eventName', key: 'eventName', width: 150 }, // eslint-disable-line
      { title: 'Event Type', dataIndex: 'eventTypeName', key: 'eventTypeName', width: 150 }, // eslint-disable-line
      { title: 'Start At', dataIndex: 'startAt', key: 'startAt', width: 200, render: text => moment(text).format('YYYY-MM-DD HH:mm') }, // eslint-disable-line
      { title: 'End At', dataIndex: 'endAt', key: 'endAt', width: 200, render: text => moment(text).format('YYYY-MM-DD HH:mm') }, // eslint-disable-line
      { title: 'Order Status', dataIndex: 'orderStatus', key: 'orderStatus', render: text => <span><Badge status="processing" />{text}</span>, width: 150 }, // eslint-disable-line
      // { title: 'Event Status', dataIndex: 'eventStatus', key: 'eventStatus', render: text => <span><Badge status="processing" />{text}</span>, width: 150 }, // eslint-disable-line
      { title: 'Serving Number', dataIndex: 'servingNumber', key: 'servingNumber', width: 150 }, // eslint-disable-line
      { title: 'City', dataIndex: 'cityName', key: 'cityName', width: 150 }, // eslint-disable-line
      { title: 'District', dataIndex: 'districtName', key: 'districtName', width: 150 }, // eslint-disable-line
      { title: 'Address', dataIndex: 'address', key: 'address', width: 150 }, // eslint-disable-line
      { title: 'Total', dataIndex: 'totalAmount', key: 'totalAmount', width: 150 }, // eslint-disable-line
      {
        title: 'Action',
        key: 'operation',
        render: (text, record) => (
          <ActionGroupStyled>
            <Button shape="circle" type="primary" onClick={() => this.confirmApproveBrandOrder(record.orderNo)}>
              <Icon type="check" theme="outlined" />
            </Button>
            <Button shape="circle" type="danger" onClick={() => this.confirmCancelBrandOrder(record.orderNo)}>
              <Icon type="close" theme="outlined" />
            </Button>
            <Button shape="circle" type="default" onClick={() => this.openModal(record)}>
              <Icon type="eye" theme="outlined" />
            </Button>
          </ActionGroupStyled>
        ),
        width: 150,
        fixed: 'right',
      },
    ];
    const { visible, data } = this.state;
    const { orderList, fetching } = this.props;

    return (
      <Fragment>
        <Table
          className="components-table-demo-nested"
          columns={columns}
          dataSource={orderList}
          scroll={{ x: 1850, y: 420 }}
          loading={fetching}
        />
        <OrderModal
          visible={visible}
          onOk={this.closeModal}
          onCancel={this.closeModal}
          orderLineList={data.brandOderLineList}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  orderList: state.brandProfileReducer.order.orderList,
  fetching: state.brandProfileReducer.order.fetching,
});

const mapDispatchToProps = {
  fetchOrderManyRequestAction: fetchOrderManyRequest,
  cancelBrandOrderRequestAction: cancelBrandOrderRequest,
  approveBrandOrderRequestAction: approveBrandOrderRequest,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(OrderTab);
