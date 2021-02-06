import React from 'react';
import { any } from 'prop-types';
import { Redirect } from 'react-router-dom';

import { useSelector } from 'react-redux';

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
