import React from 'react';
import { bool, func } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button, Icon, Modal } from 'antd';
import {
  RoleChoiceContainerStyled, RoleLabelStyled, OrStyled, LoginNowStyled,
} from './RoleChoice.styled';
import './RoleChoice.css';
import {
  hideRoleChoiceModal, showBrandCreateModal, showEventPlannerModal, showLoginModal,
} from '../../actions/modal';

const RoleChoiceModal = ({
  visible,
  hideRoleChoiceModalAction,
  showBrandCreateModalAction,
  showEventPlannerModalAction,
  showLoginModalAction,
}) => (
  <Modal
    visible={visible}
    footer={null}
    centered
    maskClosable
    onCancel={hideRoleChoiceModalAction}
  >
    <div>
      <RoleChoiceContainerStyled>
        <Button type="ghost" className="opfc-role-choice-option" onClick={showBrandCreateModalAction}>
          <Icon type="team" theme="outlined" className="opfc-role-choice-option-icon" />
          <RoleLabelStyled>Catering Group</RoleLabelStyled>
        </Button>
        <Button type="ghost" className="opfc-role-choice-option" onClick={showEventPlannerModalAction}>
          <Icon type="form" theme="outlined" className="opfc-role-choice-option-icon" />
          <RoleLabelStyled>Event Planner</RoleLabelStyled>
        </Button>
      </RoleChoiceContainerStyled>
      <OrStyled>Or</OrStyled>
      <LoginNowStyled onClick={showLoginModalAction}>Login now</LoginNowStyled>
    </div>
  </Modal>
);

RoleChoiceModal.propTypes = {
  visible: bool.isRequired,
  hideRoleChoiceModalAction: func.isRequired,
  showBrandCreateModalAction: func.isRequired,
  showEventPlannerModalAction: func.isRequired,
  showLoginModalAction: func.isRequired,
};

const mapStateToProps = state => ({
  visible: state.accountReducer.modal.roleChoiceVisible,
});

const mapDispatchToProps = {
  hideRoleChoiceModalAction: hideRoleChoiceModal,
  showBrandCreateModalAction: showBrandCreateModal,
  showEventPlannerModalAction: showEventPlannerModal,
  showLoginModalAction: showLoginModal,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(RoleChoiceModal);
