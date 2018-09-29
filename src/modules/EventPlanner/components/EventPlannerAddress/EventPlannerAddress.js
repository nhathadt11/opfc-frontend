import React, { Component } from 'react';
import {
  List, Button, Icon, Row, Col, Modal,
} from 'antd';
import { isEmpty } from 'lodash';
import { EventPlannerTabTitleStyled } from '../../EventPlanner.styled';
import './EventPlannerAddress.css';
import {
  ReceiverStyled, PhoneNumberStyled, AddressStyled, PhoneNumberLabelStyled, AddressLabelStyled,
} from './EventPlannerAddress.styled';
import EditEventPlannerAddressModal from './EditEventPlannerAddressModal/EditEventPlannerAddressModal';

const data = [
  {
    receiver: 'John Doe', address: '123 To Ky', city: 'Ho Chi Minh', district: 'Go Vap', ward: 'Phuong 14', phoneNumber: '123456789',
  },
  {
    receiver: 'John Doe', address: '123 To Ky', city: 'Ho Chi Minh', district: 'Go Vap', ward: 'Phuong 14', phoneNumber: '123456789',
  },
  {
    receiver: 'John Doe', address: '123 To Ky', city: 'Ho Chi Minh', district: 'Go Vap', ward: 'Phuong 14', phoneNumber: '123456789',
  },
];

const confirmDelete = () => {
  Modal.confirm({
    title: 'Delete Address',
    content: 'Are you sure to delete this address?',
    okText: 'Delete',
    cancelText: 'Cancel',
    okType: 'danger',
    maskClosable: true,
  });
};

class EventPlannerAddress extends Component {
  state = {
    visibleModal: false,
    openedAddress: {},
  }

  openEditModal = openedAddress => this.setState({ visibleModal: true, openedAddress })

  closeEditModal = () => this.setState({ visibleModal: false, openedAddress: {} })

  render() {
    const { visibleModal, openedAddress } = this.state;

    return (
      <div>
        <EventPlannerTabTitleStyled>Address</EventPlannerTabTitleStyled>
        <List
          grid={{
            gutter: 16, xs: 1, lg: 2,
          }}
          dataSource={data}
          renderItem={item => (
            <List.Item xs={24} column={12} style={{ padding: '0 20px' }}>
              <div>
                <Row type="flex" className="opfc-event-planner-address">
                  <Col>
                    <ReceiverStyled>{item.receiver}</ReceiverStyled>
                  </Col>
                  <Col className="opfc-event-planner-address-actions">
                    <Button shape="circle" onClick={() => this.openEditModal(item)}>
                      <Icon type="edit" theme="outlined" />
                    </Button>
                    <Button type="danger" shape="circle" onClick={confirmDelete}>
                      <Icon type="delete" theme="outlined" />
                    </Button>
                  </Col>
                </Row>
                <section>
                  <PhoneNumberLabelStyled>Phone number: </PhoneNumberLabelStyled>
                  <PhoneNumberStyled>{item.phoneNumber}</PhoneNumberStyled>
                </section>
                <section>
                  <AddressLabelStyled>Address: </AddressLabelStyled>
                  <AddressStyled>
                    {item.address}, {item.ward}, {item.district}, {item.city}
                  </AddressStyled>
                </section>
              </div>
            </List.Item>
          )}
          footer={(
            <List.Item xs={24} column={12} style={{ padding: '0 20px' }}>
              <Button type="dashed" className="opfc-event-planner-address-new" onClick={() => this.openEditModal({})}>
                <Icon type="plus" theme="outlined" className="opfc-event-planner-address-new-icon" />
              </Button>
            </List.Item>
          )}
        />

        <EditEventPlannerAddressModal
          title={isEmpty(openedAddress) ? 'Create Address' : 'Edit Address'}
          visible={visibleModal}
          handleOk={() => {}}
          handleCancel={this.closeEditModal}
          data={openedAddress}
        />
      </div>
    );
  }
}

export default EventPlannerAddress;
