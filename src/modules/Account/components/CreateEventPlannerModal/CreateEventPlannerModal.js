import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { bool, func } from 'prop-types';
import CreateEventPlanner from './CreateEventPlanner/CreateEventPlanner';
import { hideEventPlannerModal } from '../../actions/modal';

const CreateEventPlannerModal = ({ visible, hideModal }) => (
  <Modal
    title="Create a new Account"
    width={535}
    visible={visible}
    onOk={hideModal}
    onCancel={hideModal}
    centered
    footer={null}
  >
    <CreateEventPlanner onSuccess={hideModal} />
  </Modal>
);

CreateEventPlannerModal.propTypes = {
  visible: bool.isRequired,
  hideModal: func.isRequired,
};

const mapStateToProps = state => ({
  visible: state.accountReducer.modal.eventPlannerModalVisible,
});

const mapDispatchToProps = {
  hideModal: hideEventPlannerModal,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(CreateEventPlannerModal);
