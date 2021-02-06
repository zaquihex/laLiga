import React from 'react';
import { func, instanceOf, string, bool } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { setLogout } from '../../store/actions/common';

import { Button } from './Button';
import Toolbar from './Toolbar';

const Header = ({ t, title, history, goBack }) => {
  const dispatch = useDispatch();

  const { common } = useSelector((state) => state);

  return (
    <Toolbar className="header" flex={1}>
      { goBack && <FontAwesomeIcon icon={faArrowLeft} className="icon" onClick={() => { history.goBack(); }} /> }
      <span className="title">{ t(title) }</span>
      { common.user
        && (
          <div className="cornerRight">
            <span>{common.user.username.split('@')[0]}</span>
            <Button onClick={() => {
              dispatch(setLogout());
            }}
            >
              Logout
            </Button>
          </div>
        )}
    </Toolbar>
  );
};

Header.defaultProps = {
  goBack: false,
};

Header.propTypes = {
  history: instanceOf(Object).isRequired,
  t: func.isRequired,
  title: string.isRequired,
  goBack: bool,
};

export default withTranslation()(Header);
