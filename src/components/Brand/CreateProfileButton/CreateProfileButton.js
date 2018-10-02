import React from 'react';
import { Button } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { showRoleChoiceModal } from '../../../modules/Account/actions/modal';

const CreateProfileButton = ({ showRoleChoiceModalAction }) => (
  <Button
    type="primary"
    size="large"
    onClick={showRoleChoiceModalAction}
  >
    Create a Profile
  </Button>
);

CreateProfileButton.propTypes = {
  showRoleChoiceModalAction: func.isRequired,
};

const mapDispatchToProps = {
  showRoleChoiceModalAction: showRoleChoiceModal,
};

export default compose(
  connect(undefined, mapDispatchToProps),
)(CreateProfileButton);
