import React from 'react';
import { func, instanceOf, string, bool } from 'prop-types';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { setLanguage, setLogout } from '../../store/actions/common';

import { Button } from './Button';
import Toolbar from './Toolbar';

const BinarySpan = styled.span`
    border: 1px solid darkgrey;
    padding: 2px;
    cursor: pointer;
    ${(props) => props.sideBtn === 'left' ? css`
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    ` : css`
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    `}
    border-left: 0px;
    color: ${(props) => props.selected ? 'white' : ''};
    background-color: ${(props) => props.selected ? '#9e9e9e' : ''};
`;

const Header = ({ t, i18n, title, postTitle, history, goBack }) => {
  const dispatch = useDispatch();

  const { common } = useSelector((state) => state);

  if (i18n.language && common.language !== i18n.language) {
    i18n.changeLanguage(common.language);
  }

  return (
    <Toolbar className="header spaceElements" flex={1}>
      <div className="paddingLeftStandard">
        { goBack && <FontAwesomeIcon icon={faArrowLeft} className="icon" onClick={() => { history.push('/'); }} /> }
        <span className="title">{ t(title) } {postTitle}</span>
      </div>
      { common.user
        && (
          <div>
            <span>{common.user.username.split('@')[0]}</span>
            <Button onClick={() => {
              dispatch(setLogout());
            }}
            >
              Logout
            </Button>
            <span>
              <BinarySpan
                sideBtn="left"
                selected={i18n.language === 'en'}
                onClick={() => {
                  i18n.changeLanguage('en');
                  dispatch(setLanguage('en'));
                }}
              >
                en
              </BinarySpan>
              <BinarySpan
                sideBtn="right"
                selected={i18n.language === 'es'}
                onClick={() => {
                  i18n.changeLanguage('es');
                  dispatch(setLanguage('es'));
                }}
              >
                es
              </BinarySpan>
            </span>
          </div>
        )}
    </Toolbar>
  );
};

Header.defaultProps = {
  history: null,
  goBack: false,
  postTitle: '',
};

Header.propTypes = {
  history: instanceOf(Object),
  i18n: instanceOf(Object).isRequired,
  t: func.isRequired,
  title: string.isRequired,
  postTitle: string,
  goBack: bool,
};

export default withTranslation()(Header);
