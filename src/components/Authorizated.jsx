import React from 'react';
import { any } from 'prop-types';
import { Redirect } from 'react-router-dom';

import { useSelector } from 'react-redux';

// Authorizated component to check if user is logged (redirect to login page if user is not logged)
const Authorizated = (props) => {
  const { common } = useSelector((state) => state);
  const { children } = props;
  return (
    common.user ? children : <Redirect to="/login" />
  );
};

Authorizated.propTypes = {
  children: any.isRequired,
};

export default Authorizated;
