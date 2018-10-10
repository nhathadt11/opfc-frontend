import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location },
          }}
        />
      )
    )}
  />
);

const mapStateToProps = state => ({
  loggedIn: state.accountReducer.account.loggedIn,
});

export default compose(
  connect(mapStateToProps),
)(PrivateRoute);
